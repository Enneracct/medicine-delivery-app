import React from 'react'

function EmptyCartPage() {
  return (
    <div className='flex flex-col justify-center items-center w-full h-[524px] text-zinc-800'>
      <img className='max-h-[270px]' src="https://cdn-icons-png.flaticon.com/512/14097/14097890.png " alt="" />
      <h2 className='text-5xl mt-4 font-500 tracking-wider'>Nothing in here</h2>
      <p className='mt-3'>Add items to get started</p>
    </div>
  )
}

export default EmptyCartPage