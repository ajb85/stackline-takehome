import { MaybeStringToCombine } from "./types";

function combineTwoClassNames(
  className1: string,
  className2?: MaybeStringToCombine
) {
  if (!className2) {
    // Eliminate falsey values, which would be the result of (someArray.length && "myClassName") or (!someCondition && "myClassName")
    return className1;
  }

  const space = className1.length ? " " : "";
  return className1 + space + className2;
}

export const combineClassNames = (...classNames: MaybeStringToCombine[]) => {
  return classNames.reduce(combineTwoClassNames, "");
};
