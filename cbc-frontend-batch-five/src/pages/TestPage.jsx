// import React, { useState } from 'react'

// function TestPage() {

//     const [count,setCount] = useState(0)
//     const [status,setstatus] = useState("Passed")

//     function plus(){
//         setCount(count+1)
//     }
    
//     function minus(){
//         setCount(count -1)
//     }

//   return (
//     <>
//     <div className='w-full h-screen bg-blue-100'>
//         <div className='flex justify-center items-center h-[300px]'> 
//             <button onClick={plus} className='text-red-300 text-[100px] border-4 w-[100px] mx-[20px] '>+</button>
//             <h1 className='text-red-300 text-[100px]    text-center   mx-[20px]'>{count}</h1>
//             <button  onClick={minus} className='text-red-300 text-[100px] border-4 w-[100px] text-center   mx-[20px] cursor-pointer'>-</button>
//         </div>
//         <div className='w-full text-center text-[40px]'>
//             <span>
//                 {status}
//             </span>
//             <div className='flex flex-row justify-center'>
//                 <button className='text-cyan-600 p-[5px] border-3 cursor-pointer bg-white m-[5px] w-[150px]' onClick={()=>{
//                     setstatus("Passed")
//                 }}>Passed</button>
//                 <button className='text-cyan-600 p-[5px] border-3 cursor-pointer bg-white  m-[5px] w-[150px]' onClick={()=>{
//                     setstatus("Failed")
//                 }}>Failed</button>
//             </div>
//         </div>
//     </div>
    
//     </>
//   )
// }

// export default TestPage












import React from 'react'

function TestPage() {
  return (
    <div className='md:bg-accent bg-seondary w-full h-screen'>Hii my name is pamindu</div>
  )
}

export default TestPage