import { lightBorder } from "../../styling/color";
import { combineClassNames } from "../../util/combineClassNames";
import { Tag } from "../Tag/Tag";
import { ProductShowcaseProps } from "./types";

export function ProductShowcase(props: ProductShowcaseProps) {
  const { product } = props;

  if (!product) {
    return <div>Missing product</div>;
  }

  return (
    <div
      className={combineClassNames(
        "flex flex-col items-center",
        props.className
      )}
    >
      <div className="flex flex-col items-center px-4">
        <img className="w-48 my-4" src={product.image} alt={product.title} />
        <h2 className="text-xl font-extrabold mb-2 text-center">
          {props.product.title}
        </h2>
        <h3 className="text-slate-400 text-center mb-4">
          {props.product.subtitle}
        </h3>
      </div>
      <div
        className={combineClassNames(
          lightBorder,
          "border-x-0 flex py-4 px-6 gap-x-2 gap-y-3 flex-wrap w-full justify-center md:justify-start"
        )}
      >
        {product.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
