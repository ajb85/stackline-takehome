import { render, screen } from "@testing-library/react";
import { Panel } from "./Panel";
import { PanelProps } from "./types";

it("renders", () => {
  const sampleText = "Hello World";
  const props: PanelProps = { children: <div>{sampleText}</div> };
  render(<Panel {...props} />);
  screen.getByText(sampleText);
});
