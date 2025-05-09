// import React, { useState } from 'react'
// import MediaUplad from '../utils/mediaUplad'

// function STesting() {
//     const [image, setImage] = useState(null)

//     function fileUpload(){
//         // console.log("button clicked")
//        MediaUplad(image).then((res)=>{
//             console.log(res)

//        }).catch((res)=>{
//         console.log(res)
        
//        })
//     }
//   return (
//     <div>
//         <h1 className='text-center text-3xl '>Supabase Testing Page</h1>
//         <div className='w-full h-screen flex justify-center items-center'>
//             <input type="file" name="" id="" className='p-[10px] border-2 rounded-[10px] mx-[10px]' onChange={(e)=>{
//                 // console.log(e.target.files)
//                 setImage(e.target.files[0])
//             }}/>
//             <button  onClick={fileUpload} className='bg-green-500 p-[10px] text-white rounded-[10px] cursor-pointer' >upload</button>
//         </div>
//     </div>
//   )
// }

// export default STesting