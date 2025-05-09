import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AdminProductsPage() {
    const [products, setProducts] =useState([])
    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products", {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }).then((res)=>{
            console.log(res.data)
            setProducts(res.data)
        })
    },[])

  return (
    <div className='w-full h-full bg-blue-50 max-h-full overflow-y-scroll relative'>
        <Link to="/admin/add-product" className='fixed bottom-6 right-10 bg-green-500 py-2 px-4 text-white rounded-[10px] cursor-pointer text-3xl font-bold text-center flex justify-center items-center'>+</Link>
        <table  className='w-full text-center'>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Labled Price</th>
                    <th>Stock</th>
                    <th>Price</th>
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
                            </tr>
                        )
                        // console.log(items.productId)
                    })
                }
            </tbody>
           
        </table>
    </div>
  )
}

export default AdminProductsPage