import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import moment from 'moment';
import displayCurrency from '../helpers/DisplayCurrency';

const AllOrder = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: 'include',
      })
  
      const dataAPI = await response.json();
  
      setData(dataAPI.data || []);
      console.log('order list', dataAPI);
    }
  
    useEffect(() => {
      fetchOrderDetails();
    }, [])
  
  
    return (
      <div className=' h-[calc(100vh-190px)] overflow-y-scroll'>
  
        {data.length === 0 && (
          <p>No Order available...</p>
        )}
  
  
        <div className='p-4  w-full '>
          {
            data.map((item, index) => {
              return (
                <div
  
  
                  key={item.userId + index}>
                  <p className='font-medium text-lg  '>{moment(item.createdAt).format('LL')}</p>
  
                  <div className='border rounded p-2'>
  
                    <div className='flex flex-col lg:flex-row justify-between'>
                      <div className='grid gap-1'>
                        {
                          item?.productDetails.map((product, index) => {
                            return (
                              <div
                                className='flex gap-3 bg-slate-100'
                                key={product.productId + index} >
                                <img
                                  src={product?.image[0]}
                                  className='w-28 h-28 bg-slate-300 object-scale-down  p-2'
                                />
  
                                <div className=''>
                                  <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name} </div>
                                  <div className='flex items-center gap-5 mt-1'>
                                    <div className='text-lg text-red-500 '>{displayCurrency(product.price)} </div>
                                    <p>Quantity: {product.quantity}</p>
  
                                  </div>
                                </div>
  
  
  
                              </div>
                            )
                          })
                        }
                      </div>
  
                      <div className='flex flex-col  gap-4 p-2 min-w-[300px]'>
                        <div className=''>
                          <div className='text-lg font-medium'>Payment Details : </div>
                          <p className=' ml-1'>Payment method : {item.paymentDetails.payment_method_type[0]}</p>
                          <p className=' ml-1'>Payment Status : {item.paymentDetails.paymet_status} </p>
                        </div>
  
                        <div>
                          <div className='text-lg font-medium '>Shipping Details</div>
                          {
                            item.shipping_options.map((ship, index) => {
                              return (
                                <div
                                  className=' ml-1'
                                  key={ship.shipping_rate + index}>
                                  Shipping Amount : {ship.shipping_amount}
                                </div>
                              )
                            })
                          }
                        </div>
  
                      </div>
                    </div>
  
                    <div className='font-semibold ml-auto w-fit lg:text-lg '>
                      Total Amount : {item.totalAmount}
                    </div>
                  </div>
  
                </div>
  
              )
            })
          }
        </div>
  
      </div>
    )
}

export default AllOrder