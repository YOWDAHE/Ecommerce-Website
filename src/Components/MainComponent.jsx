import { render } from "@testing-library/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRender } from "../features/cartSlice";
import ItemCountainer from "./ItemContainer";

const MainComp = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setRender(cartItems))
    }, [cartItems])
    const { renderable } = useSelector((state) => state.cart);

    return (
        <div className="flex flex-wrap pt-5 justify-center md:p-20">
            {renderable.map((item) => {
                return <ItemCountainer key={item.id} {...item} />
            })}
        </div>
    )
}

export default MainComp;