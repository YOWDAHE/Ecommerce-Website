import {CartIcon, UserIcon} from "../icon";
import { useDispatch } from "react-redux";
import { toggle } from "../features/cartButtonSlice";
import { useSelector } from "react-redux";


const Navbar = () => {
    const dispatch = useDispatch();
    const {amount} = useSelector((state) => state.cart)
    return (
        <div className=" bg-gray-100 flex h-15 mt-4 mx-2 rounded-full p-2 px-4 items-center text-gray-900 border-solid border-gray-200 border-b-2">
            <div className="mr-auto ml-1 text-lg font-bold text-gray-700 tracking-wider">
                Company
            </div>
            <div className="flex">
                <div className="pr-3 relative hover:cursor-pointer text-blue-700" onClick={() => {
                    dispatch(toggle());
                }}>
                    <div className="absolute bg-gray-500 bg rounded-full w-6 text-center text-sm right-1 top-0 bg-opacity-80 text-white">{amount}</div>
                    <CartIcon/>
                </div>
                <div>
                    <UserIcon/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;