import dayjs from "dayjs";

export function getFormatNumberWithCommas() {
  return (value: string | number) => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numericValue)) {
      throw new Error(
        "Invalid value provided to numberWithCommas, please provide a valid date"
      );
    }

    return new Intl.NumberFormat().format(numericValue);
  };
}

export function getFormatDollar(symbol = "$", symbolBeforeNumber = true) {
  return (value: string | number) =>
    `${symbolBeforeNumber ? symbol : ""}${getFormatNumberWithCommas()(value)}${
      symbolBeforeNumber ? "" : symbol
    }`;
}

export function getFormatDate(format = "MM-DD-YYYY") {
  return (value: string | number) => {
    const date = dayjs(value);
    if (!date.isValid()) {
      throw new Error(
        "Invalid value provided to getDateFormat, please provide a valid date"
      );
    }

    return date.format(format);
  };
}
