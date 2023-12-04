import { ProductSalesChart } from "../components/ProductSalesChart/ProductSalesChart";
import { PanelGroup } from "../components/Panel/Group";
import { Panel } from "../components/Panel/Panel";
import { ProductShowcase } from "../components/ProductShowcase/ProductShowcase";
import { getSearchParams } from "../util/getSearchParams";
import { useProducts } from "./reducer";
import { Table } from "../components/Table/Table";
import {
  getFormatDate,
  getFormatDollar,
  getFormatNumberWithCommas,
} from "../components/Table/util";

export function ProductView() {
  const { product_id } = getSearchParams("product_id");
  const products = useProducts();

  if (!product_id || products.isLoading) {
    // No product_id should only happen on mount with how I have the app written right now
    return <div>Loading</div>;
  }

  if (products.error) {
    return <div>{products.error}</div>;
  }

  const product = products.data[product_id];
  if (!product) {
    return null;
  }

  const formatDollar = getFormatDollar();

  return (
    <PanelGroup
      sidebar={
        <Panel className="h-full">
          <ProductShowcase product={product} />
        </Panel>
      }
    >
      <Panel className="h-fit">
        <ProductSalesChart
          title="Retail Sales"
          product={product}
          plotKeys={["retailSales", "wholesaleSales"]}
        />
      </Panel>
      <Panel className="h-fit">
        <Table
          rows={product.sales}
          columns={[
            {
              field: "weekEnding",
              label: "Week Ending",
              width: 100,
              sortable: true,
              formatCell: getFormatDate(),
            },
            {
              field: "retailSales",
              label: "Retail Sales",
              width: 100,
              sortable: true,
              formatCell: formatDollar,
            },
            {
              field: "wholesaleSales",
              label: "Wholesale Sales",
              width: 100,
              sortable: true,
              formatCell: formatDollar,
            },
            {
              field: "unitsSold",
              label: "Units Sold",
              width: 100,
              sortable: true,
              formatCell: getFormatNumberWithCommas(),
            },
            {
              field: "retailerMargin",
              label: "Retailer Margin",
              width: 100,
              sortable: true,
              formatCell: formatDollar,
            },
          ]}
          pagination={{
            initialState: {
              page: 0,
              pageSize: 10,
            },
            sizeOptions: [10, 20, 30],
          }}
        />
      </Panel>
    </PanelGroup>
  );
}
