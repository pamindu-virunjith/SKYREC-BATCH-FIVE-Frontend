import React, { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BiTrash } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function CheckOutPage() {
    const location = useLocation()
    // console.log(location.state.cart)

    const [cart,setCart] = useState(location.state?.cart || []);

    function removeFromCart(index){
        const newCart = cart.filter((item, i)=> i !== index )
        setCart(newCart)
    }

    function getTotal(){
        let total = 0;
        cart.forEach((item)=>{
            total += item.price * item.qty
        })
        return total;
    }

    function changeQty(index,qty){
        const newQty = cart[index].qty + qty;
        if(newQty <=0){
            removeFromCart(index)
            return
        }else{
            const newCart = [...cart];
            newCart[index].qty = newQty
            setCart(newCart)
        }
    }

    async function placeOrder(){
        const token = localStorage.getItem("token")
        if(!token){
            toast.error("Please login first to place order")
            return
        }

        const orderInformation = {
            products: [],
            phone: "0701338312",
            address: "12,Main Street, Colombo",
        }

        for(let i= 0; cart.length>i; i++ ){
             const item ={
                productId: cart[i].productId,
                quantity: cart[i].qty
            }
            orderInformation.products[i] = item
        }

        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders",orderInformation,{
            headers:{
                Authorization: "Bearer " + token
            }})
            toast.success("Order palced successfully")
            console.log(res.data)
        }catch(err){
            console.log(err)
            toast.error("Error placing order")
            return
        }
    }

  return (
    <div className='w-full h-[calc(100%-80px)] flex flex-col items-center pt-4  overflow-y-auto'>
        {
            cart.map(
                (item,index)=>{
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
                                    changeQty(index, 1)
                                }}><FaPlus/></button>
                                <h1 className='text-xl text-seondary font-semibold'>{item.qty}</h1>
                                <button   className='text-white font-bold hover:bg-seondary cursor-pointer bg-accent aspect-square p-1 rounded-[3px]' onClick={()=>{
                                    changeQty(index,-1)
                                }}><FaMinus/></button>
                            </div>
                            <div className='w-[200px] h-full flex flex-col justify-center items-end pr-4'>
                                <h1 className='text-2xl text-seondary font-semibold'>Rs. {(item.price * item.qty).toFixed(2)}</h1>
                            </div>
                            <button className='absolute text-2xl text-red-600 hover:bg-red-600 hover:text-white cursor-pointer rounded-full p-2 right-[-40px]' onClick={
                                ()=>{
                                    removeFromCart(index)
                                }
                            }><BiTrash/></button>
                            <div className='w-full  h-[80px] fixed bottom-0 left-0 flex items-center justify-center shadow-2xl'>
                                <h1 className='text-2xl font-semibold tracking-wide'>Total :<span className='text-accent pl-3'>{getTotal().toFixed(2)}</span></h1>
                                <button className='bg-accent text-primary py-2 px-3  rounded-[15px] text-xl ml-9 font-bold cursor-pointer hover:bg-seondary' onClick={
                                    ()=>{
                                        placeOrder()
                                    }
                                }>Place Order</button>
                            </div>
                        </div>
                    )
                }
            )
        }
        
    </div>

  )
}

export default CheckOutPage