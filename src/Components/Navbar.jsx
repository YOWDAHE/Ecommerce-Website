import CartIcon from "../icon";


const Navbar = () => {
    return (
        <div className=" bg-gray-900 flex h-10 my-1 mx-2 rounded-lg p-3 items-center text-white">
            <div>
                Company
            </div>
            <div>
                <CartIcon/>
            </div>
        </div>
    )
}

export default Navbar;