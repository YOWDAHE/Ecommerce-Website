
import { ChevronUp, ChevronDown } from "../icon";
import { useSelector, useDispatch } from "react-redux";
import { addAmount, decreaseAmount, emptyAmount, removeFromCart } from "../features/cartSlice";

const CartItemContainer = ({ id, title, price, img, amount }) => {
    const dispatch = useDispatch();
    return (
        <div className="h-24 w-12/12 bg-gray-100 my-1 flex items-center md:self-center px-2 justify-between md:w-8/12">
            <div className='h-4/5 w-1/4 container'>
                <img src={img} alt={title} className="h-full"/>
            </div>
            <div>
                <div>
                    {title}
                </div>
                <div>
                    {price}
                </div>
                <button className="text-red-600" onClick={() => {
                    dispatch(emptyAmount(id));
                    dispatch(removeFromCart(id))
                }}>
                    remove
                </button>
            </div>
            <div className="mr-6">
                <div onClick={() => {
                    dispatch(addAmount(id));
                }}>
                    <ChevronUp/>
                </div>
                <div className="text-center">
                    {amount}
                </div>
                <div onClick={() => {
                    dispatch(decreaseAmount(id));
                    if (amount == 1) {
                        return dispatch(removeFromCart(id));
                    }
                }}>
                    <ChevronDown/>
                </div>
            </div>
        </div>
    )
}

export default CartItemContainer;