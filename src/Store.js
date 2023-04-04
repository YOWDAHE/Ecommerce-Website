import { configureStore } from "@reduxjs/toolkit";
import cartButtonSlice from "./features/cartButtonSlice";
import cartSlice from "./features/cartSlice";
import SinUpSlice from "./features/SinUpSlice";

export const store = configureStore({
    reducer: {
        cartShow: cartButtonSlice,
        cart: cartSlice,
        sinUp: SinUpSlice, 
    }
})
