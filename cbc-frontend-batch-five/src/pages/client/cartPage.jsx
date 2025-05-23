import React, { useState } from 'react'
import { getcart } from '../../utils/cart'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BiTrash } from 'react-icons/bi';

function CartPage() {
    const [cart,setCart] = useState(getcart());

  return (
    <div className='w-full h-full flex flex-col items-center pt-4'>
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
                                <button  className='text-white font-bold hover:bg-seondary cursor-pointer bg-accent aspect-square p-1  rounded-[3px]'><FaPlus/></button>
                                <h1 className='text-xl text-seondary font-semibold'>{item.qty}</h1>
                                <button   className='text-white font-bold hover:bg-seondary cursor-pointer bg-accent aspect-square p-1 rounded-[3px]'><FaMinus/></button>
                            </div>
                            <div className='w-[200px] h-full flex flex-col justify-center items-end pr-4'>
                                <h1 className='text-2xl text-seondary font-semibold'>Rs. {(item.price * item.qty).toFixed(2)}</h1>
                            </div>
                            <button className='absolute text-2xl text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-full p-2 right-[-40px]'><BiTrash/></button>
                        </div>
                    )
                }
            )
        }
    </div>
  )
}

export default CartPage