import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RadioGroup } from "../RadioGroup";

describe("RadioGroup", () => {
  const options = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ];
  const mockOnChange = jest.fn();

  it("renders legend and options", () => {
    render(
      <RadioGroup
        name="test-group"
        options={options}
        value="opt1"
        onChange={mockOnChange}
        legend="Test Legend"
      />
    );

    expect(screen.getByText("Test Legend")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  it("checks the correct option based on value", () => {
    render(
      <RadioGroup
        name="test-group"
        options={options}
        value="opt2"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText("Option 1")).not.toBeChecked();
    expect(screen.getByLabelText("Option 2")).toBeChecked();
  });

  it("calls onChange when an option is clicked", () => {
    render(
      <RadioGroup
        name="test-group"
        options={options}
        value="opt1"
        onChange={mockOnChange}
      />
    );

    fireEvent.click(screen.getByLabelText("Option 2"));
    expect(mockOnChange).toHaveBeenCalledWith("opt2");
  });
});
