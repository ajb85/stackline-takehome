import axios from "axios";
import { ProductType } from "../products/types";
import products from "../products/data.json";

const productLookup = products.reduce((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {} as Record<ProductType["id"], ProductType>);

axios.interceptors.request.use(
  async function (config) {
    // This interceptor stops the request from going out so I can inject some logic

    // Note: axios does not intend to be used to prevent requests from going out.
    // So to bypass this limitation for the mock page, I throw an object instead.
    // Throwing tells axios there's a problem and blocks the request and sends the
    // thrown object to the error response function, which then resolves without an
    // error. It's not how axios is intended to be used but it works well for the
    // purposes of this mock site.
    const [, , productId] = config.url?.split("/") ?? [];

    if (!productLookup[productId]) {
      // See if we have the product in the list. If not, return 404
      throw { status: 404 };
    }

    return await new Promise((_, rej) => {
      // Going to return a valid response but I want to delay it first to fake a load
      setTimeout(() => {
        rej({
          status: 200,
          data: productLookup[productId],
        });
      }, 1000);
    });
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Thrown objects in the response interceptor are sent here.
    // So if the status is valid, resolve the promise and return the data
    // If the status is unexpected, reject the error instead
    const status = error?.status ?? 500;
    return status < 400 ? Promise.resolve(error) : Promise.reject(error);
  }
);
