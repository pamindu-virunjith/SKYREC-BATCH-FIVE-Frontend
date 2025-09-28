import axios from 'axios'
import { useState } from 'react'
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
  const [isSend,setIsSend] = useState(false)

  const navigate = useNavigate()

  function back(){
    navigate('/admin/products')
  }

  async function submit(){
    const token = localStorage.getItem("token")
    if(token == null){
      toast.error("Please login first!!")
      return
    }

    if(image.length <= 0){
      toast.error("Please select at least one Image")
      return
    }
    setIsSend(true)
    //upload images to cloudinary
    //get the image urls
    //send the product data to the backend with image urls
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
        setIsSend(false)

      }).catch((e)=>{
        toast.error(e.response.data.message + " Please try again")
        setIsSend(false)
      })

    }catch(e){
      console.log(e)
      toast.error("Error adding product, Please try again")
      setIsSend(false)
    }
    
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className='w-[350px] h-[500px] flex flex-col bg-primary justify-center items-center rounded-xl'>
        <input type="text" placeholder='Product Id' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' onChange={(e)=>{setProductId(e.target.value)}}/>
        <input type="text" placeholder='Product Name'  className='border border-gray-400 rounded-[3px] p-[5px] m-[3px] w-[300px] focus:outline-accent' onChange={(e)=>{setProductName(e.target.value)}}/>
        <input type="text" placeholder='Alternative Names (ex:pro1,pro2)' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' onChange={(e)=>{setAltName(e.target.value)}}/>
        <input type="text" placeholder='Description' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] h-[50px] w-[300px] focus:outline-accent' onChange={(e)=>{setDescription(e.target.value)}}/>
        <input type="file" multiple className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' onChange={(e)=>{setImage(e.target.files)}}/>
        <input type="number" placeholder='Labled Price' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' onChange={(e)=>{setLabledPrice(e.target.value)}}/>
        <input type="number" placeholder='Price' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' onChange={(e)=>{setPrice(e.target.value)}}/>
        <input type="number" placeholder='Stock' className='border border-gray-400 rounded-[3px] p-[5px] m-[5px] w-[300px] focus:outline-accent' onChange={(e)=>{setStock(e.target.value)}}/>
        <div className='w-[80%] flex justify-center items-center'>
          <button className='w-[50%] p-3 mr-3 bg-gray-300 text-gray-700 font-bold mt-2 rounded-lg hover:bg-gray-400 transition-all duration-300 cursor-pointer focus:outline-none' onClick={back}>Cancel</button>
          <button className={`w-[50%] p-3 bg-accent text-white font-bold rounded-lg mt-2 transition-all duration-300 cursor-pointer focus:outline-none ${isSend ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7054f7]"}`} disabled={isSend} onClick={submit}>{isSend ? "Submitting..." : "Submit"}</button>
        </div>
      </div>
    </div>
  )
}

export default AddProductPage