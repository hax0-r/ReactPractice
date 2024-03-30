import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATESES } from "../Statuses";
import axios from "axios";

const FetchData = createAsyncThunk("fetch/products", async () => {
    const url = await axios.get("https://fakestoreapi.com/products/")
    const response = url.data;
    return response;
})

const getProductSlice = createSlice({
    name: "GET PRODUCTS",
    initialState: {
        data: [],
        StatusesLoader: STATESES
    },
    extraReducers: (builder) => {
        builder.addCase(FetchData.pending, (state, action) => {
            state.StatusesLoader = STATESES.GET_PRODUCT
        })
        builder.addCase(FetchData.fulfilled, (state, action) => {
            state.StatusesLoader = STATESES.PRODUCT_LOADED
            state.data.push(...action.payload)
        })
        builder.addCase(FetchData.rejected, (state, action) => {
            state.StatusesLoader = STATESES.FAIL_PRODUCT
        })
    }
})

const { reducer } = getProductSlice

export {
    FetchData,
    reducer as GetProductsReducer
}