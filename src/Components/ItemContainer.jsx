import { useSelector, useDispatch } from "react-redux";
import { addAmount, addToCart } from "../features/cartSlice";
import { auth } from "../features/firebaseConfig";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../features/firebaseConfig";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";


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
        <div className="h-48 w-72 md:w-56 border-solid  border-gray-200 border-1 shadow-custom shadow-gray-400 m-2 flex flex-col items-center rounded-2xl overflow-hidden">
            <div className="h-24 w-full mb-3 flex justify-center">
                <img src={img} alt={title} className="h-full "/>
            </div>
            <div>
                {title}
            </div>
            <div className={remove ? "bg-red-500 text-xs py-1": ""}>
                { remove ? 'Are you sure you want to remove the item' : `${price}`}
            </div>
            {!userChecker && isLoggedIn &&  <div className="flex w-full h-10 items-center justify-evenly">
                <button className="bg-yellow-500 hover:bg-yellow-400 h-full w-full flex items-center justify-center">
                    Purchase
                </button>

                <button className="bg-blue-600 hover:bg-blue-500 h-full w-full flex items-center justify-center" onClick={() => { addingToCart(id);}}>
                    Add to cart
                </button>

            </div>}
            {userChecker && auth.currentUser && 
                <div className="flex w-full h-10 items-center justify-evenly">
                    {remove ? 
                        <div className="bg-red-700 hover:bg-red-500 h-full w-full flex text-white items-center justify-center hover:cursor-pointer" onClick={deleteItem}>
                            Yes
                        </div>
                        : 
                        <NavLink to="/addPage" className="bg-blue-700 hover:bg-blue-500 h-full w-full flex text-white items-center justify-center hover:cursor-pointer" onClick={updater} state={{ id, title, price, type, desc }}>
                            Update
                        </NavLink>    
                    }

                    {remove ?
                        <div className="bg-green-700 text-white hover:bg-green-500 h-full w-full flex items-center justify-center hover:cursor-pointer" onClick={() => setRemove(false)}>
                            No
                        </div>
                        :
                        <button className="bg-red-700 text-white hover:bg-red-500 h-full w-full flex items-center justify-center hover:cursor-pointer" onClick={() => setRemove(true)}>
                            Remove item
                        </button>
                    }
                </div>
            }
        </div>
    )
}

export default ItemCountainer;