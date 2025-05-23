import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'

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
    <div>This overview page for product {JSON.stringify(product)}</div>
  )
}

export default ProductOverviewPage