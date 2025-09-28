import { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa6";
// import { BiTrash } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function CheckOutPage() {
    const location = useLocation()
    // console.log(location.state.cart)

    const [cart,setCart] = useState(location.state?.cart || []);
    const [phoneNumber,setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")


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
            phone: phoneNumber,
            address: address,
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
        }catch(e){
            if(phoneNumber == "" || address == ""){
                toast.error("Insert Phone Number and address to Place order")
                return
            } 
            console.log(e)//response.data.error.message
            toast.error("Error placing order")
            return
        }
    }

  return (
    <div className='w-full h-[calc(100%-180px)] md:h-[calc(100%-150px)] flex flex-col items-center pt-6 pb-24 overflow-y-auto'>
        {
            cart.map(
                (item,index)=>{
                    return(
                        <div key={item.productId} className='w-[100%] md:w-[800px] md:rounded-2xl shadow-xl bg-white flex flex-row md:items-center gap-4 p-2 mb-6 relative'>
                            <img src={item.image} alt="photo" className='w-[120px] h-[120px] rounded-lg md:rounded-xl object-cover' />
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
                            <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
                                <div className='flex flex-row justify-center items-center gap-3'>
                                    <button  className='bg-accent hover:bg-seondary text-white p-1 m:p-2 rounded-md transition cursor-pointer' onClick={()=>{
                                        changeQty(index, 1)
                                    }}><FaPlus/></button>
                                    <h1 className='md:text-xl text-seondary font-semibold'>{item.qty}</h1>
                                    <button   className='bg-accent hover:bg-seondary text-white p-1 m:p-2 rounded-md transition cursor-pointer' onClick={()=>{
                                        changeQty(index,-1)
                                    }}><FaMinus/></button>
                                </div>
                                <div className="flex flex-col justify-center items-center md:items-end md:min-w-[200px]">
                                    <h1 className="text-lg md:text-2xl text-seondary font-bold md:font-semibold md:mr-4">Rs. {(item.price * item.qty).toFixed(2)}</h1>
                                </div> 
                            </div>
                            <div className='w-full h-[180px] md:h-[150px] fixed bottom-0 left-0 flex flex-col md:flex-row items-center justify-evenly shadow-2xl'>
                                <div className='flex flex-col  w-[80%] md:w-[300px]'>
                                    <input type="text" placeholder='Phone Number' className='border p-2 mb-3 rounded-[5px]  border-gray-300 focus:outline-none placeholder-gray-400' onChange={(e)=>{setPhoneNumber(e.target.value)}} value={phoneNumber}/>
                                    <input type="text" placeholder='Address' className='border p-2 rounded-[5px] border-gray-300 focus:outline-none placeholder-gray-400' onChange={(e)=>{setAddress(e.target.value)}} value={address}/>
                                </div>
                                <div className='flex flex-row md:flex-col items-center justify-evenly w-full md:w-auto'>
                                    <h1 className='text-2xl md:text-3xl font-semibold tracking-wide'>Total :<span className='text-accent pl-3'>{getTotal().toFixed(2)}</span></h1>
                                    <button className='bg-accent text-primary py-2 px-3 md:mt-5 rounded-[15px] text-lg md:text-xl  font-bold cursor-pointer hover:bg-seondary' onClick={
                                        ()=>{
                                            placeOrder()
                                        }
                                    }>Place Order</button>
                                </div>
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