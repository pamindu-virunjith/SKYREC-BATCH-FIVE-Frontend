import { useState } from 'react'
import './App.css'
import Header from './assets/componenets/header'
import ProductCard from './assets/componenets/productCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <div className="flex flex-wrap justify-center gap-6 p-6">
        <ProductCard name ="Gaming Laptop" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, voluptate?" price ="$300" img="https://picsum.photos/id/1/200/300" />
        <ProductCard name ="Office Lapptop" description="Lorem ipsum dolor sit amet consectetur adipisicing eli voluptate?" price ="$200" img="https://picsum.photos/id/2/200/300"/>
        <ProductCard name ="Personal Laptop" description="Lorem ipsum dolor sit amet consectett. Ut, voluptate?" price ="$230" img="https://picsum.photos/id/3/200/300"/>
        <ProductCard name ="Gaming Laptop" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut" price ="$275" img="https://picsum.photos/id/9/200/300"/>
     </div>
    </>
  )
}

export default App
