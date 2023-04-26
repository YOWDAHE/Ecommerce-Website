import Navbar from "./Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Components/Cart";
import MainComp from "./Components/MainComponent";
import { calculateTotals, setCart } from "./features/cartSlice";
import { useEffect, useState } from "react";
import SinUp from "./Components/SinUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./features/firebaseConfig";
import { toggleLoggedFalse, toggleLoggedTrue, AddPageOff, AddPageOn } from "./features/SinUpSlice";
import Addpage from "./Components/Addpage";

import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from "./features/firebaseConfig";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";



function App() {

  const dispatch = useDispatch();
  const { isLoggedIn, addPage } = useSelector((state) => state.sinUp);
  const { cartItems } = useSelector((state) => state.cart);
  const { SinUPIsShowing } = useSelector((state) => state.sinUp);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const UserCollection = collection(db, "items");

      const data = await getDocs(UserCollection);
      const res = data.docs.map((docs) => ({ ...docs.data(), id: docs.id }));
      setItem(res);
    }
    getUser();

  }, [])

  const setItem = (it) => {
    dispatch(setCart(it));
  }



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
    <div className="back">
      <div className="main">

        {SinUPIsShowing && <SinUp />}
        <Routes>
          <Route path="/" element={<MainComp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addPage" element={<Addpage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </div>
    </div>
  )
}
export default App;

