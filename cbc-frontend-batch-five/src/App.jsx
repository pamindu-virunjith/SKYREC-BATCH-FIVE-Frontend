import { useState } from 'react'
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import Login from './pages/login'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin'
import TestPage from './pages/TestPage'
import { Toaster } from 'react-hot-toast'
import Register from './pages/register'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
      <Toaster position='top-right'/>

      {/* <Header/> */}
      <Routes path ="/*">
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path ="/admin/*" element={<Admin/>}/>
        <Route path ="/test" element={<TestPage/>}/>
        <Route path="/*" element= {<h1 className='flex justify-center items-center text-red-600 text-[70px] w-full pt-20'> 404 Not Found</h1>}/>
      </Routes>













        {/* <Header/>
        <div className="flex flex-wrap justify-center gap-6 p-6">
            <ProductCard name ="Gaming Laptop" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptate?" price ="$300" img="https://picsum.photos/id/1/200/300" />
            <ProductCard name ="Office Lapptop" description="Lorem ipsum dolor sit amet consectetur adipisicing eli voluptate?" price ="$200" img="https://picsum.photos/id/2/200/300"/>
            <ProductCard name ="Personal Laptop" description="Lorem ipsum dolor sit amet consectett. Ut, voluptate?" price ="$230" img="https://picsum.photos/id/3/200/300"/>
            <ProductCard name ="Gaming Laptop" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut" price ="$275" img="https://picsum.photos/id/9/200/300"/> */}
        {/* </div> */}
      </>
    </BrowserRouter>
  )
}

export default App
