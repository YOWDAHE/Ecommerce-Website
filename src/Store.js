import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import SinUpSlice from "./features/SinUpSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        sinUp: SinUpSlice, 
    }
})
