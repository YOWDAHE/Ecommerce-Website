import { useSelector, useDispatch } from "react-redux";
import { addAmount, addToCart } from "../features/cartSlice";
import { auth } from "../features/firebaseConfig";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../features/firebaseConfig";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "../index.css";


const ItemCountainer = ({ id, title, price, img, inCart, userId, desc, type }) => {
    const { amount } = useSelector((state) => state.cart);
    const { isLoggedIn } = useSelector((state) => state.sinUp);
    const [remove, setRemove] = useState(false)

    const userChecker = auth?.currentUser?.uid == userId ? true : false;
    const dispatch = useDispatch();
    const addingToCart = (id) => {
        dispatch(addAmount(id));
        dispatch(addToCart(id));
    }

    const thing = [id, title, price, type, desc];
    const updater = () => {
        // <Addpage {...thing} />
    }

    const deleteItem = async () => {
        try {
            await deleteDoc(doc(db, "items", id))
        } catch(error) {
            console.log("delete error >>>>", error);
        }
    }


    return (
        // <div className="h-48 w-72 md:w-56 border-solid  border-gray-200 border-1 shadow-custom shadow-gray-400 m-2 flex flex-col items-center rounded-2xl overflow-hidden">
        <div className="h-58 w-82 md:w-56 border-solid  border-gray-200 border-2 m-2 flex flex-col items-center  overflow-hidden py-2 shadow-custom hover:shadow-cumsom-hover transition-shadow rounded-md bg-white">
            <div className="h-24 w-full mb-3 flex justify-center ">
                <img src={img} alt={title} className="h-full "/>
            </div>
            <div className="font-semibold">
                {title}
            </div>
            <div className={remove ? "bg-red-500 text-xs py-1": ""}>
                { remove ? 'Are you sure you want to remove the item' : `$${price}`}
            </div>
            {!userChecker && isLoggedIn &&  <div className="flex  w-full h-10 items-center justify-evenly mt-4">
                <button className=" hover:bg-gray-200 hover:border-gray-700 h-full w-5/12 flex items-center justify-center border-solid border-gray-500 border-2 text-sm rounded-sm">
                    Purchase
                </button>

                <button className=" hover:bg-gray-200 hover:border-gray-700 h-full w-5/12 flex items-center justify-center border-solid border-gray-500 border-2 text-sm rounded-sm" onClick={() => { addingToCart(id);}}>
                    Add to cart
                </button>

            </div>}
            {userChecker && auth.currentUser && 
                <div className="flex w-full h-10 items-center justify-evenly mt-4">
                    {remove ? 
                        <div className=" hover:bg-gray-200 hover:border-gray-700 h-full w-5/12 flex items-center justify-center hover:cursor-pointer border-solid border-gray-500 border-2 text-sm rounded-sm" onClick={deleteItem}>
                            Yes
                        </div>
                        : 
                        <NavLink to="/addPage" className=" hover:bg-gray-200 hover:border-gray-700 h-full w-5/12 flex items-center justify-center hover:cursor-pointer border-solid border-gray-500 border-2 text-sm rounded-sm" onClick={updater} state={{ id, title, price, type, desc }}>
                            Update
                        </NavLink>    
                    }

                    {remove ?
                        <div className="  hover:bg-gray-200 hover:border-gray-700 h-full w-5/12 flex items-center justify-center hover:cursor-pointer border-solid border-gray-500 border-2 text-sm rounded-sm" onClick={() => setRemove(false)}>
                            No
                        </div>
                        :
                        <button className="  hover:bg-gray-200 hover:border-gray-700 h-full w-5/12 flex items-center justify-center hover:cursor-pointer border-solid border-gray-500 border-2 text-sm rounded-sm" onClick={() => setRemove(true)}>
                            Remove item
                        </button>
                    }
                </div>
            }
        </div>
    )
}

export default ItemCountainer;