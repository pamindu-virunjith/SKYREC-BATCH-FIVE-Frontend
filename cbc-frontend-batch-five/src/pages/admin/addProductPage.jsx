import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MediaUplad from '../../utils/mediaUplad'

function AddProductPage() {

  const [productId,setProductId] = useState('')
  const [productName,setProductName] = useState('')
  const [altName,setAltName] = useState('')
  const [description,setDescription] = useState('')
  const [image,setImage] = useState([])
  const [labledPrice,setLabledPrice] = useState(0)
  const [price,setPrice] = useState(0)
  const [stock,setStock] = useState(0)

  const navigate = useNavigate()

  function back(){
    navigate('/admin/products')
  }

  async function submit(){
    const token = localStorage.getItem("token")
    if(token == null){
      toast.error("Plaese login first!!")
      return
    }

    if(image.length <= 0){
      toast.error("Please select at least one Image")
      return
    }

    const promisesArray = []

    for(let i = 0; i < image.length; i++){
      promisesArray[i] = MediaUplad(image[i])
    }

    
    

    try{

      const imageUrls = await Promise.all(promisesArray)
      console.log(imageUrls)

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

      axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products", product,{
        headers:{
          "Authorization" : "Bearer "+ token
        }
      }).then(()=>{
        toast.success("Product added Successfully")
        navigate("/admin/products")

      }).catch((e)=>{
        toast.error(e.response.data.message + "WTF")
      })

    }catch(e){
      console.log(e)
    }
    
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-amber-250'>
        <input type="text" placeholder='Product Id' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setProductId(e.target.value)}}/>
        <input type="text" placeholder='Product Name'  className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setProductName(e.target.value)}}/>
        <input type="text" placeholder='Alternative Names (ex:pro1,pro2)' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setAltName(e.target.value)}}/>
        <input type="text" placeholder='Description' className='border rounded-[5px] p-[5px] m-[5px] h-[50px] w-[250px]' onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type="file" multiple className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setImage(e.target.files)}}/>
        <input type="number" placeholder='Labled Price' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setLabledPrice(e.target.value)}}/>
        <input type="number" placeholder='Price' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setPrice(e.target.value)}}/>
        <input type="number" placeholder='Stock' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setStock(e.target.value)}}/>
        <div>
          <button className='border p-[7px] m-[10px] rounded-[5px] bg-red-600 font-bold text-white cursor-pointer' onClick={back}>Cancel</button>
          <button className='border p-[7px] m-[10px] rounded-[5px] bg-green-600 font-bold text-white cursor-pointer' onClick={submit}>Submit</button>
        </div>
    </div>
  )
}

export default AddProductPage