import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleRegister() {
    try {
      if (firstName == "" && lastName == "" && email == "" && password == "") {
        toast("Please fill in all fields!", { icon: '⚠️' })
        return
      } else if (firstName == "") {
        toast("Please enter your First Name!", { icon: '⚠️' })
        return
      } else if (lastName == "") {
        toast("Please enter your Last Name!", { icon: '⚠️' })
        return
      } else if (email == "") {
        toast("Please enter your Email!", { icon: '⚠️' })
        return
      } else if (password == "") {
        toast("Please enter your Password!", { icon: '⚠️' })
        return
      }

      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password
      })

      toast.success(response.data.message || "Registered successfully!")
      navigate("/login")
      
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed!")
    //   console.log(e)
    }
  }

  return (
    <div className='w-full h-screen bg-[url("/login.jpg")] bg-center bg-cover flex justify-center items-center'>
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className='w-[500px] h-[700px] backdrop-blur-sm rounded-[30px] shadow-xl flex flex-col justify-center items-center'>
          <input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} type="text" className='border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='First Name' />
          <input onChange={(e) => { setLastName(e.target.value) }} value={lastName} type="text" className='border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='Last Name' />
          <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" className='border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='Email' />
          <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" className='border-1 rounded-[10px] text-[18px] m-[10px] p-[5px] focus:outline-none' placeholder='Password' />
          <button type="submit" onClick={handleRegister} className='rounded-[20px] cursor-pointer p-[10px] w-[100px] bg-green-200 text-[18px] m-[20px] focus:outline-none'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register
