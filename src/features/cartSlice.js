import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../cartItems";
const initial = {
    cartItems: cartItems,
    insideCart:{},
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
        },
        addAmount: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload);
            cartItem.amount += 1;
        },
        decreaseAmount: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload);
            cartItem.amount -= 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
        addToCart: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            item.inCart = true;
        },
        removeFromCart: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            item.inCart = false;
        }
    }
})

export default CartSlice.reducer;
export const { emptyCart, decreaseAmount, addAmount, calculateTotals, addToCart, removeFromCart } = CartSlice.actions;