import dayjs from "dayjs";
import { LineChartType, SalesValues } from "./types";

export function formatDate(dateString: string) {
  const date = dayjs(dateString);
  const formattedDate = date.format("MMM").toUpperCase();
  return formattedDate;
}

export const getChartOptions = (
  salesValues: SalesValues
): LineChartType["options"] => {
  const min = salesValues.min ?? 0;
  const max = salesValues.max ?? 0;
  const difference = max - min;

  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: salesValues.monthCount,
          color: "#94A3B8",
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        suggestedMin: min - 2 * difference,
        suggestedMax: max + 2 * difference,
      },
    },
  };
};

export const defaultDatasetOptions: Partial<
  LineChartType["data"]["datasets"][number]
> = {
  borderWidth: 3,
  fill: false,
  tension: 0.3,
  pointRadius: 0,
};

export const initialSalesValue = {
  monthLabels: [] as string[],
  monthCount: 0,
  min: null as number | null,
  max: null as number | null,
};
