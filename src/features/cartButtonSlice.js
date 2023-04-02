import { createSlice } from "@reduxjs/toolkit";

const initial = {
    name: 'button',
    isShowing: true,
};

const CartShowing = createSlice({
    name: 'cartShowing',
    initialState: initial,
    reducers: {
        toggle: (state) => {
            state.isShowing = !state.isShowing;
            console.log(state.isShowing);
        }
    }
})

export default CartShowing.reducer;
export const { toggle } = CartShowing.actions;
