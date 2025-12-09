import React from "react";
import { render } from "@testing-library/react";
import { Divider } from "../Divider";

describe("Divider", () => {
  it("renders correctly", () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass("border-t");
    expect(hr).toHaveClass("border-pinkish-grey");
  });

  it("merges custom className", () => {
    const { container } = render(<Divider className="custom-class" />);
    const hr = container.querySelector("hr");
    expect(hr).toHaveClass("custom-class");
  });
});
