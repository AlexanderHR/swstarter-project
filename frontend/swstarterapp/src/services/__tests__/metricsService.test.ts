import { getMetrics } from "../metricsService";
import { apiClient } from "../api";

// Mock the apiClient
jest.mock("../api", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("metricsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getMetrics", () => {
    it("calls apiClient.get with correct url and returns data", async () => {
      const mockMetricsData = {
        data: {
          average_response_time_ms: 123.45,
          response_time_percentiles: {
            "api/test": {
              p50: 100,
              p90: 200,
              p95: 300,
              p99: 400,
            },
          },
          most_popular_hour: "14",
          most_popular_hour_count: 50,
          status_codes_by_path: {
            "api/test": {
              "200": 10,
            },
          },
          last_updated: "2025-12-09T12:00:00Z",
        },
      };

      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockMetricsData });

      const result = await getMetrics();

      expect(apiClient.get).toHaveBeenCalledWith("/metrics");
      expect(result).toEqual(mockMetricsData);
    });

    it("throws an error when api call fails", async () => {
      const mockError = new Error("Network Error");
      (apiClient.get as jest.Mock).mockRejectedValue(mockError);

      await expect(getMetrics()).rejects.toThrow("Network Error");
      expect(apiClient.get).toHaveBeenCalledWith("/metrics");
    });
  });
});
