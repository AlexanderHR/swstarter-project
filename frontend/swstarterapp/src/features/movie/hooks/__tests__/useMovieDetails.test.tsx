import { renderHook, act, waitFor } from "@testing-library/react";
import { useMovieDetails } from "../useMovieDetails";
import { swService } from "@/services/swService";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Mock dependencies
jest.mock("@/services/swService");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useMovieDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("fetches movie details successfully", async () => {
    const mockMovie = { title: "A New Hope", id: "1" };
    (swService.getMovie as jest.Mock).mockResolvedValue(mockMovie);

    const { result } = renderHook(() => useMovieDetails({ id: "1" }), { wrapper });

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    expect(result.current.data).toEqual(mockMovie);
    expect(swService.getMovie).toHaveBeenCalledWith("1");
  });

  it("handles back navigation", () => {
    const { result } = renderHook(() => useMovieDetails({ id: "1" }), { wrapper });

    act(() => {
      result.current.handleBack();
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
