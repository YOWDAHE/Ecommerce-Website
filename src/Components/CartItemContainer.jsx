

import React from 'react'

const CartItemContainer = ({ id, title, price, img, inCart }) => {
    return (
        <div className="h-24 w-auto bg-gray-500 mt-10 flex items-center px-2">
            <div className='h-4/5 w-1/4 container'>
                <img src={img} alt={title} className="h-full"/>
            </div>
            <div>
                <div>
                    {title}
                </div>
                <div>
                    {price}
                </div>
                <button>
                    remove
                </button>
            </div>
        </div>
    )
}

export default CartItemContainer;