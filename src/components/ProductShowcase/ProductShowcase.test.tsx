import { render, screen } from "@testing-library/react";
import { ProductShowcase } from "./ProductShowcase";
import { ProductShowcaseProps } from "./types";
import products from "../../products/data.json";

it("renders", () => {
  const props: ProductShowcaseProps = {
    product: products[0],
  };
  render(<ProductShowcase {...props} />);
});
