import { createSlice } from "@reduxjs/toolkit";

const init = {
    SinUPIsShowing: true,
    sinup: true,
    sinin: false,
}

const sinup = createSlice({
    name :'sinUp',
    initialState: init,
    reducers: {
        togglePage: (state) => {
            state.SinUPIsShowing = !state.SinUPIsShowing;
        },
        toggleSinup: (state) => {
            state.sinup = !state.sinup;
            state.sinin = !state.sinin;
        }
    }
})

export default sinup.reducer;
export const {togglePage, toggleSinup} = sinup.actions