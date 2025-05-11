import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import toast from 'react-hot-toast'

function AdminProductsPage() {
    const [products, setProducts] =useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(isLoading == true){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products", {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }).then((res)=>{
            console.log(res.data)
            setProducts(res.data)
            setIsLoading(false)
        })
        }
    },[isLoading])
    const navigate = useNavigate()


    function deletProduct(productId){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("PLease Login before update products")
            return
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/" + productId,{
            headers:{
                "Authorization" : "Bearer " + token
            }
        }).then(()=>{
            setIsLoading(true)
            toast.success("Product Deleted Successfully")
        }).catch((e)=>{
            toast.error(e.response.data.message)
        })
    }

  return (
    <div className='w-full h-full bg-blue-50 max-h-full overflow-y-scroll relative'>
        <Link to="/admin/add-product" className='fixed bottom-6 right-10 bg-green-500 py-2 px-4 text-white rounded-[10px] cursor-pointer text-3xl font-bold text-center flex justify-center items-center'>+</Link>
        {

            isLoading ?
            <div className='flex justify-center items-center  w-full h-full'>
                <div className='h-[100px] w-[100px]  border-8 rounded-full border-t-gray-400 border-gray-300 animate-spin'></div>
            </div> :
            <table  className='w-full text-center'>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Image</th>
                        <th>Labled Price</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Options</th>
                    </tr>
                </thead>
            <tbody>
                {
                    products.map((items,index)=>{
                        return(
                            <tr key={index}>
                                <td >{items.productId}</td>
                                <td>{items.name}</td>
                                <td><img src={items.images[0]} className='w-[50px] h-[50px]' /></td>
                                <td>{items.labledPrice}</td>
                                <td>{items.stock}</td>
                                <td>{items.price}</td>
                                <td>
                                    <div className='flex items-center justify-evenly'>
                                        <FaTrash className='text-[20px] text-red-600 cursor-pointer' onClick={()=>{
                                            deletProduct(items.productId)
                                        }}/>
                                        <FaEdit className='text-[20px] text-green-700 cursor-pointer' onClick={()=>{
                                            navigate('/admin/edit-product',{
                                                state : items 
                                            })
                                        }}/>
                                    </div>
                                </td>
                            </tr>
                        )
                        // console.log(items.productId)
                    })
                }
            </tbody>
           
            </table>
        }
    </div>
  )
}

export default AdminProductsPage