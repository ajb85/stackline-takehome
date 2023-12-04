import { BannerProps } from "./types";
import logo from "../../assets/stackline_logo.svg";
import { logoAltText } from "./util";
import { combineClassNames } from "../../util/combineClassNames";
import { appMaxWidth, screenPadding } from "../../styling/sizing";

export function Banner(props: BannerProps) {
  return (
    <div className="bg-banner-blue mb-10">
      <header
        className={combineClassNames(
          "p-4 mx-auto",
          appMaxWidth,
          screenPadding,
          props.className
        )}
      >
        <img className="w-[132px]" src={logo} alt={logoAltText} />
      </header>
    </div>
  );
}
