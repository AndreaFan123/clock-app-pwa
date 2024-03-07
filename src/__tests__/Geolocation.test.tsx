import { render } from "@testing-library/react";
import App from "../App";

Object.defineProperty(global.navigator, "geolocation", {
  writable: true,
  value: {
    getCurrentPosition: jest.fn(),
  },
});

test("calls geolocation on start", () => {
  render(<App />);
  expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
});
