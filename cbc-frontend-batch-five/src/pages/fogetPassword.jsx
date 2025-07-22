import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

function FogetPassword() {
    const [otpSent, setOtpSent] = useState(false)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassord, setConfirmPassword] = useState("")

    function sendOtp(){
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp",{
            email: email
        }).then((response)=>{
            setOtpSent(true)
            toast.success("OTP is successfully sent to your email")
            console.log(response.data)
        }).catch((error)=>{
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
            toast.success("OTP verified Successfully!")
            console.log(response.data)
        }).catch((e)=>{
            console.log(e)
            toast.error("Invalid OTP")
        })
    }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-[url("/login.jpg")] bg-center bg-cover'>
       {
         otpSent?
        <div className='w-[400px] h-[500px] bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center p-4'>
            <input type="text" placeholder='Enter your OTP' className='w-full h-[50px] px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent' value={otp} onChange={(e)=>{setOtp(e.target.value)}}/>
            <input type="password" placeholder='Enter New Password' className='w-full h-[50px] px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
            <input type="password" placeholder='Confirm New Password' className='w-full h-[50px] px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent' value={confirmPassord} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <button className='w-[50%] h-[50px] bg-accent text-white font-bold rounded-lg mb-4 hover:bg-seondary transition-all duration-300 cursor-pointer' onClick={()=>{verifyOtp()}}>Verify OTP</button>
            <button className='w-[50%] h-[50px] bg-gray-300 text-gray-700 font-bold rounded-lg mb-4 hover:bg-gray-400 transition-all duration-300 cursor-pointer' onClick={()=>{setOtpSent(false)}}>Cancle</button>
        </div>:
        <div className='w-[400px] h-[500px] bg-white shadow-2xl rounded-xl flex flex-col justify-center items-center p-4'>
            <input type="email" placeholder='Enter your email here...' className='w-full h-[50px] px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <button className='w-[50%] h-[50px] bg-accent text-white font-bold rounded-lg mb-4 hover:bg-seondary transition-all duration-300 focus:outline-none cursor-pointer' onClick={()=>{sendOtp()}}>Send OTP</button>
        </div>
       }
    </div>
  )
}

export default FogetPassword