import { createSlice } from "@reduxjs/toolkit";

const initial = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: false,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState: initial,
    reducers: {
        emptyCart: (state) => {
            state.cartItems = [];
        }
    }
})

export default CartSlice.reducer;
export const { emptyCart } = CartSlice.actions;