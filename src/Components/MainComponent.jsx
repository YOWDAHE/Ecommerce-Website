import { useSelector } from "react-redux";
import cartItems from "../cartItems";
import ItemCountainer from "./ItemContainer";

const MainComp = () => {
    const {cartItems} = useSelector((state) => state.cart) 
    // const thing = JSON.stringify(cartItems)
    return (
        <div className="flex flex-wrap pt-5">
            {cartItems.map((item) => {
                return <ItemCountainer key={item.id} {...item} />
            })}
        </div>
    )
}

export default MainComp;