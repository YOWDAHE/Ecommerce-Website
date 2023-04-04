import { useSelector, useDispatch } from "react-redux";
import { addAmount, addToCart } from "../features/cartSlice";


const ItemCountainer = ({ id, title, price, img, inCart }) => {
    const { amount } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const addingToCart = (id) => {
        dispatch(addAmount(id));
        dispatch(addToCart(id));
    }
    return (
        <div className="h-48 w-56 border-solid  border-gray-200 border-1 shadow-custom shadow-gray-400 m-2 flex flex-col items-center rounded-2xl overflow-hidden">
            <div className="h-24 w-full mb-3 flex justify-center">
                <img src={img} alt={title} className="h-full "/>
            </div>
            <div>
                {title}
            </div>
            <div className="">
                ${price}
            </div>
            <div className="flex w-full h-10 items-center justify-evenly">
                <button className="bg-yellow-500 hover:bg-yellow-400 h-full w-full flex items-center justify-center">
                    Purchase
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 h-full w-full flex items-center justify-center" onClick={() => { addingToCart(id);}}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ItemCountainer;