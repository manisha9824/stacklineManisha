import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

interface ProductState {
    data: Product | null;
    loading: boolean;
}

const initialState: ProductState = {
    data: null,
    loading: true,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductData: (state, action: PayloadAction<Product>) => {
            state.data = action.payload;
            state.loading = false;
        },
    },
});

export const { setProductData } = productSlice.actions;
export default productSlice.reducer;
