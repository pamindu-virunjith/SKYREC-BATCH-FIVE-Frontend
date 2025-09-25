import axios from 'axios'
import {useState } from 'react'
import ProductCard from '../../components/productCard'
import Loading from '../../components/loading'
import { BiError } from 'react-icons/bi'
import { LuFileSearch } from 'react-icons/lu'

function SearchProductPage() {
    const [product,setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery,setSearchQuery] = useState("")


  return (
    <div className='w-full h-[calc(100%-80px)] flex flex-col items-center'>
        <input type="text" placeholder='Search For product' className='w-[70%] p-2 my-9 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent' value={searchQuery} onChange={async (e)=>{
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
                // toast.error("Error fetching products")
                console.log(err) 
            }finally{
                setIsLoading(false)
            }
        }}/>
       
       <div className='flex flex-wrap justify-center md:items-center w-full h-full'>
            {searchQuery.length == 0?(
                    <div>
                        <LuFileSearch className='text-5xl md:text-7xl text-seondary mx-auto'/>
                        <h1 id='no' className='text-2xl md:text-3xl text-seondary font-semibold'>Please enter a search query</h1>
                    </div>
                ):(
                    <>
                        {
                            isLoading ?
                            (
                                <Loading/> 
                            ):(
                                <>
                                    {
                                        product.length == 0 ? (
                                            <div>
                                                <BiError className='text-5xl md:text-7xl text-seondary mx-auto'/>
                                                <h1 id='no' className='text-2xl md:text-3xl text-seondary font-semibold'>No products found</h1>
                                            </div>
                                        ):(
                                            product.map((pro)=>{
                                            return(
                                                <ProductCard key={pro.productId} pro={pro}/>
                                            )
                                        })
                                        )
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