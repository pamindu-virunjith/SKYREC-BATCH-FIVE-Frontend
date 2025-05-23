import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AdminProductsPage from './admin/adminProductsPage'
import AdminHomePage from './admin/adminHomePage'
import AddProductPage from './admin/addProductPage'
import EditProductPage from './admin/editProductPage'


function Admin() {
  return (
    <>
        <div className="flex">
            <div className='w-[300px] bg-amber-200 h-screen'>
                <h1>This is Admin Page</h1>
                <div className='flex flex-col'>
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/products">Products</Link>
                    <Link to="/admin/sales">Sales</Link>
                    <Link to="/admin/analitics">Analitics</Link>
                </div>
                
            </div>
            <div className='w-[calc(100%-300px)] h-screen bg-amber-100'>
                <Routes path="/*">
                    <Route path="/users"element={<AdminHomePage/>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/sales" element={<h1>Sales Page</h1>}/>
                    <Route path="/analitics" element={<h1>Analitics Page</h1>}/>
                    <Route path="/add-product" element={<AddProductPage/>}/>
                    <Route path ="/edit-product" element={<EditProductPage/>}/>
                </Routes>
            </div>
        </div>
    </>
  )
}

export default Admin