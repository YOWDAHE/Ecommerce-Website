import { configureStore } from "@reduxjs/toolkit";
import cartButtonSlice from "./features/cartButtonSlice";

export const store = configureStore({
    reducer: {
        cartShow: cartButtonSlice,
    }
})
