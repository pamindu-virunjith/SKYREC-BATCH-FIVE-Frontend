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

  console.log(location)

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
    <div className='w-full h-full flex flex-col justify-center items-center bg-amber-250'>
        <h1>Edit Products</h1>
        <input type="text" placeholder='Product Id' disabled className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' value={productId} onChange={(e)=>{setProductId(e.target.value)}}/>
        <input type="text" placeholder='Product Name'  className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
        <input type="text" placeholder='Alternative Names (ex:pro1,pro2)' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' value={altName} onChange={(e)=>{setAltName(e.target.value)}}/>
        <input type="text" placeholder='Description' className='border rounded-[5px] p-[5px] m-[5px] h-[50px] w-[250px]' value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type="file" multiple className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' onChange={(e)=>{setImage(e.target.files)}}/>
        <input type="number" placeholder='Labled Price' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' value={labledPrice} onChange={(e)=>{setLabledPrice(e.target.value)}}/>
        <input type="number" placeholder='Price' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        <input type="number" placeholder='Stock' className='border rounded-[5px] p-[5px] m-[5px] w-[250px]' value={stock} onChange={(e)=>{setStock(e.target.value)}}/>
        <div>
          <button className='border p-[7px] m-[10px] rounded-[5px] bg-red-600 font-bold text-white cursor-pointer' onClick={back}>Cancel</button>
          <button className='border p-[7px] m-[10px] rounded-[5px] bg-green-600 font-bold text-white cursor-pointer' onClick={update}>Update Product</button>
        </div>
    </div>
  )
}

export default EditProductPage