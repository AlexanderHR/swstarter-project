import { renderHook, act, waitFor } from "@testing-library/react";
import { useSearch } from "../useSearch";
import { swService } from "@/services/swService";
import { useQuery } from "@tanstack/react-query";

// Mock dependencies
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/swService", () => ({
  swService: {
    search: jest.fn(),
  },
}));

// Mock nuqs
const mockSetQueryState = jest.fn();
jest.mock("nuqs", () => ({
  useQueryState: jest.fn((key, options) => {
    const [state, setState] = React.useState(options.defaultValue);
    return [
      state,
      (newValue: string) => {
        setState(newValue);
        mockSetQueryState(key, newValue);
      },
    ];
  }),
}));

import React from "react";

describe("useSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isFetching: false,
    });
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchType).toBe("people");
    expect(result.current.query).toBe("");
    expect(result.current.isDisabled).toBe(true);
    expect(result.current.results).toEqual([]);
  });

  it("updates searchType and resets query", () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("Luke");
    });
    expect(result.current.query).toBe("Luke");

    act(() => {
      result.current.setSearchType("films");
    });

    expect(result.current.searchType).toBe("films");
    expect(result.current.query).toBe("");
  });

  it("updates query and disabled state", () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("Luke");
    });

    expect(result.current.query).toBe("Luke");
    expect(result.current.isDisabled).toBe(false);

    act(() => {
      result.current.setQuery("   ");
    });
    expect(result.current.isDisabled).toBe(true);
  });

  it("executes search on click", async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setQuery("Luke");
    });

    await act(async () => {
      result.current.onClickSearch();
    });

    // Wait for the state update inside startTransition to propagate
    await waitFor(() => {
      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
        })
      );
    });
  });

  it("returns results from useQuery", () => {
    const mockData = { results: [{ uid: "1", description: "Luke" }] };
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    const { result } = renderHook(() => useSearch());

    expect(result.current.results).toEqual(mockData.results);
  });

  it("indicates searching state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isFetching: true,
    });

    const { result } = renderHook(() => useSearch());

    expect(result.current.isSearching).toBe(true);
  });
});
