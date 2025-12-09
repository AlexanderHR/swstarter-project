import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "../SearchForm";

describe("SearchForm", () => {
  const mockSetSearchType = jest.fn();
  const mockOnChangeQuery = jest.fn();
  const mockOnClickSearch = jest.fn();

  const defaultProps = {
    searchType: "people",
    setSearchType: mockSetSearchType,
    onChangeQuery: mockOnChangeQuery,
    query: "",
    onClickSearch: mockOnClickSearch,
    isSearching: false,
    isDisabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<SearchForm {...defaultProps} />);
    expect(screen.getByText("What are you searching for?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Chewbacca/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SEARCH" })).toBeInTheDocument();
  });

  it("calls setSearchType when radio button changes", () => {
    render(<SearchForm {...defaultProps} />);
    const moviesRadio = screen.getByLabelText("Movies");
    fireEvent.click(moviesRadio);
    expect(mockSetSearchType).toHaveBeenCalledWith("films");
  });

  it("calls onChangeQuery when input changes", () => {
    render(<SearchForm {...defaultProps} />);
    const input = screen.getByPlaceholderText(/e.g. Chewbacca/i);
    fireEvent.change(input, { target: { value: "Luke" } });
    expect(mockOnChangeQuery).toHaveBeenCalledWith("Luke");
  });

  it("calls onClickSearch when form is submitted", () => {
    render(<SearchForm {...defaultProps} />);
    const button = screen.getByRole("button", { name: "SEARCH" });
    fireEvent.click(button);
    expect(mockOnClickSearch).toHaveBeenCalled();
  });

  it("disables button when isDisabled is true", () => {
    render(<SearchForm {...defaultProps} isDisabled={true} />);
    const button = screen.getByRole("button", { name: "SEARCH" });
    expect(button).toBeDisabled();
  });

  it("shows searching text when isSearching is true", () => {
    render(<SearchForm {...defaultProps} isSearching={true} />);
    expect(
      screen.getByRole("button", { name: "SEARCHING..." })
    ).toBeInTheDocument();
  });

  it("changes placeholder based on searchType", () => {
    const { rerender } = render(
      <SearchForm {...defaultProps} searchType="people" />
    );
    expect(screen.getByPlaceholderText(/e.g. Chewbacca/i)).toBeInTheDocument();

    rerender(<SearchForm {...defaultProps} searchType="films" />);
    expect(
      screen.getByPlaceholderText(/e.g. Yoda's Adventure/i)
    ).toBeInTheDocument();
  });
});
