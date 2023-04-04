import {CartIcon, UserIcon} from "../icon";
import { useDispatch } from "react-redux";
import { toggle } from "../features/cartButtonSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [userOption, setUserOption] = useState(true);
    const dispatch = useDispatch();
    const {amount} = useSelector((state) => state.cart)
    return (
        <div>
            
            <div className="bg-gray-100 flex h-15 w-11/12 mt-4 mx-5 rounded-full p-2 px-4 items-center text-gray-900 border-solid border-gray-200 border-b-2 md:w-3/5 ml-auto mr-auto">
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
                    <div onClick={()=> setUserOption(prevState => !prevState)}>
                        <UserIcon/>
                    </div>
                </div>
            </div>
            {userOption && <div className=" h-10 w-11/12 flex items-center justify-center ml-auto mr-auto lg:justify-end md:w-3/5 ">
                <div className="text-xs h-6 mx-2 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-5 transition-all">
                    user name
                </div>
                <div className="text-xs h-6 mx-2 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-5 transition-all">
                    Your Items
                </div>
                <div className="text-xs h-6 mx-2 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-5 transition-all">
                    Cart items
                </div>
            </div>}
        </div>
    )
}

export default Navbar;