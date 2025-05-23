import React from 'react'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='animate-spin rounded-full border-4  border-t-accent border-seondary  h-16 w-16'></div>
    </div>
  )
}

export default Loading