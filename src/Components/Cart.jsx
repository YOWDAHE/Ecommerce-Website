import { CartIconLarg } from "../icon"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../features/cartButtonSlice";
import ItemCountainer from "./ItemContainer";
import CartItemContainer from "./CartItemContainer";

const Cart = () => {
    const { amount, cartItems } = useSelector((state) => state.cart);
    const test = cartItems.filter(item => item.inCart == true);
    // console.log("testttt", test);
    // console.log(cartItems);
    const dispatch = useDispatch();
    console.log(amount);
    if (amount === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="inline-block border-solid border-black border-2 p-10 mt-10 rounded-full opacity-80">
                    <CartIconLarg/>
                </div>
                <div className="mt-4 text-lg">
                    Cart is Empty
                </div>
                <button className="mt-10 p-5 py-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 " onClick={() => {
                    dispatch(toggle())
                }}>Continue Shoping</button>
            </div>
        )
    }
  return (
    <div>

        {test.map(item => <CartItemContainer {...item}/>)}
    </div>
  )
}

export default Cart