import axios from 'axios'
import React, {useState } from 'react'
import ProductCard from '../../components/productCard'
import Loading from '../../components/loading'
import toast from 'react-hot-toast'

function SearchProductPage() {
    const [product,setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery,setSearchQuery] = useState("")


  return (
    <div className='w-full h-[calc(100vh-80px)] flex flex-col items-center'>
        <input type="text" placeholder='Search For Product' className='w-[70%] p-2 my-9 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent' value={searchQuery} onChange={async (e)=>{
            setSearchQuery(e.target.value);
            setIsLoading(true)
            if(e.target.value.length == 0){
                setProduct([])
                setIsLoading(false)
                return
            }
            try{
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/api/products/search/"+ e.target.value
                )
                setProduct(response.data)
            }catch(err){
                toast.error("Error fetching products")
                console.log(err) 
            }finally{
                setIsLoading(false)
            }
        }}/>
       
       <div className='flex flex-wrap justify-center items-center w-full h-full'>
        {searchQuery.length == 0?(
                <h1 id='no' className='text-2xl text-seondary font-semibold'>Please enter a search query</h1>
            ):(
                <>
                    {
                        isLoading ?
                        (
                            <Loading/> 
                        ):(
                            <>
                                {
                                    product.map((pro)=>{
                                        return(
                                            <ProductCard key={pro.productId} pro={pro}/>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </>
            )
        }
       </div>
    </div>
  )
}

export default SearchProductPage