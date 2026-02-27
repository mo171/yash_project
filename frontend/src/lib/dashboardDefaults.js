export const DEFAULT_SAMPLE = {
  timestamp: new Date().toISOString(),
  rpm: 3200,
  thrust: 0.45,
  severity: -0.12,
  health: 85,
  trend: "STABLE",
  fault_type: "Normal",
  rul: 100,
  voltage: 11.4,
  current: 12.5,
  power: 142.5,
  vibration: 0.18,
  temperature: 29.2,
  anomaly_status: "NORMAL",
};

export const MAX_CHART_POINTS = 120;
export const MAX_LOG_ROWS = 40;
