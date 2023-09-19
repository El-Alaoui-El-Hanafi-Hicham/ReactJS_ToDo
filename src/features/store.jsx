import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "./api/apiSlice";

export const store = configureStore({
    reducer:{
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer
// task:TaskSlice.reducer,
    },
    middleware:getDefaultMiddleware=>
    getDefaultMiddleware().concat(apiSlice.middleware)
})