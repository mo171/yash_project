from fastapi import FastAPI, WebSocket, WebSocketDisconnect, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import asyncio
import json
from typing import List
from pydantic import BaseModel
from microservices.src.realtime_pi_inference import build_feature_dict, get_motor_data_snapshot

# SETTING UP THE APP
load_dotenv()
app = FastAPI()

# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"]  # Allow all headers
)

# WebSocket Manager Class
class WebSocketManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.is_streaming = False
        self.streaming_task = None

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, data: dict):
        if self.active_connections:
            message = json.dumps(data)
            disconnected = []
            for connection in self.active_connections:
                try:
                    await connection.send_text(message)
                except:
                    disconnected.append(connection)
            
            # Remove disconnected connections
            for connection in disconnected:
                self.disconnect(connection)

    async def start_streaming(self):
        if not self.is_streaming:
            self.is_streaming = True
            self.streaming_task = asyncio.create_task(self._stream_motor_data())

    async def stop_streaming(self):
        self.is_streaming = False
        if self.streaming_task:
            self.streaming_task.cancel()
            try:
                await self.streaming_task
            except asyncio.CancelledError:
                pass

    async def _stream_motor_data(self):
        try:
            while self.is_streaming:
                data = get_motor_data_snapshot()
                await self.broadcast(data)
                await asyncio.sleep(0.5)  # 2Hz frequency
        except asyncio.CancelledError:
            pass

# Global WebSocket manager instance
manager = WebSocketManager()


# Health check endpoint for deployment
@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "Backend is running"}


@app.websocket("/ws/motor-data")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive and handle messages if needed
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.post("/start-stream")
async def start_stream():
    await manager.start_streaming()
    return {
        "status": "success", 
        "message": "Motor data streaming started",
        "websocket_url": "/ws/motor-data",
        "frequency": "2Hz"
    }

@app.post("/stop-stream")
async def stop_stream():
    await manager.stop_streaming()
    return {
        "status": "success", 
        "message": "Motor data streaming stopped"
    }

@app.get("/get-data")
def get_data():
    return {
        "status": "healthy", 
        "message": "Backend is running",
        "streaming_active": manager.is_streaming,
        "active_connections": len(manager.active_connections),
        "websocket_url": "ws://localhost:8000/ws/motor-data",
        "endpoints": {
            "start_stream": "/start-stream",
            "stop_stream": "/stop-stream",
            "websocket": "/ws/motor-data"
        }
    }