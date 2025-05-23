import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import ImageSlider from '../../components/imageSlider.jsx';
import Loading from '../../components/loading.jsx';
import { addToCart, getcart, removeFromCart } from '../../utils/cart.jsx';

function ProductOverviewPage() {
    const params = useParams();
    const productId = params.id;

    const [state,setState] = useState("loading")//loading, success,
    const [product,setProduct] = useState(null)

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId).then(
            (response)=>{
                console.log(response.data)
                setProduct(response.data)
                setState("success")
            }
        ).catch(
            (err)=>{
                console.log(err)
                setState("error")
                toast.error("Error fetching product details")
            }
        )
        }
    ,[])
  return (
    <>
        {
            state == "success" &&(
            <div className='w-full h-full flex'>
                <div className='h-full w-[50%] flex justify-center items-center'>
                    <ImageSlider images ={product.images}/>
                </div>
                <div className='h-full w-[50%] flex justify-center items-center '>
                   <div className='w-[500px] h-[600px] flex flex-col items-center'>
                         <h1 className='w-full text-center font-semiboldbold text-4xl text-seondary'>{product.name}
                            {
                                product.altName.map((name,index)=>{
                                    return(
                                        <span key={index} className='text-gray-500' > {" | "+name}</span>
                                    )
                                })
                            }
                         </h1>
                         <h1 className='text-gray-500 my-2 font-semibold text-md'>{product.productId}</h1>
                         <p className='text-gray-500 my-2 font-semibold text-md'>{product.description}</p>
                         {
                            product.labledPrice > product.price ? 
                            <div>
                                <span className='text-4xl mx-4 text-gray-300 line-through'>{product.labledPrice.toFixed(2)}</span>
                                <span className='text-4xl mx-4 text-accent '>{product.price.toFixed(2)}</span>
                            </div>
                            : <span className='text-4xl mx-4 text-accent '>{product.price.toFixed(2)}</span>
                         }
                         <div className='w-full flex justify-center items-center my-5'>
                            <button className='w-[200px] h-[50px] m-4  cursor-pointer text-white bg-accent transition-all duration-300 text-[20px] font-semibold  rounded-2xl hover:bg-accent/80 ' onClick={()=>{
                                    // localStorage.removeItem("cart")
                                    console.log("Old CArt")
                                    console.log(getcart())
                                    addToCart(product,1)
                                    console.log("New Cart")
                                    console.log(getcart())
                                }}>Add to Cart</button>
                            <button className='w-[200px] h-[50px] m-4 cursor-pointer text-white bg-accent transition-all duration-300 text-[20px] font-semibold rounded-2xl hover:bg-accent/80 '>Buy Now</button>
                         </div>
                   </div>

                </div>       
            </div>
            )
        }
        {
            state == "loading" && <Loading/>
        }
    </>
  )
}

export default ProductOverviewPage