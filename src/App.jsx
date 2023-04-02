import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";
function App() {
  const { isShowing } = useSelector((state) => state.cartShow);
  return (
    <div className="app">
      {isShowing && <Navbar />}
    </div>
  )
}
export default App;

