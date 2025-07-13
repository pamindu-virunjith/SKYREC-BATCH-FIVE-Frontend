// import { useState } from 'react'
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import Login from './pages/login'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin'
import { Toaster } from 'react-hot-toast'
import Register from './pages/register'
import TestPage from './pages/TestPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import FogetPassword from './pages/fogetPassword'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId ={import.meta.env.VITE_CLIENT_ID}>
      <BrowserRouter>
        <>
        <Toaster position='top-right'/>

        {/* <Header/> */}
        <Routes path ="/*">
          <Route path="/login" element={<Login/>}/>
          <Route path='/forget' element={<FogetPassword/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path ="/admin/*" element={<Admin/>}/>
          {/* <Route path ="/test" element={<TestPage/>}/> */}
          <Route path="/*" element= {<Home/>}/>
        </Routes>

        </>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App




 {/* <Header/>
          <div className="flex flex-wrap justify-center gap-6 p-6">
              <ProductCard name ="Gaming Laptop" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptate?" price ="$300" img="https://picsum.photos/id/1/200/300" />
              <ProductCard name ="Office Lapptop" description="Lorem ipsum dolor sit amet consectetur adipisicing eli voluptate?" price ="$200" img="https://picsum.photos/id/2/200/300"/>
              <ProductCard name ="Personal Laptop" description="Lorem ipsum dolor sit amet consectett. Ut, voluptate?" price ="$230" img="https://picsum.photos/id/3/200/300"/>
              <ProductCard name ="Gaming Laptop" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut" price ="$275" img="https://picsum.photos/id/9/200/300"/> */}
          {/* </div> */}