import React from 'react'
import CANCELIMAGE from '../assest/cancel.png'
import {Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className='bg-slate-300 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
            <img src={CANCELIMAGE}
            width={150}
            height={150}

            />
            <p className='text-red-600 text-xl font-bold'>Payment Cancel</p>
            <Link
            to={'/cart'} 
            className='p-2 mt-4 px-3 border-2 border-red-600 rounded font-semibold uppercase text-red-600 
            hover:bg-red-600 hover:text-white
            '
            >Go To Cart</Link>
        </div>
      )
}

export default Cancel