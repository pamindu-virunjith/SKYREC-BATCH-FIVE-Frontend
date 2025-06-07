import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import AdminProductsPage from './admin/adminProductsPage'
import AddProductPage from './admin/addProductPage'
import EditProductPage from './admin/editProductPage'
import AdminUsersPage from './admin/adminUsersPage'
import AdminOrdersPage from './admin/adminOrdersPage'


function Admin() {

    const location = useLocation()
    const path = location.pathname

    function getClass(name){
        if(path.includes(name)){
            return "bg-accent text-primary p-4"
        }else{
            return "p-4"
        }
    }


  return (
    <>
        <div className="flex bg-accent">
            <div className='w-[300px]  h-screen text-primary text-xl font-bold bg-seondary'>
                <div className='flex flex-col'>
                    <Link to="/admin/products" className={getClass("products")}>Products</Link>
                    <Link to="/admin/users" className={getClass("users")}>Users</Link>
                    <Link to="/admin/orders" className={getClass("orders")}>Orders</Link>
                    <Link to="/admin/reviews" className={getClass("reviews")}>Reviews</Link>
                </div>
                
            </div>
            <div className='w-[calc(100%-300px)] h-screen bg-primary'>
                <Routes path="/*">
                    <Route path="/users"element={<AdminUsersPage/>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>}/>
                    <Route path="/reviews" element={<h1>Reviews Page</h1>}/>
                    <Route path="/add-product" element={<AddProductPage/>}/>
                    <Route path ="/edit-product" element={<EditProductPage/>}/>
                </Routes>
            </div>
        </div>
    </>
  )
}

export default Admin