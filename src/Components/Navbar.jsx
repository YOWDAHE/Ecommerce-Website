import {CartIcon, UserIcon} from "../icon";


const Navbar = () => {
    return (
        <div className=" bg-gray-100 flex h-15 my-1 mx-2 rounded-lg p-2 items-center text-gray-900 border-solid border-gray-200 border-2">
            <div className="mr-auto ml-1 text-lg font-bold text-gray-700 tracking-wider">
                Company
            </div>
            <div className="flex">
                <div className="pr-3 relative hover:cursor-pointer">
                    <div className="absolute bg-gray-500 bg rounded-full w-6 text-center text-sm right-1 top-0 bg-opacity-80 text-white">0</div>
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