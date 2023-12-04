export type ProductType = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: {
    customer: string;
    review: string;
    score: number;
  }[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  }[];
};

export type ProductState = {
  data: Record<ProductType["id"], ProductType>;
  isLoading: boolean;
  error: string;
};

export type FetchProductProps = {
  children: JSX.Element;
};
