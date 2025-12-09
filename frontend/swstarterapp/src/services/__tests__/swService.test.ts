import { swService } from "../swService";
import { apiClient } from "../api";

// Mock the apiClient
jest.mock("../api", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("SWService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("search", () => {
    it("calls apiClient.get with correct params for people search", async () => {
      const mockResponse = { data: { results: [], count: 0 } };
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await swService.search("Luke", "people");

      expect(apiClient.get).toHaveBeenCalledWith("/swapi/people", {
        params: { name: "Luke" },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("calls apiClient.get with correct params for films search", async () => {
      const mockResponse = { data: { results: [], count: 0 } };
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await swService.search("Hope", "films");

      expect(apiClient.get).toHaveBeenCalledWith("/swapi/films", {
        params: { title: "Hope" },
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getPerson", () => {
    it("calls apiClient.get with correct url", async () => {
      const mockPerson = { name: "Luke Skywalker", id: "1" };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockPerson });

      const result = await swService.getPerson("1");

      expect(apiClient.get).toHaveBeenCalledWith("/swapi/people/1");
      expect(result).toEqual(mockPerson);
    });
  });

  describe("getMovie", () => {
    it("calls apiClient.get with correct url", async () => {
      const mockMovie = { title: "A New Hope", id: "1" };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockMovie });

      const result = await swService.getMovie("1");

      expect(apiClient.get).toHaveBeenCalledWith("/swapi/films/1");
      expect(result).toEqual(mockMovie);
    });
  });
});
