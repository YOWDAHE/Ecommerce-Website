import { CartIconLarg } from "../icon"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../features/cartButtonSlice";

const Cart = () => {
    const { amount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    if (amount === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="inline-block border-solid border-black border-2 p-10 mt-10 rounded-full opacity-80">
                    <CartIconLarg/>
                </div>
                <div className="mt-4 text-lg">
                    Cart is Empty
                </div>
                <button className="mt-10 p-5 py-3 bg-blue-600 rounded-xl text-white" onClick={() => {
                    dispatch(toggle())
                }}>Continue Shoping</button>
            </div>
        )
    }
  return (
    <div>
        {amount}
    </div>
  )
}

export default Cart