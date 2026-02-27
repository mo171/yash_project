const HTTP_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const API_BASE = HTTP_BASE.replace(/\/$/, "");
export const WS_URL = API_BASE.replace(/^http/i, "ws") + "/ws/motor-data";

async function post(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function startStreamRequest() {
  return post("/start-stream");
}

export function stopStreamRequest() {
  return post("/stop-stream");
}
