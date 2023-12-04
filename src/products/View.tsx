import { PanelGroup } from "../components/Panel/Group";
import { Panel } from "../components/Panel/Panel";
import { ProductShowcase } from "../components/ProductShowcase/ProductShowcase";
import { getSearchParams } from "../util/getSearchParams";
import { useProducts } from "./reducer";

export function ProductView() {
  const { product_id } = getSearchParams("product_id");
  const products = useProducts();

  if (!product_id || products.isLoading) {
    // No product_id should only happen on mount with how I have the app written right now
    return <div>Loading</div>;
  }

  if (products.error) {
    return <div>{products.error}</div>;
  }

  const product = products.data[product_id];

  return (
    <PanelGroup
      sidebar={
        <Panel className="h-full">
          <ProductShowcase product={product} />
        </Panel>
      }
    >
      <Panel>
        <p>Right Top</p>
      </Panel>
      <Panel>
        <p>Right Bottom</p>
      </Panel>
    </PanelGroup>
  );
}
