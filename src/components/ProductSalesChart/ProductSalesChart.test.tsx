import { render, screen } from "@testing-library/react";
import { ProductSalesChart } from "./ProductSalesChart";
import { ProductSalesChartProps } from "./types";
import products from "../../products/data.json";
import { formatDate } from "./util";

describe("Component", () => {
  it("renders", () => {
    const props: ProductSalesChartProps = {
      product: products[0],
      plotKeys: ["retailSales", "wholesaleSales"],
      title: "Test Chart",
    };
    render(<ProductSalesChart {...props} />);
    screen.getByText("Test Chart");
  });
});

describe("Util -> formatDate", () => {
  it("Renders expected date formats", () => {
    const dates = ["2017-01-01", "2017-05-01", "2017-06-30"];
    const results = dates.map(formatDate);
    expect(results).toEqual(["JAN", "MAY", "JUN"]);
  });
});
