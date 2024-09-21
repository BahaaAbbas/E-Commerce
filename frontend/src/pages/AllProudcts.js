import React, { useEffect, useState } from 'react'
import UploadProudct from '../components/UploadProudct'
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProudcts = () => {
  const[ openUploadProduct , setOpenUploadProduct] = useState(false);
  const [allProduct , setAllProduct] = useState([]);
  
  const fetchAllProduct = async ()=> {
    const fetchData = await fetch(SummaryApi.getProduct.url);
    const dataAPI = await fetchData.json();

    setAllProduct(dataAPI?.data || []);
  }

  useEffect(()=> {
    fetchAllProduct();
  },[])


  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
          <h2 className='font-bold text-lg '> All Products</h2>
          <button 
          onClick={() =>setOpenUploadProduct(true)}
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3 rounded-full transition-all '>Upload Product</button>
        </div>

        {/* All -products */}
        <div className='flex items-center flex-wrap gap-5 py-4  h-[calc(100vh-190px)] overflow-y-scroll'>
          {
            allProduct.map((product , index)=> {
              return (
                <AdminProductCard 
                dataFetched = {fetchAllProduct}
                data={product} key={index+'allProduct'}/>
               
              )
            })
          }
        </div>


        {/* upload product  */}

        {
          openUploadProduct && (
            <UploadProudct 
            fetchedData={fetchAllProduct}
              onClose = {()=> setOpenUploadProduct(false)}
            />
          )
        }


       


    </div>
  )
}

export default AllProudcts