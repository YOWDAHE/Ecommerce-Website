import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setRender } from "../features/cartSlice";
import ItemCountainer from "./ItemContainer";
import Navbar from "./Navbar";

const MainComp = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setRender(cartItems))
    }, [cartItems])

    const { renderable } = useSelector((state) => state.cart);
    const { isLoggedIn } = useSelector((state) => state.sinUp);


    return (
        <>
            <Navbar/>
            <div className="flex flex-wrap pt-5 justify-center md:p-20">
                {renderable.map((item) => {
                    return <ItemCountainer key={item.id} {...item} />
                })}
            </div>
            {isLoggedIn && <Link to="/addPage">
                <div className="bg-green-500 h-8 w-8 flex items-center justify-center text-white rounded-full fixed right-4 bottom-6 md:right-20 md:bottom-14">
                    <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                </div>
            </Link>}
        </>
    )
}

export default MainComp;