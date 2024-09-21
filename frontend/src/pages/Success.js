import React from 'react'
import SUCCESSIMAGE from '../assest/success.png'
import {Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-300 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
        <img src={SUCCESSIMAGE}
        width={150}
        height={150}
        />
        <p className='text-green-600 text-xl font-bold'>Payment Successfully</p>
        <Link
        to={'/order'} 
        className='p-2 mt-4 px-3 border-2 border-green-600 rounded font-semibold uppercase text-green-600 
        hover:bg-green-600 hover:text-white
        '
        >see Order</Link>
    </div>
  )
}

export default Success