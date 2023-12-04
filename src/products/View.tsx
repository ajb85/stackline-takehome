import { PanelGroup } from "../components/Panel/Group";
import { Panel } from "../components/Panel/Panel";
import { getSearchParams } from "../util/getSearchParams";
import { useProducts } from "./reducer";

export function ProductView() {
  const { product_id } = getSearchParams("product_id");
  const products = useProducts();

  if (products.isLoading) {
    return <div>Loading</div>;
  }

  if (products.error) {
    return <div>{products.error}</div>;
  }

  const product = products.data[product_id ?? ""];
  if (!product) {
    // I don't have routing so I'll just return a mock 404 page. Normally I would route the user here
    // with React Router or Next.js/Remix.js
    return <div>404</div>;
  }

  return (
    <PanelGroup
      sidebar={
        <Panel>
          <p>Left</p>
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
