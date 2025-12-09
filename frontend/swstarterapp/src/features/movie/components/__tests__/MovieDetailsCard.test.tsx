import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MovieDetailsCard } from "../MovieDetailsCard";
import { useMovieDetails } from "../../hooks/useMovieDetails";

// Mock the hook
jest.mock("../../hooks/useMovieDetails");

const mockUseMovieDetails = useMovieDetails as jest.Mock;

describe("MovieDetailsCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    mockUseMovieDetails.mockReturnValue({
      data: null,
      isFetching: true,
      handleBack: jest.fn(),
    });

    render(<MovieDetailsCard id="1" />);

    // When loading, the title (h1) is not rendered, instead a Skeleton is shown.
    const title = screen.queryByRole("heading", { level: 1 });
    expect(title).not.toBeInTheDocument();
  });

  it("renders movie details correctly", () => {
    const mockMovie = {
      title: "A New Hope",
      opening_crawl: "It is a period of civil war...",
      characters: [
        { id: "1", name: "Luke Skywalker" },
        { id: "2", name: "Han Solo" },
      ],
    };

    mockUseMovieDetails.mockReturnValue({
      data: mockMovie,
      isFetching: false,
      handleBack: jest.fn(),
    });

    render(<MovieDetailsCard id="1" />);

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(
      screen.getByText("It is a period of civil war...")
    ).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Han Solo")).toBeInTheDocument();
  });

  it("calls handleBack when back button is clicked", () => {
    const handleBackMock = jest.fn();
    mockUseMovieDetails.mockReturnValue({
      data: { title: "Test" },
      isFetching: false,
      handleBack: handleBackMock,
    });

    render(<MovieDetailsCard id="1" />);

    const backButton = screen.getByText("BACK TO SEARCH");
    fireEvent.click(backButton);

    expect(handleBackMock).toHaveBeenCalled();
  });
});
