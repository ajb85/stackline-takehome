import { render, screen } from "@testing-library/react";
import { Banner } from "./Banner";
import { BannerProps } from "./types";
import { logoAltText } from "./util";

it("renders", () => {
  const props: BannerProps = {};
  render(<Banner {...props} />);
  screen.getByAltText(logoAltText);
});
