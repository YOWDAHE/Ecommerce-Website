import { CartIconLarg } from "../icon"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../features/cartButtonSlice";
import ItemCountainer from "./ItemContainer";
import CartItemContainer from "./CartItemContainer";
import { useEffect, useState } from "react";
import { CartArr, emptyAmount } from "../features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const Cart = () => {
    const dispatch = useDispatch();
    const { isShowing } = useSelector((state) => state.cartShow);
    const { insideCart } = useSelector((state) => state.cart)
    const { amount, cartItems } = useSelector((state) => state.cart);
    const [clrCart, setClrCart] = useState(false);
    // const test = cartItems.filter(item => item.inCart == true);

    useEffect(() => {
        dispatch(CartArr());
    }, [cartItems])

    const cleatCart = () => {
        insideCart.forEach(element => {
            dispatch(emptyAmount(element.id));
        });
    }
    if (amount === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="inline-block border-solid border-black border-2 p-10 mt-10 rounded-full opacity-80">
                    <CartIconLarg/>
                </div>
                <div className="mt-4 text-lg">
                    Cart is Empty
                </div>
                <Link to="/">
                    <button className="mt-10 p-5 py-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 " onClick={() => {
                        // dispatch(toggle())
                    }}>Continue Shoping</button>
                </Link>
            </div>
        )
    }


  return (
    <div>
        <div className="bg-gray-100 h-10 w-fill flex px-4 items-center justify-between ">
              <div>
                  <FontAwesomeIcon icon={faArrowLeft} onClick={() => {
                      dispatch(toggle());
                  }}></FontAwesomeIcon>
              </div>
              <div className="text-red-700 hover:cursor-pointer flex items-center text-xs md:text-sm">
                  {!clrCart && <div onClick={() => {
                      setClrCart(true);
                  }}>Clear cart</div> }
                  {clrCart && <div>Are you sure you want to clear cart?</div>}
                  {
                    clrCart &&
                    <div>
                        <button className="mx-3 bg-red-600 text-white px-3 rounded-lg" onClick={() => {
                            cleatCart();
                        }}>Yes</button>
                        <button className=" bg-red-600 text-white px-3 rounded-lg" onClick={() => {
                            setClrCart(false);
                        }}>No</button>
                    </div>
                  }
              </div>
        </div>
        {insideCart.map(item => <CartItemContainer key={item.id} {...item}/>)}
    </div>
  )
}

export default Cart