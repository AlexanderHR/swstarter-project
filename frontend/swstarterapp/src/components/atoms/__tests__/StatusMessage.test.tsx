import React from "react";
import { render, screen } from "@testing-library/react";
import { StatusMessage } from "../StatusMessage";

describe("StatusMessage", () => {
  it("renders children correctly", () => {
    render(<StatusMessage>Loading...</StatusMessage>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<StatusMessage>Status</StatusMessage>);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    // aria-live="polite" is implicit in role="status" but explicitly set in component
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("centers content", () => {
    render(<StatusMessage>Center</StatusMessage>);
    const status = screen.getByRole("status");
    expect(status).toHaveClass("flex");
    expect(status).toHaveClass("items-center");
    expect(status).toHaveClass("justify-center");
  });
});
