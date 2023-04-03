import Navbar from "./Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Components/Cart";
import MainComp from "./Components/MainComponent";
import { calculateTotals } from "./features/cartSlice";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const { isShowing } = useSelector((state) => state.cartShow);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  },[cartItems])

  return (
    <div className="app">
      {isShowing && <Navbar />}
      {!isShowing && <Cart />}
      {isShowing && <MainComp/>}
    </div>
  )
}
export default App;

