export interface MetricsResponse {
  data: MetricsData;
}

export interface MetricsData {
  average_response_time_ms: number;
  response_time_percentiles: Record<string, Percentiles>;
  most_popular_hour: string | null;
  most_popular_hour_count: number;
  status_codes_by_path: Record<string, Record<string, number>>;
  last_updated: string;
}

export interface Percentiles {
  p50: number;
  p90: number;
  p95: number;
  p99: number;
}
