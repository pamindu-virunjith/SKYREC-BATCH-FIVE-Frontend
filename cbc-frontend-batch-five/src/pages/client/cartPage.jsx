import { useState } from 'react'
import { addToCart, getcart, getTotal} from '../../utils/cart.js' //removeFromCart 
import { FaMinus, FaPlus } from "react-icons/fa6";
// import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function CartPage() {
    const [cart,setCart] = useState(getcart());

  return (
    <div className="w-full h-[calc(100% - 80px)] flex flex-col items-center pt-6 pb-23 overflow-y-auto">
        {
            cart.map((item)=>{
                return(
                    <div 
                        key={item.productId} 
                        className="w-[100%] md:w-[800px] md:rounded-2xl shadow-xl bg-white flex flex-row items-center gap-4 p-2 mb-6"
                    >
                        {/* Product Image */}
                        <img 
                            src={item.image} 
                            alt="photo" 
                            className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-lg md:rounded-xl object-cover"
                        />

                        {/* Product Info */}
                        <div className="flex flex-col justify-center items-start flex-1 text-left">
                            <h1 className="text-lg md:text-xl text-seondary font-semibold">{item.name}</h1>
                            <h1 className="text-sm md:text-md text-gray-600">{item.productId}</h1>
                            {
                                item.labledPrice > item.price ? 
                                <div className="flex flex-col md:flex-row items-start gap-2 mt-1">
                                    <span className="text-sm md:text-base text-gray-400 line-through">{item.labledPrice.toFixed(2)}</span>
                                    <span className="text-md md:text-lg text-accent font-semibold">{item.price.toFixed(2)}</span>
                                </div>
                                : <span className="text-md md:text-lg text-accent font-semibold mt-1">{item.price.toFixed(2)}</span>
                            }
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                            <div className='flex flex-row justify-center items-center gap-3'>
                                <button  
                                className="bg-accent hover:bg-seondary text-white p-1 m:p-2 rounded-md transition"
                                onClick={()=>{
                                    addToCart(item,1)
                                    setCart(getcart())
                                }}
                            >
                                <FaPlus/>
                            </button>
                            <h1 className="md:text-xl text-seondary font-semibold">{item.qty}</h1>
                            <button  
                                className="bg-accent hover:bg-seondary text-white p-1 m:p-2 rounded-md transition"
                                onClick={()=>{
                                    addToCart(item,-1)
                                    setCart(getcart())
                                }}
                            >
                                <FaMinus/>
                            </button>
                            </div>
                            {/* Price */}
                            <div className="flex flex-col justify-center items-center md:items-end md:min-w-[200px]">
                                <h1 className="text-lg md:text-2xl text-seondary font-bold md:font-semibold md:mr-4">Rs. {(item.price * item.qty).toFixed(2)}</h1>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        {/* Fixed Bottom Checkout Bar */}
        <div className="w-full fixed bottom-0 left-0 bg-white shadow-2xl py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-4 z-5">
            <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
                Total : <span className="text-accent font-bold pl-2">{getTotal().toFixed(2)}</span>
            </h1>
            <Link 
                to="/checkout" 
                state={{ cart:cart }}
                className="bg-accent hover:bg-seondary text-primary py-2 px-6 rounded-xl text-lg md:text-xl font-bold transition"
            >
                Checkout
            </Link>
        </div>
    </div>
  )
}

export default CartPage
