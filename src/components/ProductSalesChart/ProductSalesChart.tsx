import { LineChartType, ProductSalesChartProps, SalesValues } from "./types";
import { formatDate, defaultDatasetOptions, getChartOptions } from "./util";
import { useEffect, useRef, useMemo } from "react";
import { Chart } from "chart.js/auto";

const lineColors = ["#46A8F6", "#A5AFC6"];
export function ProductSalesChart(props: ProductSalesChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const salesValues = useMemo(
    () =>
      props.product?.sales.reduce(
        (acc, item) => {
          acc.monthLabels.push(formatDate(item.weekEnding));
          props.plotKeys.forEach((key) => {
            if (!acc[key]) {
              acc[key] = [];
            }

            acc[key].push(item[key]);
            if (acc.min === null || acc.min > item[key]) {
              acc.min = item[key];
            }

            if (acc.max === null || acc.max < item[key]) {
              acc.max = item[key];
            }
          });

          return acc;
        },
        {
          monthLabels: [] as string[],
          min: null as number | null,
          max: null as number | null,
        } as SalesValues
      ) ?? {},
    [props.product?.sales, props.plotKeys]
  );

  const datasets: LineChartType["data"]["datasets"] = useMemo(
    () =>
      props.plotKeys.map((key, i) => ({
        data: salesValues[key],
        borderColor: lineColors[i % lineColors.length],
        ...defaultDatasetOptions,
      })),
    [props.plotKeys, salesValues]
  );

  useEffect(() => {
    let chart: Chart<"line", number[], string> | void;
    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: salesValues.monthLabels,
          datasets: datasets,
        },
        options: getChartOptions(salesValues),
      });
    }

    return () => chart?.destroy();
  }, [salesValues, datasets]);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl text-slate-600">{props.title}</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
