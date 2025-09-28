import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import MediaUplad from '../../utils/mediaUplad'

function EditProductPage() {

    const location = useLocation()

  const [productId,setProductId] = useState(location.state.productId)
  const [productName,setProductName] = useState(location.state.name)
  const [altName,setAltName] = useState(location.state.altName.join(","))
  const [description,setDescription] = useState(location.state.description)
  const [image,setImage] = useState([])
  const [labledPrice,setLabledPrice] = useState(location.state.labledPrice)
  const [price,setPrice] = useState(location.state.price)
  const [stock,setStock] = useState(location.state.stock)

  const navigate = useNavigate()

  // console.log(location)

  function back(){
    navigate('/admin/products')
  }

  async function update(){
    const token = localStorage.getItem("token")
    if(token == null){
      toast.error("Plaese login first!!")
      return
    }


    let imageUrls = location.state.image
    const promisesArray = []

    for(let i = 0; i < image.length; i++){
      promisesArray[i] = MediaUplad(image[i])
    }

    try{

        if(image.length > 0){
            imageUrls = await Promise.all(promisesArray)
        }
      
      // console.log(imageUrls)

      const altNameArray = altName.split(",")

      const product = {
        productId:productId,
        name:productName,
        altName:altNameArray,
        description: description,
        images:imageUrls,
        labledPrice:labledPrice,
        price: price,
        stock: stock
      }

      axios.put(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId, product,{
        headers:{
          "Authorization" : "Bearer "+ token
        }
      }).then(()=>{
        toast.success("Product Updated Successfully")
        navigate("/admin/products")

      }).catch((e)=>{
        toast.error(e.response.data.message)
      })

    }catch(e){
      console.log(e)
    }
    
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-[350px] h-[500px] flex flex-col bg-primary justify-center items-center rounded-xl'>
        <h1 className='font-bold mb-5 text-3xl font-mono text-seondary'>Edit Products</h1>
        <input type="text" placeholder='Product Id' disabled className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' value={productId} onChange={(e)=>{setProductId(e.target.value)}}/>
        <input type="text" placeholder='Product Name'  className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
        <input type="text" placeholder='Alternative Names (ex:pro1,pro2)' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' value={altName} onChange={(e)=>{setAltName(e.target.value)}}/>
        <input type="text" placeholder='Description' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] h-[50px] w-[300px] focus:outline-accent' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type="file" multiple className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' onChange={(e)=>{setImage(e.target.files)}}/>
        <input type="number" placeholder='Labled Price' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' value={labledPrice} onChange={(e)=>{setLabledPrice(e.target.value)}}/>
        <input type="number" placeholder='Price' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        <input type="number" placeholder='Stock' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' value={stock} onChange={(e)=>{setStock(e.target.value)}}/>
        <div className='w-full flex justify-center items-center'>
          <button className='w-[50%] p-3 mr-3 bg-gray-300 text-gray-700 font-bold mt-2 rounded-lg hover:bg-gray-400 transition-all duration-300 cursor-pointer focus:outline-none' onClick={back}>Cancel</button>
          <button className='w-[50%] p-3 bg-accent text-white font-bold rounded-lg mt-2 hover:bg-[#7054f7] transition-all duration-300 cursor-pointer focus:outline-none' onClick={update}>Update Product</button>
        </div>
      </div>
    </div>
  )
}

export default EditProductPage