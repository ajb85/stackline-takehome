import { useEffect, useRef } from "react";
import { getSearchParams } from "../util/getSearchParams";
import { FetchProductProps } from "./types";
import { useProducts, fetchProductById } from "./reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export function FetchCurrentProduct(props: FetchProductProps) {
  const { product_id } = getSearchParams("product_id");
  const products = useProducts();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      product_id &&
      !products.data[product_id] &&
      !products.error &&
      !products.isLoading
    ) {
      console.log("FETCH", product_id);
      dispatch(fetchProductById(product_id));
    } else if (!product_id) {
      // Hard-coded solution since I only have one page and no routing.
      // I would normally expect to route the user back to a valid page
      // (like a list of products) but I don't have that here so I'm
      // forcing the URL to search for the one product I do have
      window.location.search = "product_id=B007TIE0GQ";
    }
  }, [product_id, products]);

  return props.children;
}
