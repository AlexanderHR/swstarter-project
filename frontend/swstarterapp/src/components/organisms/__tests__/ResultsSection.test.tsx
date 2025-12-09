import React from "react";
import { render, screen } from "@testing-library/react";
import { ResultsSection } from "../ResultsSection";

// Mock EmptyState to simplify testing
jest.mock("../../molecules/EmptyState", () => ({
  EmptyState: () => <div data-testid="empty-state">Empty State</div>,
}));

describe("ResultsSection", () => {
  const mockResults = [
    { uid: "1", description: "Luke Skywalker" },
    { uid: "2", description: "Darth Vader" },
  ];

  it("renders title correctly", () => {
    render(<ResultsSection type="people" />);
    expect(screen.getByText("Results")).toBeInTheDocument();
  });

  it("shows searching state", () => {
    render(<ResultsSection isSearching={true} type="people" />);
    expect(screen.getByText("Searching...")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });

  it("shows empty state when no results and not searching", () => {
    render(<ResultsSection results={[]} type="people" />);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("renders results list", () => {
    render(<ResultsSection results={mockResults} type="people" />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
    expect(screen.getAllByText("SEE DETAILS")).toHaveLength(2);
  });

  it("renders correct links for people", () => {
    render(<ResultsSection results={[mockResults[0]]} type="people" />);
    const link = screen.getByRole("link", { name: /SEE DETAILS/i });
    expect(link).toHaveAttribute("href", "/people/1");
  });

  it("renders correct links for films", () => {
    render(
      <ResultsSection
        results={[{ uid: "1", description: "A New Hope" }]}
        type="films"
      />
    );
    const link = screen.getByRole("link", { name: /SEE DETAILS/i });
    expect(link).toHaveAttribute("href", "/movie/1");
  });
});
