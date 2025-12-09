import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  it("renders correctly", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /SWStarter/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("has correct styling classes", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-white");
    expect(header).toHaveClass("shadow-[0_2px_0_0_#dadada]");
  });
});
