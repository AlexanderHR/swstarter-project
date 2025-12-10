import { apiClient } from "./api";
import { MetricsResponse } from "../types/metrics";

export const getMetrics = async (): Promise<MetricsResponse> => {
  const response = await apiClient.get<MetricsResponse>("/metrics");
  return response.data;
};
