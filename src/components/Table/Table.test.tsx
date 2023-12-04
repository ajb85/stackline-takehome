import { render, screen } from "@testing-library/react";
import { Table } from "./Table";
import { TableProps } from "./types";
import products from "../../products/data.json";

it("renders", () => {
  const props: TableProps<(typeof products)[number]["sales"][number]> = {
    rows: products[0].sales,
    columns: [
      {
        field: "weekEnding",
        label: "Week Ending",
        width: 100,
        sortable: true,
      },
    ],
    pagination: {
      initialState: {
        page: 0,
        pageSize: 10,
      },
      sizeOptions: [10, 20, 30],
    },
  };
  render(<Table {...props} />);
  screen.getByText("Week Ending");
  screen.getByText("2017-01-01");
});
