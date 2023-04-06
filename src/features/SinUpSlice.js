import { faL } from "@fortawesome/free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";

const init = {
    SinUPIsShowing: false,
    sinup: true,
    sinin: false,
    isLoggedIn: false,
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
        },
        toggleLoggedTrue: (state) => {
            state.isLoggedIn = true;
        },
        toggleLoggedFalse: (state) => {
            state.isLoggedIn = false;
        }
    }
})

export default sinup.reducer;
export const {togglePage, toggleSinup, toggleLoggedTrue, toggleLoggedFalse} = sinup.actions