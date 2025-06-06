import React, { useState } from 'react'
import { addToCart, getcart, getTotal, removeFromCart } from '../../utils/cart.js'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function CartPage() {
    const [cart,setCart] = useState(getcart());

  return (
    <div className='w-full h-[calc(100%-80px)] flex flex-col items-center pt-4  overflow-y-auto'>
        {
            cart.map(
                (item)=>{
                    return(
                        <div key={item.productId} className='w-[600px] h-[100px] rounded-3xl  shadow-2xl flex flex-row bg-primary m-4 relative justify-center items-center'>
                            <img src={item.image} alt="photo" className='w-[100px] h-[100px] rounded-3xl object-cover' />
                            <div className='w-[250px] h-full flex flex-col justify-center items-start pl-4'>
                                <h1 className='text-xl text-seondary font-semibold'>{item.name}</h1>
                                <h1 className='text-md text-gray-600 font-semibold'>{item.productId}</h1>
                               {
                                    item.labledPrice > item.price ? 
                                    <div>
                                        <span className='text-md mx-1 text-gray-300 line-through'>{item.labledPrice.toFixed(2)}</span>
                                        <span className='text-md mx-3 text-accent '>{item.price.toFixed(2)}</span>
                                    </div>
                                    : <span className='text-md mx-4 text-accent '>{item.price.toFixed(2)}</span>
                                }
                            </div>
                            <div className='w-[100px] h-full flex flex-row justify-evenly items-center'>
                                <button  className='text-white font-bold hover:bg-seondary cursor-pointer bg-accent aspect-square p-1  rounded-[3px]' onClick={()=>{
                                    addToCart(item,1)
                                    setCart(getcart())
                                }}><FaPlus/></button>
                                <h1 className='text-xl text-seondary font-semibold'>{item.qty}</h1>
                                <button   className='text-white font-bold hover:bg-seondary cursor-pointer bg-accent aspect-square p-1 rounded-[3px]' onClick={()=>{
                                    addToCart(item,-1)
                                    setCart(getcart())
                                }}><FaMinus/></button>
                            </div>
                            <div className='w-[200px] h-full flex flex-col justify-center items-end pr-4'>
                                <h1 className='text-2xl text-seondary font-semibold'>Rs. {(item.price * item.qty).toFixed(2)}</h1>
                            </div>
                            <button className='absolute text-2xl text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-full p-2 right-[-40px]' onClick={
                                ()=>{
                                    removeFromCart(item.productId)
                                    setCart(getcart())
                                }
                            }><BiTrash/></button>
                            <div className='w-full  h-[80px] fixed bottom-0 left-0 flex items-center justify-evenly shadow-2xl'>
                                <h1 className='text-3xl font-semibold tracking-wide'>Total :<span className='text-accent pl-3'>{getTotal().toFixed(2)}</span></h1>
                                <Link to="/checkout" state={
                                    {
                                        cart:cart
                                    }
                                }className='bg-accent text-primary py-2 px-3  rounded-[15px] text-2xl  font-bold cursor-pointer hover:bg-seondary'>Checkout</Link>
                            </div>
                        </div>
                    )
                }
            )
        }
        
    </div>

  )
}

export default CartPage