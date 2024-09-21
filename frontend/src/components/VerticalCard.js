import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchGategoryWiseProduct';
import displayCurrency from '../helpers/DisplayCurrency';
import { FaAngleLeft , FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

const VerticalCard = ({
    loading ,
    data =[],
    

}) => {

    const loadingList = new Array(13).fill(null);
    const { fetchUserDetails , fetchUserAddToCart} = useContext(Context);
    
    
    const handleAddToCart = async (e,id) => {
       await addToCart(e,id);
       fetchUserAddToCart();
    }



  return (
    <div 
       
    className='transition-all grid grid-cols-[repeat(auto-fit,minmax(260px,300px))]  justify-center md:justify-between  md:gap-4 overflow-x-scroll scrollbar-none'>
        
             
        {
            loading ? (
                loadingList.map((product,index)=> {
                    return (
                        <div className='w-full min-w-[280px]  max-w-[280px]  md:min-w-[320px]   md:max-w-[320px]   bg-white rounded shadow-md '>

                            <div className='bg-slate-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center  items-center animate-pulse'>
           
                            </div>
                            
                            <div className='p-4 grid gap-3 '>
                                <h2 className='py-2 w-full bg-slate-300 rounded-full p-1 animate-pulse text-black font-medium md:text-lg text-base text-ellipsis line-clamp-1 '>
                                   
                                    
                                </h2>
                                <p className='py-2  w-full bg-slate-300 rounded-full p-1 animate-pulse capitalize text-slate-500 font-semibold'>
                                    
                                </p>

                                <div className='flex gap-3'>
                                    <p className='py-2  w-full bg-slate-300 rounded-full p-1 animate-pulse text-red-600 font-medium'>
                                        
                                    </p>

                                    <p className=' py-2  w-full bg-slate-300 rounded-full p-1 animate-pulse text-slate-500 line-through'>
                                       
                                        
                                    </p>
                                </div>  
                                <button className='py-2  text-sm  text-white px-3  bg-slate-300 rounded-full  animate-pulse w-full'>
                                </button>

                            </div>
                        
                        </div>
                    )
                })
            )
            :
            (
                data.map((product,index)=> {
                    return (
                        <Link 
                        onClick={scrollTop}
                        to={'/product/'+product._id} className='w-full min-w-[280px]  md:min-w-[300px] max-w-[280px]  md:max-w-[300px]  bg-white rounded shadow-md '>

                            <div className='bg-slate-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img 
                                className='mix-blend-multiply object-scale-down h-full hover:scale-110 transition-all'
                                src={product.productImage[0]}/>
                
                            </div>
                            
                            <div className='p-4 grid gap-3'>
                                <h2 className=' text-black font-medium md:text-lg text-base text-ellipsis line-clamp-1 '>
                                    {product?.productName}
                                    
                                </h2>
                                <p className='capitalize text-slate-500 font-semibold'>
                                    {product?.category}
                                </p>

                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>
                                        { displayCurrency(product?.sellingPrice)
                                        }
                                    </p>

                                    <p className='text-slate-500 line-through'>
                                       
                                        { displayCurrency(product?.price)
                                        }
                                    </p>
                                </div>  
                                <button 
                                 onClick={(e)=>handleAddToCart(e,product?.id)}
                                className=' text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>
                                    Add to Cart</button>

                            </div>
                        
                        </Link>
                    )
                })
            )
            
        }
    </div>
    
  
  )
}

export default VerticalCard