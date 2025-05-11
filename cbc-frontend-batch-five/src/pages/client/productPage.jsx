import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'

function ProductPage() {
    const [product,setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                    setProduct(res.data)
                    setIsLoading(false)
                }
            )
        }
    },[isLoading])

  return (
    <div className='w-full h-[calc(100vh-80px)] flex flex-wrap justify-center items-center'>
       {

        
            isLoading ?
            <div className='flex justify-center items-center  w-full h-full'>
                <div className='h-[100px] w-[100px]  border-8 rounded-full border-t-gray-400 border-gray-300 animate-spin'></div>
            </div> :

        product.map((pro)=>{
            return(
                <ProductCard key={pro.productId} pro={pro}/>
            )
        })
       }
    </div>
  )
}

export default ProductPage