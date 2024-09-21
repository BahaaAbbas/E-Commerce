import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common';
import Context from '../context';
import displayCurrency from '../helpers/DisplayCurrency';
import { MdDeleteOutline } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {

    const [data , setData] = useState([]);
    const [loading , setLoading ]= useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(context.cartProductCount).fill(null);

    const fetchData = async() => {
        
        const response = await fetch(SummaryApi.viewAddToCartProduct.url, {
            method: SummaryApi.viewAddToCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type' : 'application/json'
            }
        })

        const dataAPI = await response.json();
      
        if(dataAPI.success){
            setData(dataAPI.data);
            
        }
    }

    const handleLoading =async ()=> {
        setLoading(true);
        await fetchData();
        setLoading(false);
    }
    useEffect(()=> {

        handleLoading();
        
       
    },[])


    const increaseQty = async(id ,qty)=> {
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers:{
                    'content-type' : 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity : qty + 1
            })
        })

        const dataAPI = await response.json();

        if(dataAPI.success){
            fetchData();
            
        }


    }


    
    const decreaseQty = async(id ,qty)=> {
       
        if(qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers:{
                        'content-type' : 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity : qty - 1
                })
            })
    
            const dataAPI = await response.json();
    
            if(dataAPI.success){
                fetchData();
                
            }

        }
        

    }


    const deleteCartProduct = async(id) =>{
        

        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers:{
                    'content-type' : 'application/json'
            },
            body: JSON.stringify({
                _id: id,
               
            })
        })

        const dataAPI = await response.json();

        if(dataAPI.success){
            fetchData();

            context.fetchUserAddToCart();
            
        }

    }

    const totalQty = data.reduce((prev,current)=>prev + current.quantity,0)
    const totalPrice = data.reduce((prev,current)=>prev + (current.quantity*current?.productId?.sellingPrice),0)

    const handlePayment = async () => {

       
        
        const stripePromise = await loadStripe(process.env.REACT_APP_PUBLIC_KEY_STRIPE);
        const response = await fetch(SummaryApi.payment.url,{
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers:{
                    'content-type' : 'application/json'
            },
            body: JSON.stringify({
                cartItems: data
            })
        })

        const dataAPI = await response.json();

        console.log('payment response, ', dataAPI)
        if(dataAPI?.id){

            stripePromise.redirectToCheckout({
                sessionId : dataAPI.id
            })

            
            
        }
    }

  return (
    <div className='container mx-auto'>

       <div className='text-center text-lg my-3'>
        {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No data</p>
                ) 
            }
       </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* view product */}
           
            <div className='w-full max-w-3xl '>
                {
                    loading ? (
                        loadingCart.map((el,index)=> {
                            return (
                                <div key={`addtoCart-${index}`} className='w-full rounded bg-slate-300 h-32 my-2 border border-slate-400 animate-pulse'> 

                                </div>
                            )
                        })
                      
                    ) : (
                        data.map((product,index)=> {
                            return (
                                <div key={`addtoCart-${product?._id}`} className='w-full rounded bg-white h-32 my-2 border border-slate-400 grid grid-cols-[128px,1fr]'> 
                                    <div className='w-32 h-32 bg-slate-300'>
                                        <img src={product?.productId?.productImage[0]}
                                         className='w-full h-full object-scale-down mix-blend-multiply'
                                         />
                                    </div>

                                    <div className='px-4 py-2 relative'>
                                        {/* delete prodyct */}
                                        <div 
                                        onClick={()=>deleteCartProduct(product?._id)}
                                        className='absolute right-2 top-8 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'>
                                        <MdDeleteOutline />

                                        </div>
                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500 font-semibold'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>


                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button 
                                            onClick={()=>decreaseQty(product?._id,product?.quantity)}
                                            className=' border border-red-600 hover:bg-red-600 hover:text-white text-red-600 w-6 h-6 flex justify-center items-center rounded font-bold '>-</button>
                                            <span className='font-semibold'>{product?.quantity}</span>
                                            <button 
                                            onClick={()=>increaseQty(product?._id,product?.quantity)}
                                            className=' border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded font-bold'>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

                 {/* Summary Products */}
                 {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                        loading ? (
                            <div className='h-36 bg-slate-300 border border-slate-400 animate-pulse'>
                                    Total
                            </div>
                            
                        ): (
                            <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 mt-2 gap-2 font-medium text-lg text-slate-600 '>
                                        <p className=''>Quantity</p>
                                        <p className=''>{totalQty}</p>
                                        
                                    </div>
                                    
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayCurrency(totalPrice)}</p>
                                    </div>
    
                                    <button 
                                    onClick={handlePayment}
                                    className='mt-2 bg-blue-600 p-2 text-white w-full '>Payment</button>
                            </div>
    
                        )
                     } 
                        </div>
        

                    )
                 }
                  
        </div>
    </div>
  )
}

export default Cart