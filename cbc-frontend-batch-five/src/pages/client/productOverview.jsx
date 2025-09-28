import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import ImageSlider from '../../components/imageSlider.jsx';
import Loading from '../../components/loading.jsx';
import { addToCart, getcart} from '../../utils/cart.js';
import Review from '../../components/review.jsx';

function ProductOverviewPage() {
    const params = useParams();
    const productId = params.id;
    const [state,setState] = useState("loading")//loading, success,
    const [product,setProduct] = useState(null)
    const navigate = useNavigate();

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId).then(
            (response)=>{
                // console.log(response.data)
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
    , []);
  return (
    <>
        {
            state == "success" &&(
            <div className='w-full h-[calc(100vh-80px)]  overflow-y-auto'>
                <div className='w-full flex flex-col lg:flex-row'>
                    <h1 className='lg:hidden w-full text-center font-semibold text-2xl md:text-4xl text-seondary mt-6'>{product.name}
                                {
                                    product.altName.map((name,index)=>{
                                        return(
                                            <span key={index} className='text-gray-500' > {" | "+name}</span>
                                        )
                                    })
                                }
                            </h1>
                    <div className='w-full lg:w-[50%] flex justify-center items-center'>
                        <ImageSlider images ={product.images}/>
                    </div>
                    <div className='w-full lg:w-[50%] flex justify-center items-center p-2'>
                    <div className='w-[100%] md:w-[500px] lg:h-[600px] flex flex-col items-center justify-center'>
                            <h1 className='hidden lg:block w-full text-center font-semibold text-xl md:text-4xl text-seondary'>{product.name}
                                {
                                    product.altName.map((name,index)=>{
                                        return(
                                            <span key={index} className='text-gray-400' > {" | "+name}</span>
                                        )
                                    })
                                }
                            </h1>
                            <h1 className='text-gray-500 my-2 font-semibold text-md'>{product.productId}</h1>
                            <p className='text-gray-500 my-2  text-md text-center'>{product.description}</p>
                            {
                                product.labledPrice > product.price ? 
                                <div>
                                    <span className='text-2xl md:text-4xl mx-4 text-gray-300 line-through'>{product.labledPrice.toFixed(2)}</span>
                                    <span className='text-2xl md:text-4xl mx-4 text-accent '>{product.price.toFixed(2)}</span>
                                </div>
                                : <span className='text-2xl md:text-4xl mx-4 text-accent '>{product.price.toFixed(2)}</span>
                            }
                            <div className='w-full flex justify-center items-center my-5'>
                                <button className='w-[130px] md:w-[200px] h-[50px] m-4  cursor-pointer text-white bg-accent transition-all duration-300 md:text-[20px] font-semibold  rounded-2xl hover:bg-accent/80 ' onClick={()=>{
                                        // localStorage.removeItem("cart")
                                        console.log("Old CArt")
                                        console.log(getcart())
                                        addToCart(product,1)
                                        console.log("New Cart")
                                        console.log(getcart())
                                        toast.success("Product added to cart")
                                    }}>Add to Cart</button>
                                <button className='w-[130px] md:w-[200px] h-[50px] m-4 cursor-pointer text-white bg-accent transition-all duration-300 md:text-[20px] font-semibold rounded-2xl hover:bg-accent/80 '  onClick={()=>{
                                        navigate("/checkout",{
                                        state:{
                                            cart:[
                                            {
                                                productId: product.productId,
                                                name: product.name,
                                                image: product.images[0],
                                                price: product.price,
                                                labledPrice: product.labledPrice,
                                                qty: 1
                                            }
                                            ]
                                        }
                                        })
                                    }}>Buy Now</button>
                            </div>
                    </div>

                    </div>       
                </div>
                <Review productId={productId}/>
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