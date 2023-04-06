import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import cartItems from "../cartItems";
import ItemCountainer from "./ItemContainer";

const MainComp = () => {
    const { renderable, cartItems } = useSelector((state) => state.cart);
    
    return (
        <div className="flex flex-wrap pt-5 justify-center md:p-20">
            {renderable.map((item) => {
                return <ItemCountainer key={item.id} {...item} />
            })}
        </div>
    )
}

export default MainComp;