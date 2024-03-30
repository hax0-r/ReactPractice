import { configureStore } from "@reduxjs/toolkit";
import { GetProductsReducer } from "./Slice/ProductSlice";

export const store = configureStore({
    reducer: {
        GetProductsReducer: GetProductsReducer
    }
})