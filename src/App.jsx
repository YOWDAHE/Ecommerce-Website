import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";
import Cart from "./Components/Cart";
function App() {
  const { isShowing } = useSelector((state) => state.cartShow);
  return (
    <div className="app">
      {isShowing && <Navbar />}
      {!isShowing && <Cart />}
    </div>
  )
}
export default App;

