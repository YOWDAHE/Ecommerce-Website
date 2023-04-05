import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { toggleLoggedTrue, toggleLoggedFalse } from "./SinUpSlice";

export const Authentication = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.sinUp);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(toggleLoggedTrue());
            } else {
                dispatch(toggleLoggedFalse());
           }
       }) 
    },[])

    return (
        <div></div>
    )
    
}