import { render, screen } from "@testing-library/react";
import App from "./App";
import { logoAltText } from "./components/Banner/util";
import { Provider } from "react-redux";
import { store } from "./store";

test("Renders the logo", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  screen.getByAltText(logoAltText);
});
