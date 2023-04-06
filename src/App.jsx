import Navbar from "./Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Components/Cart";
import MainComp from "./Components/MainComponent";
import { calculateTotals } from "./features/cartSlice";
import { useEffect, useState } from "react";
import SinUp from "./Components/SinUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./features/firebaseConfig";
import { toggleLoggedFalse, toggleLoggedTrue } from "./features/SinUpSlice";
import Addpage from "./Components/Addpage";



function App() {

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.sinUp);
  const { isShowing } = useSelector((state) => state.cartShow);
  const { cartItems } = useSelector((state) => state.cart);
  const { SinUPIsShowing } = useSelector((state) => state.sinUp);
  const [addPage, setAddPage] = useState(true);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems])

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(toggleLoggedTrue());
      } else {
        dispatch(toggleLoggedFalse());
      }
    })
  })

  return (
    <div className="app flex flex-col relative">
      {isShowing  && <div className="bg-green-500 h-8 w-8 flex items-center justify-center text-white rounded-full fixed right-4 bottom-6 md:right-20 md:bottom-14">
        <FontAwesomeIcon icon={faPlus} onClick={() => {
          setAddPage(prev => !prev);
          console.log('addPage', addPage)
        }}></FontAwesomeIcon>
      </div>}
      {SinUPIsShowing && <SinUp/>}
      {isShowing && <Navbar />}
      {isLoggedIn && addPage &&  <Addpage/> }
      {!isShowing && <Cart />}
      {isShowing && <MainComp/>}
    </div>
  )
}
export default App;

