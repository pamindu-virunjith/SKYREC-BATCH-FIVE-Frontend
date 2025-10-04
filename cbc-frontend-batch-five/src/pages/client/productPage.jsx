import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";
import { BiError } from "react-icons/bi";

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
    <div className="w-full h-[calc(100vh-80px)]  overflow-y-auto">
      <div className="w-full xl:w-[75%] mx-auto flex flex-wrap justify-center xl:justify-start items-center">
        {isLoading ? (
          <Loading />
        ) : (
          product.length == 0 ? (
            <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center  text-seondary/50">
              <h1 className="text-2xl font-bold">No Products Found</h1>
              <span><BiError className="text-5xl" /></span>
            </div>
          ):
          product.map((pro) => {
            
            return <ProductCard key={pro.productId} pro={pro} />;
          })
        )}
      </div>
    </div>
  )
}

export default ProductPage