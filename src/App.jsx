import Navbar from "./Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Components/Cart";
import MainComp from "./Components/MainComponent";
import { calculateTotals } from "./features/cartSlice";
function App() {
  const { isShowing } = useSelector((state) => state.cartShow);
  return (
    <div className="app">
      {isShowing && <Navbar />}
      {!isShowing && <Cart />}
      {isShowing && <MainComp/>}
    </div>
  )
}
export default App;

