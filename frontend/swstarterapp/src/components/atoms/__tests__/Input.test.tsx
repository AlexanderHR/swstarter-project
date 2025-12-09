import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("bg-white");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("merges custom className", () => {
    render(<Input className="custom-class" placeholder="test" />);
    const input = screen.getByPlaceholderText("test");
    expect(input).toHaveClass("custom-class");
  });

  it("passes additional props", () => {
    render(<Input type="password" placeholder="password" />);
    const input = screen.getByPlaceholderText("password");
    expect(input).toHaveAttribute("type", "password");
  });
});
