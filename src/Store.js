import { configureStore } from "@reduxjs/toolkit";
import cartButtonSlice from "./features/cartButtonSlice";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
    reducer: {
        cartShow: cartButtonSlice,
        cart: cartSlice,
    }
})
