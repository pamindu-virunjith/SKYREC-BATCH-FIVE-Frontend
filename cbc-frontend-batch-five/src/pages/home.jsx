import React from 'react'
import Header from '../components/header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './client/productPage.jsx'
import ProductOverviewPage from './client/productOverview.jsx'
import CartPage from './client/cartPage.jsx'
import CheckOutPage from './client/checkout.jsx'

function Home() {
  return (
    <div>
      <Header/>
      <div className='w-full h-[calc(100vh-80px)] flex flex-col  items-center'>
        <Routes parth="/">
          <Route path='/' element={<h1>Home</h1>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/about' element={<h1>About</h1>}/>
          <Route path='/contact' element={<h1>Contact</h1>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<CheckOutPage/>}/>
          <Route path='/overview/:id' element={<ProductOverviewPage/>}/>
          <Route path='/*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home