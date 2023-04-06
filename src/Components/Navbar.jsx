import {CartIcon, UserIcon} from "../icon";
import { toggle } from "../features/cartButtonSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { auth } from "../features/firebaseConfig";
import { signOut } from "firebase/auth";
import { togglePage } from "../features/SinUpSlice";
import { setRender } from "../features/cartSlice";
const Navbar = () => {

    const sinOut = async () => {
        await signOut(auth);
    }
    const sinin =  () => {
        dispatch(togglePage());
    }

    const dispatch = useDispatch();
    const [userOption, setUserOption] = useState(true);
    const [dropdown, setDropDown] = useState('');
    const { amount, renderable, cartItems } = useSelector((state) => state.cart)
    const { isLoggedIn } = useSelector((state) => state.sinUp);
    const [filtteredList, setFiltteredList] = useState(null);


    const selectChange = (event) => {
        setDropDown(event.target.value);
        changeState();
    }
    const changeState = () => {
        setFiltteredList(cartItems.filter(item => item.type == dropdown)
        )
        dispatch(setRender(filtteredList));
    }
    
    console.log('filtteredList', filtteredList)    

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
                <div className="text-xs h-6 mx-2 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-5 transition-all" onClick={() => {
                    { isLoggedIn && sinOut(); }
                    { !isLoggedIn && sinin(); }

                }}>
                    {isLoggedIn && 'Log Out'}
                    {!isLoggedIn && 'Sign In'}
                </div>
                <div className="text-xs h-6 mx-2 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-5 transition-all">
                    Your Items
                </div>
                <div className="text-xs h-6 mx-2 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-5 transition-all" onClick={() => {
                    dispatch(toggle());
                }}>
                    Cart items
                </div>
                <select name="Fliter" className=" text-xs h-6 mx-2 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-5 transition-all"  onClick={selectChange}>
                    <option value="All" >All</option>
                    <option value="Phone" className="bg-gray-700">Phone</option>
                    <option value="Laptop" className="bg-gray-700">Laptop</option>
                </select>
            </div>}
        </div>
    )
}

export default Navbar;