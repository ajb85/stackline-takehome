import { combineClassNames } from "../../util/combineClassNames";
import { PanelProps } from "./types";

export function Panel(props: PanelProps) {
  return (
    <article className={combineClassNames("bg-panel-white", props.className)}>
      {props.children}
    </article>
  );
}
