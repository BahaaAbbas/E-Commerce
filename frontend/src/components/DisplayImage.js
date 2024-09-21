import React from 'react'
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const DisplayImage = ({
    imgURL,
    onClose
}) => {
  return (
    <div className=' fixed bottom-0 right-0 left-0 top-10 flex justify-center items-center  '>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4 '>
                <div 
                onClick={onClose}
                className=' relative w-fit  hover:bg-red-200 hover:rounded-full hover:scale-150 hover:transition-all ml-auto text-2xl hover:text-red-600 cursor-pointer '>
                    <IoClose className='absolute bottom-0 -top-3 right-10 -left-3' />
                </div>
            <div className=' flex justify-center items-center p-4 max-w-[88vh] max-h-[80vh] '>
            
                <img src={imgURL} className='w-full h-full'/>

            </div>

        </div>
    
    </div>
    
  )
}

export default DisplayImage