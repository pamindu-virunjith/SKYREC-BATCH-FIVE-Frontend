import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

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
                    <Route path="/users"element={<h1>Admin Home page</h1>}/>
                    <Route path="/products" element={<h1>Products Page</h1>}/>
                    <Route path="/sales" element={<h1>Sales Page</h1>}/>
                    <Route path="/analitics" element={<h1>Analitics Page</h1>}/>
                    
                </Routes>
            </div>
        </div>
    </>
  )
}

export default Admin