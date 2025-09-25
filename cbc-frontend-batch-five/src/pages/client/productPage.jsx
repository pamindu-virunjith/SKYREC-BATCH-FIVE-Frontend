import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'
import Loading from '../../components/loading'

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
    <div className='w-full h-[calc(100vh-80px)] flex flex-wrap justify-center items-center overflow-y-auto'>
       {
        isLoading ?
            <Loading/>:
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