import { createSlice } from "@reduxjs/toolkit";

const initial = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: false,
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState: initial,
    reducers: {
        emptyCart: (state) => {
            state.cartItems = [];
        }
    }
})