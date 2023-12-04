import { lightBorder } from "../../styling/color";
import { combineClassNames } from "../../util/combineClassNames";
import { TagProps } from "./types";

export function Tag(props: TagProps) {
  return (
    <div
      className={combineClassNames(
        lightBorder,
        "rounded-md m-0 py-1 px-6 text-slate-600 whitespace-nowrap text-sm"
      )}
    >
      {props.children}
    </div>
  );
}
