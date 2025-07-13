import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { GrGoogle } from 'react-icons/gr'
import { useGoogleLogin } from '@react-oauth/google'

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
    <div className=' w-full h-screen bg-[url("/login.jpg")] bg-center bg-cover flex justify-center items-center'>
      <div className=" w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className='w-[500px] h-[600px] backdrop-blur-sm rounded-[30px] shadow-xl flex flex-col justify-center items-center'>
          <input onChange={(e)=>{setUserName(e.target.value)}} value={userName} type="text" className='border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='User name or Email'/>
          <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className=' border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='Password' />
          <button type="submit" onClick={led} className='rounded-[20px] cursor-pointer p-[10px] w-[80px] bg-blue-100 text-[18px] m-[20px] focus:outline-none font-bold'>Login</button>
          <button className='flex justify-center items-center text-gray-700 rounded-[20px] cursor-pointer bg-blue-100 p-[10px]' onClick={googleLogin}>
            <GrGoogle className='text-xl mr-2.5'></GrGoogle>
            <span className='font-bold'>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login