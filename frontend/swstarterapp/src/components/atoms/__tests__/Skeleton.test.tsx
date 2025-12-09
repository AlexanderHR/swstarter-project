import React from "react";
import { render } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders correctly", () => {
    const { container } = render(<Skeleton />);
    const div = container.firstChild;
    expect(div).toHaveClass("animate-pulse");
    expect(div).toHaveClass("bg-gray-300");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const div = container.firstChild;
    expect(div).toHaveClass("custom-class");
  });

  it("passes additional props", () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    const div = container.firstChild;
    expect(div).toHaveAttribute("data-testid", "skeleton");
  });
});
