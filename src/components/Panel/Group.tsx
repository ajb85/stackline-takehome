import { appMaxWidth, screenPadding } from "../../styling/sizing";
import { combineClassNames } from "../../util/combineClassNames";
import { PanelGroupProps } from "./types";

export function PanelGroup(props: PanelGroupProps) {
  return (
    <main
      className={combineClassNames(
        "flex flex-col md:flex-row gap-x-4 gap-y-8 mx-auto",
        appMaxWidth,
        screenPadding,
        props.className
      )}
    >
      <div
        className={combineClassNames("w-full md:w-1/5", props.sidebarClassName)}
      >
        {props.sidebar}
      </div>
      <div
        className={combineClassNames(
          "w-full flex flex-col gap-y-8",
          props.contentClassName
        )}
      >
        {props.children}
      </div>
    </main>
  );
}
