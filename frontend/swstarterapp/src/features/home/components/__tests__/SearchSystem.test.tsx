import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchSystem } from "../SearchSystem";
import { useSearch } from "../../hooks/useSearch";

// Mock the useSearch hook
jest.mock("../../hooks/useSearch");

// Mock child components to isolate SearchSystem logic
jest.mock("@/components/molecules/SearchForm", () => ({
  SearchForm: ({
    searchType,
    setSearchType,
    query,
    onChangeQuery,
    onClickSearch,
    isSearching,
    isDisabled,
  }: {
    searchType: string;
    setSearchType: (val: string) => void;
    query: string;
    onChangeQuery: (val: string) => void;
    onClickSearch: () => void;
    isSearching: boolean;
    isDisabled: boolean;
  }) => (
    <div data-testid="search-form">
      <button onClick={() => setSearchType("films")}>Set Films</button>
      <input
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder="Search"
      />
      <button onClick={onClickSearch} disabled={isDisabled}>
        Search
      </button>
      {isSearching && <span>Searching...</span>}
      <span>Type: {searchType}</span>
    </div>
  ),
}));

jest.mock("@/components/organisms/ResultsSection", () => ({
  ResultsSection: ({
    type,
    isSearching,
    results,
  }: {
    type: string;
    isSearching: boolean;
    results: { uid: string; description: string }[];
  }) => (
    <div data-testid="results-section">
      <span>Results Type: {type}</span>
      {isSearching && <span>Loading Results...</span>}
      <ul>
        {results.map((r) => (
          <li key={r.uid}>{r.description}</li>
        ))}
      </ul>
    </div>
  ),
}));

describe("SearchSystem", () => {
  const mockSetSearchType = jest.fn();
  const mockSetQuery = jest.fn();
  const mockOnClickSearch = jest.fn();

  const defaultHookValues = {
    searchType: "people",
    setSearchType: mockSetSearchType,
    query: "",
    setQuery: mockSetQuery,
    isDisabled: true,
    onClickSearch: mockOnClickSearch,
    isSearching: false,
    results: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearch as jest.Mock).mockReturnValue(defaultHookValues);
  });

  it("renders SearchForm and ResultsSection", () => {
    render(<SearchSystem />);
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("results-section")).toBeInTheDocument();
  });

  it("passes correct props to SearchForm", () => {
    (useSearch as jest.Mock).mockReturnValue({
      ...defaultHookValues,
      query: "Luke",
      searchType: "people",
      isDisabled: false,
      isSearching: true,
    });

    render(<SearchSystem />);
    expect(screen.getByDisplayValue("Luke")).toBeInTheDocument();
    expect(screen.getByText("Type: people")).toBeInTheDocument();
    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("passes correct props to ResultsSection", () => {
    const mockResults = [{ uid: "1", description: "Luke" }];
    (useSearch as jest.Mock).mockReturnValue({
      ...defaultHookValues,
      searchType: "people",
      isSearching: false,
      results: mockResults,
    });

    render(<SearchSystem />);
    expect(screen.getByText("Results Type: people")).toBeInTheDocument();
    expect(screen.getByText("Luke")).toBeInTheDocument();
  });

  it("handles interactions via hook functions", () => {
    // We need to set isDisabled to false for the button to be clickable
    (useSearch as jest.Mock).mockReturnValue({
      ...defaultHookValues,
      isDisabled: false,
    });

    render(<SearchSystem />);

    fireEvent.click(screen.getByText("Set Films"));
    expect(mockSetSearchType).toHaveBeenCalledWith("films");

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "Han" },
    });
    expect(mockSetQuery).toHaveBeenCalledWith("Han");

    fireEvent.click(screen.getByText("Search"));
    expect(mockOnClickSearch).toHaveBeenCalled();
  });
});
