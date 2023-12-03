import { BannerProps } from "./types";
import logo from "../../assets/stackline_logo.svg";
import { logoAltText } from "./util";

export function Banner(props: BannerProps) {
  return (
    <header className="bg-banner-blue p-4 mb-10">
      <img className="w-[132px]" src={logo} alt={logoAltText} />
    </header>
  );
}
