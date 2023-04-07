import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../cartItems";

const initial = {
    cartItems: [],
    renderable: [],
    insideCart:[],
    amount: 0,
    total: 0,
    isLoading: false,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState: initial,
    reducers: {
        setCart: (state, action) => {
            console.log('state.cartItems', action.payload)
            state.cartItems = action.payload;
        },
        setRender: (state, action) => {
            state.renderable = action.payload;
        },
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
        emptyAmount: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload);
            cartItem.amount = 0;
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
        },
        CartArr: (state) => {
            state.insideCart = state.cartItems.filter(item => item.inCart == true);
        }
    }
})

export default CartSlice.reducer;
export const { emptyCart, decreaseAmount, addAmount, calculateTotals, addToCart, removeFromCart, CartArr, emptyAmount, setRender, setCart } = CartSlice.actions;