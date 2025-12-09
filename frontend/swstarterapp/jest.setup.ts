import "@testing-library/jest-dom";

// Mock nuqs globally to avoid ESM issues
jest.mock("nuqs", () => ({
  useQueryState: jest.fn((key, options) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const [state, setState] = require("react").useState(
      options?.defaultValue ?? ""
    );
    return [state, setState];
  }),
}));
