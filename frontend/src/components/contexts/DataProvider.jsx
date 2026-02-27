'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useCallback } from 'react';
import { DEFAULT_SAMPLE, MAX_CHART_POINTS, MAX_LOG_ROWS } from '@/lib/dashboardDefaults';
import { WS_URL, startStreamRequest, stopStreamRequest } from '@/lib/streamApi';

const DataContext = createContext();

const initialState = {
  connectionStatus: 'connecting',
  isStreaming: false,
  isActionPending: false,
  error: null,
  latestSample: DEFAULT_SAMPLE,
  chartSeries: [],
  logs: [],
};

function normalizeSample(payload) {
  const merged = { ...DEFAULT_SAMPLE, ...(payload || {}) };
  return {
    ...merged,
    timestamp: merged.timestamp || new Date().toISOString(),
    rpm: Number(merged.rpm) || 0,
    thrust: Number(merged.thrust) || 0,
    severity: Number(merged.severity) || 0,
    health: Number(merged.health) || 0,
    rul: Number(merged.rul) || 0,
    voltage: Number(merged.voltage) || 0,
    current: Number(merged.current) || 0,
    power: Number(merged.power) || 0,
    vibration: Number(merged.vibration) || 0,
    temperature: Number(merged.temperature) || 0,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'CONNECTION_STATUS':
      return { ...state, connectionStatus: action.status, error: action.error || null };
    case 'ACTION_PENDING':
      return { ...state, isActionPending: action.value };
    case 'STREAMING_STATUS':
      return { ...state, isStreaming: action.value };
    case 'STREAM_SAMPLE': {
      const sample = normalizeSample(action.payload);
      const chartPoint = {
        t: sample.timestamp,
        thrust: Number((sample.thrust * 1000).toFixed(2)),
        rpm: sample.rpm,
      };
      const row = {
        timestamp: sample.timestamp,
        rpm: sample.rpm,
        thrust: sample.thrust,
        health: sample.health,
        fault: sample.fault_type,
      };
      return {
        ...state,
        latestSample: sample,
        chartSeries: [...state.chartSeries, chartPoint].slice(-MAX_CHART_POINTS),
        logs: [row, ...state.logs].slice(0, MAX_LOG_ROWS),
      };
    }
    case 'SET_ERROR':
      return { ...state, error: action.message };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const shouldReconnectRef = useRef(true);

  const connectSocket = useCallback(() => {
    if (wsRef.current) return;

    dispatch({ type: 'CONNECTION_STATUS', status: 'connecting' });
    const socket = new WebSocket(WS_URL);
    wsRef.current = socket;

    socket.onopen = () => {
      dispatch({ type: 'CONNECTION_STATUS', status: 'connected' });
    };

    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        dispatch({ type: 'STREAM_SAMPLE', payload: parsed });
      } catch {
        dispatch({ type: 'SET_ERROR', message: 'Received malformed stream payload.' });
      }
    };

    socket.onerror = () => {
      dispatch({ type: 'CONNECTION_STATUS', status: 'error', error: 'WebSocket error.' });
    };

    socket.onclose = () => {
      wsRef.current = null;
      dispatch({ type: 'CONNECTION_STATUS', status: 'disconnected' });
      if (!shouldReconnectRef.current) return;
      reconnectTimerRef.current = setTimeout(connectSocket, 2000);
    };
  }, []);

  useEffect(() => {
    shouldReconnectRef.current = true;
    connectSocket();

    return () => {
      shouldReconnectRef.current = false;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectSocket]);

  const startStreaming = useCallback(async () => {
    if (state.isActionPending || state.isStreaming) return;
    dispatch({ type: 'ACTION_PENDING', value: true });
    try {
      await startStreamRequest();
      dispatch({ type: 'STREAMING_STATUS', value: true });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', message: error.message || 'Failed to start stream.' });
    } finally {
      dispatch({ type: 'ACTION_PENDING', value: false });
    }
  }, [state.isActionPending, state.isStreaming]);

  const stopStreaming = useCallback(async () => {
    if (state.isActionPending || !state.isStreaming) return;
    dispatch({ type: 'ACTION_PENDING', value: true });
    try {
      await stopStreamRequest();
      dispatch({ type: 'STREAMING_STATUS', value: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', message: error.message || 'Failed to stop stream.' });
    } finally {
      dispatch({ type: 'ACTION_PENDING', value: false });
    }
  }, [state.isActionPending, state.isStreaming]);

  const toggleStreaming = useCallback(() => {
    if (state.isStreaming) {
      stopStreaming();
      return;
    }
    startStreaming();
  }, [state.isStreaming, startStreaming, stopStreaming]);

  const value = useMemo(() => ({
    ...state,
    isConnected: state.connectionStatus === 'connected',
    motorData: state.latestSample,
    startStreaming,
    stopStreaming,
    toggleStreaming,
  }), [state, startStreaming, stopStreaming, toggleStreaming]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}