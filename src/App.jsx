import Navbar from "./Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Components/Cart";
import MainComp from "./Components/MainComponent";
import { calculateTotals, setCart } from "./features/cartSlice";
import { useEffect, useState } from "react";
import SinUp from "./Components/SinUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./features/firebaseConfig";
import { toggleLoggedFalse, toggleLoggedTrue, AddPageOff, AddPageOn} from "./features/SinUpSlice";
import Addpage from "./Components/Addpage";

import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from "./features/firebaseConfig";
import { Navigate, Route, Routes } from "react-router-dom";



function App() {

  const dispatch = useDispatch();
  const { isLoggedIn, addPage } = useSelector((state) => state.sinUp);
  const { isShowing } = useSelector((state) => state.cartShow);
  const { cartItems } = useSelector((state) => state.cart);
  const { SinUPIsShowing } = useSelector((state) => state.sinUp);
  // const [addPage, setAddPage] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const UserCollection = collection(db, "items");

      const data = await getDocs(UserCollection);
      console.log(data.docs, "firebase data");
      const res = data.docs.map((docs) => ({ ...docs.data(), id: docs.id }));
      setItems(res);
      setItem(res);
    }
    getUser();
    console.log("new data", items);
  
  }, [])

  console.log('items', items);
  
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

  console.log('SinUPIsShowing', SinUPIsShowing);

  return (
    <>
      {SinUPIsShowing && <SinUp/>}
      <Routes>
        <Route path="/" element={<MainComp/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/addPage" element={<Addpage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>

      {/* <div className="app flex flex-col relative">
        {isShowing && <div className="bg-green-500 h-8 w-8 flex items-center justify-center text-white rounded-full fixed right-4 bottom-6 md:right-20 md:bottom-14" onClick={() => {
          dispatch(AddPageOn());
          console.log('addPage', addPage)
        }}>
          <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
        </div>}
        {isShowing && <Navbar />}
        {isLoggedIn && addPage &&  <Addpage/> }
        {!isShowing && <Cart />}
        {isShowing && <MainComp />}
        
      </div> */}
    </>
  )
}
export default App;

