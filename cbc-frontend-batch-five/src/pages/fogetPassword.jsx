import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function FogetPassword() {
    const [otpSent, setOtpSent] = useState(false)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassord, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    function sendOtp(){
        if(email == ""){
            toast.error("Please Enter Your Email")
            return;
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp",{
            email: email
        }).then((response)=>{
            setOtpSent(true)
            toast.success("OTP is successfully sent to your email")
            console.log(response.data)
        }).catch((error)=>{
            toast.error("error")
            console.log(error)
        })
    }

    function verifyOtp(){
        const numOtp = parseInt(otp, 10)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password",{
            email: email,
            otp: numOtp,
            newPassword: newPassword
        }).then((response)=>{
            toast.success("password successfully changed!")
            navigate("/login")
            console.log(response.data)
        }).catch((e)=>{
            console.log(e)
            toast.error("Invalid OTP")
        })
    }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-[url("/login.jpg")] bg-center bg-cover md:text-xl'>
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

       {
         otpSent?
        <div className='w-[350px] h-[400px] md:w-[400px] md:h-[500px] backdrop-blur-md shadow-2xl rounded-xl flex flex-col justify-center items-center p-4'>
            <input type="text" placeholder='Enter your OTP' className='w-[80%] h-[50px] mb-4  border-b-3 border-primary focus:outline-none' value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
            <input type="password" placeholder='Enter New Password' className='w-[80%] h-[50px] mb-4  border-b-3 border-primary focus:outline-none' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
            <input type="password" placeholder='Confirm New Password' className='w-[80%] h-[50px] mb-4  border-b-3 border-primary focus:outline-none' value={confirmPassord} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <button className='w-[50%] h-[50px] bg-accent text-white font-bold rounded-lg mb-4 hover:bg-seondary transition-all duration-300 cursor-pointer' onClick={()=>{verifyOtp()}}>Verify OTP</button>
            <button className='w-[50%] h-[50px] bg-gray-300 text-gray-700 font-bold rounded-lg mb-4 hover:bg-gray-400 transition-all duration-300 cursor-pointer' onClick={()=>{setOtpSent(false)}}>Cancle</button>
        </div>:
        <div className='w-[350px] md:w-[450px] h-[400px] md:h-[500px] backdrop-blur-md shadow-2xl rounded-xl flex flex-col justify-center items-center p-4'>
            <input type="email" placeholder='Enter your email here...' className='w-[90%] h-[50px] px-4 mb-4 rounded-lg border-2 text-xl border-primary focus:outline-none focus:border-2 focus:border-accent' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <button className='w-[110px] h-[50px] bg-accent text-white text-xl font-bold rounded-lg mb-4 hover:bg-seondary transition-all duration-300 focus:outline-none cursor-pointer' onClick={()=>{sendOtp()}}>Send OTP</button>
        </div>
       }
    </div>
  )
}

export default FogetPassword