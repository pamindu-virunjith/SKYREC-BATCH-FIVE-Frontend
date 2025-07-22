import { useState } from 'react'
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
                        <div key={item.productId} className='w-[80%] md:w-[600px] md:h-[100px] rounded-3xl shadow-2xl md:flex-row bg-primary m-4 relative flex-col flex items-center'>
                            <img src={item.image} alt="photo" className='md:w-[100px] md:h-[100px] w-[300px] h-[200px] rounded-3xl object-cover m-5 md:m-0'/>
                            <div className='w-[250px] md:h-full flex flex-col justify-center items-center md:items-start md:pl-4'>
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
                            <div className='w-[100px] md:h-full flex flex-row justify-evenly items-center my-5'>
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
                            <div className='w-[200px] md:h-full flex flex-col justify-center items-center md:items-end md:pr-4'>
                                <h1 className='text-2xl text-seondary font-semibold mb-3 md:mb-0'>Rs. {(item.price * item.qty).toFixed(2)}</h1>
                            </div>
                            <button className='md:absolute text-2xl md:text-red-600 md:hover:bg-red-600 bg-red-600 hover:bg-red-700 md:bg-transparent md:hover:text-white text-white cursor-pointer w-full md:w-auto md:rounded-full p-2 md:right-[-40px] rounded-bl-3xl rounded-br-3xl flex justify-center' onClick={
                                ()=>{
                                    removeFromCart(item.productId)
                                    setCart(getcart())
                                }
                            }><BiTrash/>
                            </button>
                            <div className='w-full  h-[80px] fixed bottom-0 left-0 flex items-center justify-evenly shadow-2xl'>
                                <h1 className=' text-2xl md:text-3xl font-semibold tracking-wide'>Total :<span className='text-accent pl-3'>{getTotal().toFixed(2)}</span></h1>
                                <Link to="/checkout" state={
                                    {
                                        cart:cart
                                    }
                                }className='bg-accent text-primary py-2 px-3  rounded-[15px] text-xl md:text-2xl  font-bold cursor-pointer hover:bg-seondary'>Checkout</Link>
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