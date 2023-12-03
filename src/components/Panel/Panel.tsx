import { combineClassNames } from "../../util/combineClassNames";
import { PanelProps } from "./types";

export function Panel(props: PanelProps) {
  return (
    <article
      className={combineClassNames(
        "bg-panel-white rounded-sm",
        props.className
      )}
    >
      {props.children}
    </article>
  );
}
