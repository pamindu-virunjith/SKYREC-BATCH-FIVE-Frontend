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
    <div className='w-full h-full flex flex-wrap justify-center items-center'>
       {
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