import { ProductType } from "../../products/types";
import {
  ChartConfiguration,
  ChartConfigurationCustomTypesPerDataset,
} from "chart.js";

export type ChartPlotKey = Exclude<
  keyof ProductType["sales"][number],
  "weekEnding"
>;

export type ProductSalesChartProps = {
  product: ProductType;
  plotKeys: ChartPlotKey[];
  title: string;
};

export type LineChartType =
  | ChartConfiguration<"line", number[], string>
  | ChartConfigurationCustomTypesPerDataset<"line", number[], string>;

export type SalesValues = {
  monthLabels: string[];
  min: number | null;
  max: number | null;
} & { [key in ChartPlotKey]: number[] };
