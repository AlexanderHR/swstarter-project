import React from "react";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("renders correctly", () => {
    render(<EmptyState />);
    // Since the text is split by a <br />, getByText with exact string match fails.
    // We can use a regex or a custom matcher function, or check for the full text content.
    expect(screen.getByText(/There are zero matches./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Use the form to search for People or Movies./i)
    ).toBeInTheDocument();
  });
});
