import React from "react";
import { render, screen } from "@testing-library/react";
import { RadioButton } from "../RadioButton";

describe("RadioButton", () => {
  it("renders label correctly", () => {
    render(<RadioButton label="Option 1" />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("renders input correctly", () => {
    render(<RadioButton label="Option 1" />);
    const input = screen.getByRole("radio");
    expect(input).toBeInTheDocument();
  });

  it("handles checked state", () => {
    render(<RadioButton label="Option 1" checked readOnly />);
    const input = screen.getByRole("radio");
    expect(input).toBeChecked();
  });

  it("merges custom className", () => {
    render(<RadioButton label="Option 1" className="custom-class" />);
    const input = screen.getByRole("radio");
    expect(input).toHaveClass("custom-class");
  });

  it("passes additional props", () => {
    render(<RadioButton label="Option 1" value="opt1" />);
    const input = screen.getByRole("radio");
    expect(input).toHaveAttribute("value", "opt1");
  });
});
