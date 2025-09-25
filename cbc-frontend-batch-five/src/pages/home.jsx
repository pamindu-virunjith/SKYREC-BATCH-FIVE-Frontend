import Header from '../components/header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './client/productPage.jsx'
import ProductOverviewPage from './client/productOverview.jsx'
import CartPage from './client/cartPage.jsx'
import CheckOutPage from './client/checkOut.jsx'
import SearchProductPage from './client/searchProduct.jsx'
import HomePage from './client/homePage.jsx'
import AboutPage from './client/aboutPage.jsx'
import ContactPage from './client/contactPage.jsx'
import NotFoundPage from './notFoundPage.jsx'

function Home() {
  return (
    <div>
      <Header/>
      <div className='w-full h-[calc(100vh-80px)] flex flex-col  items-center'>
        <Routes parth="/">
          <Route path='/' element={<HomePage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<CheckOutPage/>}/>
          <Route path='/overview/:id' element={<ProductOverviewPage/>}/>
          <Route path='/*' element={<NotFoundPage/>}/>
          <Route path='/search' element={<SearchProductPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home