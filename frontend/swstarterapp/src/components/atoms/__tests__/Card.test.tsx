import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Card Content</p>
      </Card>
    );
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Card>Content</Card>);
    // We can check for a class that is always present, e.g., bg-white or rounded
    // Since the component renders a div, we can query by text.
    // When children is just text, getByText returns the Card div itself.
    const card = screen.getByText("Content");
    expect(card).toHaveClass("bg-white");
    expect(card).toHaveClass("rounded");
  });

  it("merges custom className", () => {
    render(<Card className="custom-class">Content</Card>);
    const card = screen.getByText("Content");
    expect(card).toHaveClass("custom-class");
  });
});
