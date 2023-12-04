import { Banner } from "./components/Banner/Banner";
import { FetchCurrentProduct } from "./products/Fetch";
import { ProductView } from "./products/View";

function App() {
  return (
    <div className="font-urbanist min-h-screen flex flex-col">
      <Banner />

      <FetchCurrentProduct>
        <ProductView />
      </FetchCurrentProduct>
    </div>
  );
}

export default App;
