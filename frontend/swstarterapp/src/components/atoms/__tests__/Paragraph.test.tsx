import React from "react";
import { render, screen } from "@testing-library/react";
import { Paragraph } from "../Paragraph";

describe("Paragraph", () => {
  it("renders children correctly", () => {
    render(<Paragraph>Paragraph text</Paragraph>);
    expect(screen.getByText("Paragraph text")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Paragraph>Text</Paragraph>);
    const p = screen.getByText("Text");
    expect(p).toHaveClass("text-sm");
    expect(p).toHaveClass("font-bold");
    expect(p).toHaveClass("text-pinkish-grey");
  });

  it("merges custom className", () => {
    render(<Paragraph className="custom-class">Text</Paragraph>);
    const p = screen.getByText("Text");
    expect(p).toHaveClass("custom-class");
  });

  it("passes additional props", () => {
    render(<Paragraph data-testid="para">Text</Paragraph>);
    expect(screen.getByTestId("para")).toBeInTheDocument();
  });
});
