import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState, ProductType } from "./types";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import axios from "axios";

const initialState: ProductState = {
  isLoading: false,
  data: {},
  error: "",
};

export const fetchProductById = createAsyncThunk(
  "products/fetchByIdStatus",
  async (productId: string, thunkAPI) => {
    try {
      const response = await axios.get(`/products/${productId}`);
      return response.data as ProductType;
    } catch (err: any) {
      const status = err?.status ?? 500;
      return thunkAPI.rejectWithValue({
        message:
          status === 404
            ? "404 - Could not find your product"
            : "We encountered an error fetching your product, please try again later.",
      });
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data[action.payload.id] = action.payload;
      state.error = "";
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
      const message =
        (action.payload as { message: string })?.message ?? "Unknown Error";
      state.error = message;
    });
  },
});

export const productReducer = productSlice.reducer;

export const productSelector = (state: RootState) => state.productReducer;

export const useProducts = () => useSelector(productSelector);
