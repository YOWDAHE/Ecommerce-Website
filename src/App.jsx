import Navbar from "./Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Components/Cart";
import MainComp from "./Components/MainComponent";
import { calculateTotals } from "./features/cartSlice";
import { useEffect } from "react";
import SinUp from "./Components/SinUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./features/firebaseConfig";
import { toggleLoggedFalse, toggleLoggedTrue } from "./features/SinUpSlice";


function App() {

  const dispatch = useDispatch();
  const { isShowing } = useSelector((state) => state.cartShow);
  const { cartItems } = useSelector((state) => state.cart);
  const { SinUPIsShowing } = useSelector((state) => state.sinUp);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems])

  useEffect(() => {
    console.log("changereeee");
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(toggleLoggedTrue());
      } else {
        dispatch(toggleLoggedFalse());
      }
    })
  })

  return (
    <div className="app">
      <div className="bg-green-500 h-8 w-8 flex items-center justify-center text-white rounded-full fixed right-4 bottom-4 md:top-6 md:right-60">
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </div>
      {SinUPIsShowing && <SinUp/>}
      {isShowing && <Navbar />}
      {!isShowing && <Cart />}
      {isShowing && <MainComp/>}
    </div>
  )
}
export default App;

