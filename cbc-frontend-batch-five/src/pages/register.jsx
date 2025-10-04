import { useState } from 'react'
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
      <div className="w-[50%] h-full hidden md:block"></div>
      <div className="md:w-[50%] flex justify-center items-center">
        <div className='w-[300px] md:w-[500px] h-[400px] md:h-[550px] backdrop-blur-sm rounded-[30px] shadow-xl flex flex-col justify-center items-center'>
          <input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} type="text" className='border-b-3 border-white text-xl md:text-2xl m-[10px] p-[5px] focus:outline-none w-[250px] md:w-auto' placeholder='First Name' />
          <input onChange={(e) => { setLastName(e.target.value) }} value={lastName} type="text" className='border-b-3 border-white text-xl md:text-2xl m-[10px] p-[5px] focus:outline-none w-[250px] md:w-auto' placeholder='Last Name' />
          <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" className='border-b-3 border-white text-xl md:text-2xl m-[10px] p-[5px] focus:outline-none w-[250px] md:w-auto' placeholder='Email' />
          <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" className='border-b-3 border-white text-xl md:text-2xl m-[10px] p-[5px] focus:outline-none w-[250px] md:w-auto' placeholder='Password' />
          <button type="submit" onClick={handleRegister} className='rounded-[10px] cursor-pointer p-[10px] w-[120px] border-3 hover:border-white  bg-blue-100 border-blue-100 hover:bg-transparent text-gray-700 text-xl m-7 focus:outline-none font-extrabold  tracking-wider'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register
