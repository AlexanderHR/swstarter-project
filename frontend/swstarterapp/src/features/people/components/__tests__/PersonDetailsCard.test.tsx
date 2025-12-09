import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PersonDetailsCard } from "../PersonDetailsCard";
import { usePersonDetails } from "../../hooks/usePersonDetails";

// Mock the hook
jest.mock("../../hooks/usePersonDetails");

const mockUsePersonDetails = usePersonDetails as jest.Mock;

describe("PersonDetailsCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state correctly", () => {
    mockUsePersonDetails.mockReturnValue({
      data: null,
      isFetching: true,
      handleBack: jest.fn(),
    });

    render(<PersonDetailsCard id="1" />);

    // When loading, the name (h1) is not rendered, instead a Skeleton is shown.
    const name = screen.queryByRole("heading", { level: 1 });
    expect(name).not.toBeInTheDocument();
  });

  it("renders person details correctly", () => {
    const mockPerson = {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      gender: "male",
      eye_color: "blue",
      hair_color: "blond",
      height: "172",
      mass: "77",
      films: [
        { id: "1", title: "A New Hope" },
        { id: "2", title: "The Empire Strikes Back" },
      ],
    };

    mockUsePersonDetails.mockReturnValue({
      data: mockPerson,
      isFetching: false,
      handleBack: jest.fn(),
    });

    render(<PersonDetailsCard id="1" />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Birth Year: 19BBY")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();
    expect(screen.getByText("Eye Color: blue")).toBeInTheDocument();
    expect(screen.getByText("Hair Color: blond")).toBeInTheDocument();
    expect(screen.getByText("Height: 172")).toBeInTheDocument();
    expect(screen.getByText("Mass: 77")).toBeInTheDocument();
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  it("calls handleBack when back button is clicked", () => {
    const handleBackMock = jest.fn();
    mockUsePersonDetails.mockReturnValue({
      data: { name: "Test" },
      isFetching: false,
      handleBack: handleBackMock,
    });

    render(<PersonDetailsCard id="1" />);

    const backButton = screen.getByText("BACK TO SEARCH");
    fireEvent.click(backButton);

    expect(handleBackMock).toHaveBeenCalled();
  });
});
