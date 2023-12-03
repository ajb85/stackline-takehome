import { render, screen } from "@testing-library/react";
import App from "./App";
import { logoAltText } from "./components/Banner/util";

test("Renders the logo", () => {
  render(<App />);
  screen.getByAltText(logoAltText);
});
