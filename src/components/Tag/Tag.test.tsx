import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";
import { TagProps } from "./types";

it("renders", () => {
  const props: TagProps = {
    children: "Sample Tag",
  };
  render(<Tag {...props} />);
  screen.getByText(props.children);
});
