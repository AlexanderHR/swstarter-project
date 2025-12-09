import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button", { name: "Default" });
    expect(button).toHaveClass("bg-green-teal");
  });

  it("applies disabled variant classes and attribute", () => {
    render(<Button variant="disabled">Disabled</Button>);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toHaveClass("bg-pinkish-grey");
    expect(button).toBeDisabled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("passes additional props", () => {
    render(<Button data-testid="custom-button">Props</Button>);
    expect(screen.getByTestId("custom-button")).toBeInTheDocument();
  });
});
