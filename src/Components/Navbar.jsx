import {CartIcon, UserIcon} from "../icon";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { auth } from "../features/firebaseConfig";
import { signOut } from "firebase/auth";
import { togglePage, AddPageOff } from "../features/SinUpSlice";
import { setRender } from "../features/cartSlice";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

    const sinOut = async () => {
        await signOut(auth);
    }
    const sinin =  () => {
        dispatch(togglePage());
    }

    const dispatch = useDispatch();
    const [userOption, setUserOption] = useState(true);
    const [search, setSearch] = useState('');
    const { amount, renderable, cartItems } = useSelector((state) => state.cart)
    const { isLoggedIn, addPage } = useSelector((state) => state.sinUp);
    const [filtteredList, setFiltteredList] = useState(cartItems);
    const srchBtn = useRef();

    useEffect(()=>{
        dispatch(setRender(filtteredList));
    }, [filtteredList])

    const userItems = () => {
        setFiltteredList(cartItems.filter(item => item.userId == auth?.currentUser?.uid)
        );
        dispatch(setRender(filtteredList));
    }


    const selectChange = (event) => {
        if (event.target.value == 'All') {
            dispatch(setRender(cartItems));
        } else {
            setFiltteredList(cartItems.filter(item => item.type == event.target.value)
            )
        }
    }    

    const handleSearch = () => {
        srchBtn.current.value = '';
        setFiltteredList(cartItems.filter(item => item.title == search))
    }


    return (
        <div>
            
            <div className=" flex h-15 w-11/12 mt-4 mx-5 rounded-xl p-2 px-4 items-center text-gray-900 border-solid border-gray-300 border-2 md:w-3/5 ml-auto mr-auto">
                <div className="mr-auto ml-1 text-lg font-bold text-gray-700 tracking-wider">
                    Company
                </div>
                <div className="mr-10">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input ref={srchBtn} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-400 block w-full h-7 pl-10 p-2.5" placeholder="Search" onChange={(e) => {
                                setSearch(e.target.value);
                                console.log(search);
                            }}/>
                        </div>
                        <button type="button" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-7 w-7 flex items-center justify-center" onClick={() => {
                            if (search != '') {
                                handleSearch();
                            }
                        }}>
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </button>
                    </form>

                </div>
                <div className="flex">
                    <div className="pr-3 relative hover:cursor-pointer text-blue-700">
                        <Link to="/cart">
                            <div className="absolute bg-gray-500 bg rounded-full w-6 text-center text-sm right-1 top-0 bg-opacity-80 text-white">{amount}</div>
                            <CartIcon />
                        </Link>
                    </div>
                    <div onClick={()=> setUserOption(prevState => !prevState)}>
                        <UserIcon/>
                    </div>
                </div>
            </div>
            {userOption && <div className=" h-10 w-11/12 flex items-center justify-center ml-auto mr-auto lg:justify-end md:w-3/5 ">
                <div className="text-xs h-6 mx-1 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-3 md:hover:px-5 md:hover:mx-3 transition-all" onClick={() => {
                    { !isLoggedIn && sinin(); }
                    {isLoggedIn && sinOut();}

                }}>
                    {isLoggedIn && 'Log Out'}
                    {!isLoggedIn && 'Sign In'}
                </div>
                { isLoggedIn && <div className="text-xs h-6 mx-1 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-3 md:hover:px-5 md:hover:mx-3 transition-all" onClick={userItems}>
                    Your Items
                </div>}
                <NavLink to="/cart" className="text-xs h-6 mx-1 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-3 md:hover:px-5 md:hover:mx-3 transition-all">
                    Cart items
                </NavLink>
                <select name="Fliter" className=" text-xs h-6 mx-1 md:mx-5 px-3 md:text-sm bg-gray-700 text-white rounded-full flex items-center hover:cursor-pointer hover:bg-gray-800 hover:px-1 md:hover:px-5 transition-all"  onClick={selectChange}>
                    <option value="All" >All</option>
                    <option value="phone" className="bg-gray-700">phone</option>
                    <option value="laptop" className="bg-gray-700">laptop</option>
                </select>
            </div>}
        </div>
    )   
}

export default Navbar;