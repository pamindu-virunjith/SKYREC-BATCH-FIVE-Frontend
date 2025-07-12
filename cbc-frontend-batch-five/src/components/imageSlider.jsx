import React, { useState } from 'react'

function ImageSlider(props) {
    const images = props.images;
    const [currentInedx, setCurrentIndex] = useState(0)

  return (
    <div className='w-[90%] md:w-[500px] md:h-[500px] my-[30px]'>
        <img className='w-full h-[300px] md:h-[400px] object-cover bg-gray-100 rounded-2xl' alt="image" src={images[currentInedx]}/>
        <div className='w-full h-[100px]  flex justify-center items-center'>
            {
                images?.map((image,index)=>{
                    return(
                        <img key={index} src={image}  className={'w-[90px] h-[90px] rounded-2xl object-cover cursor-pointer mx-3 hover:border-4 hover:border-accent '+ (index == currentInedx && "border-accent border-4")} onClick={()=>{setCurrentIndex(index)}} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ImageSlider