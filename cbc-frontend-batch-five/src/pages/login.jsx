import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'

function Login() {
  const [userName,setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response)=>{
      const accessToken = response.access_token
      axios.post(import.meta.env.VITE_BACKEND_URL +"/api/users/login/google",{
        accessToken : accessToken
      }).then((res)=>{
        toast.success("Login Successful")
        const token  = res.data.token
        localStorage.setItem("token",token)
        if(res.data.role === "admin"){
          navigate("/admin/")
        }else{
          navigate("/")
        }
      })
    }
  })

  async function led(){
    try{
      if(userName =="" && password ==""){
        toast("Please Enter your User name and Password!!",{icon:'💡'})
        return
        
      }else if(userName ==""){
        toast("Please Enter your User Name!!",{icon:'💡'})
        return

      }else if(password ==""){
        toast("please Enter your Password!!",{icon:'💡'})
        return
      }

    
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
      email: userName,
      password: password
      })
      
      toast.success(response.data.message)
      localStorage.setItem("token",response.data.token)
      // console.log(response.data.role)
      // console.log(response.data.message)

      if(response.data.role =="admin"){
        navigate("/admin/")
      }else{
        navigate("/")
      }

    }
    catch(e){
      // console.log(e.response.data.message)
      toast.error(e.response.data.message)
    }
  }

  return (
    <div className='w-full h-screen bg-[url("/login.jpg")] bg-center bg-cover flex justify-center md:justify-end items-center relative'>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0">
        <div className='w-[50%] h-full flex-col justify-center hidden lg:flex ml-[10%]'>
          <h1 className="text-4xl  lg:text-6xl font-bold text-seondary mb-6 leading-tight">
            Discover Your
            <span className="block text-accent">Perfect Product</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-xl lg:text-2xl text-seondary mb-8 leading-relaxed">
            Shop the latest trends with confidence. Quality products, 
            unbeatable prices, and exceptional service delivered to your door.
          </p>
        </div>
      </div>
      {/* Content */}
      <div className='w-[350px] h-[400px] md:w-[500px] md:h-[550px] backdrop-blur-md rounded-[30px] shadow-2xl flex flex-col justify-center items-center md:mr-[50px] z-10 relative'>
        <input onChange={(e)=>{setUserName(e.target.value)}} value={userName} type="text" className='border-b-3 border-white text-xl md:text-2xl m-[10px] p-[5px] focus:outline-none w-[70%]' placeholder='User name or Email' />
        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className=' border-b-3 border-white text-xl md:text-2xl m-[10px] p-[5px] focus:outline-none w-[70%]' placeholder='Password'/>
        <button className='text-white text-right w-[70%] cursor-pointer mb-2 hover:text-gray-700 font-bold focus:outline-none md:text-[17px]' onClick={()=>navigate("/forget")}>Forgot Password?</button>
        <button type="submit" onClick={led} className='rounded-[10px] cursor-pointer p-[10px] w-[120px] border-3 hover:border-white  bg-blue-100 border-blue-100 hover:bg-transparent text-gray-700 text-xl m-7 focus:outline-none font-extrabold hover:text-blue-100 tracking-wider'>Login</button>
        <button className='flex justify-center items-center text-gray-700 rounded-[10px] mt-1 cursor-pointer p-[10px] border-3 hover:border-blue-100 border-transparent hover:text-blue-100' onClick={googleLogin}>
          <FcGoogle className='text-xl md:text-3xl mr-2.5'></FcGoogle>
          <span className='font-bold md:text-xl '>Login with Google</span>
        </button>
        <p className='text-white mt-5 md:text-[17px]'>Don't have an account? <button className='cursor-pointer hover:text-gray-700 focus:outline-none' onClick={()=>navigate("/register")} >Register</button></p>
      </div>
    </div>
  )
}

export default Login