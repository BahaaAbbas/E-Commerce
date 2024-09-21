import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditCompnent from './AdminEditCompnent';
import displayCurrency from '../helpers/DisplayCurrency';



const AdminProductCard = ({
    data,
    dataFetched, 

}) => {

    const [editProudct , setEditProduct ]= useState(false);

  return (
    <div className='bg-white rounded p-4 '>
     <div className='w-40'>
          <div className='w-32 h-40 flex justify-center items-center'>
            <img
            className=' object-fill mx-auto h-full'
            src={data.productImage[0]} width={120} height={120} />
          </div>
          <h1 className='mt-2 text-ellipsis line-clamp-2'>{data.productName}</h1>
          
          <div className=''>
            <div>
              <p className='font-semibold' >
                 {
                  displayCurrency(data.sellingPrice)
                 }

              </p>
                
            </div>

             <div 

            onClick={()=> setEditProduct(true)}
            className='w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 rounded-full text-black hover:text-white cursor-pointer'>
                <MdEdit className='' />

            </div>
          </div>

          
     </div>


        {
          editProudct && (
            <AdminEditCompnent 
            dataFetched = {dataFetched}
            productData={data} onClose={()=> setEditProduct(false)} />
          )
        }


        
    </div>
  )
}

export default AdminProductCard