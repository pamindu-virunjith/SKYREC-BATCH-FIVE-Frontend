import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [userName,setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

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
          <button type="submit" onClick={led} className='rounded-[20px] cursor-pointer p-[10px] w-[80px] bg-blue-100 text-[18px] m-[20px] focus:outline-none'>Login</button>
          
        </div>
      </div>
    </div>
  )
}

export default Login