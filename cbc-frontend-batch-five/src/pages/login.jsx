import React, { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function Login() {
  const [userName,setUserName] = useState("")
  const [password, setPassword] = useState("")

  async function led(){
    try{
      const response = await axios.post("http://localhost:3000/api/users/login",{
        email: userName,
        password: password
      })
      // console.log(response.data.message)
      toast.success(response.data.message)
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
          <Toaster position='top-right'/>
          <input onChange={(e)=>{setUserName(e.target.value)}} value={userName} type="text" className='border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='User name or Email'/>
          <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password" className=' border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='Password' />
          <button onClick={led} className='rounded-[20px] cursor-pointer p-[10px] w-[80px] bg-blue-100 text-[18px] m-[20px] focus:outline-none'>Login</button>
          
        </div>
      </div>
    </div>
  )
}

export default Login