import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchGategoryWiseProduct';
import displayCurrency from '../helpers/DisplayCurrency';
import { FaAngleLeft , FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';


const HorizontalCardProduct = ({
    category,
    heading
}) => {

    const [data , setData] = useState([]);
    const [loading , SetLoading]= useState(true);
    const loadingList = new Array(13).fill(null);

    const [scroll,setSecroll] = useState(0);
    const scrollElement = useRef();

    const { fetchUserDetails , fetchUserAddToCart} = useContext(Context);
    
    const handleAddToCart = async (e,id) => {
        await addToCart(e,id);
        fetchUserAddToCart();
     }
    
    const fetchData= async()=> {
        SetLoading(true);
        const CategoryProduct= await fetchCategoryWiseProduct(category);
        SetLoading(false);

        setData(CategoryProduct.data);
        
    }

    useEffect(()=> {
        
        fetchData();

    },[])

    const scrollRight = ()=> {
        scrollElement.current.scrollLeft +=300;

    }

    const scrollLeft = ()=> {
        scrollElement.current.scrollLeft -=300;

    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div 
        ref={scrollElement}
        className='transition-all flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none'>
            
                     <button 
                    onClick={scrollLeft}
                    className='z-10 hidden md:block text-lg absolute left-0 bg-white shadow-md rounded-full p-1 mx-1'> <FaAngleLeft /></button>
                    
                    <button 
                    onClick={scrollRight}
                    className='z-10 hidden md:block text-lg absolute right-0 bg-white shadow-md rounded-full p-1 mx-1'> <FaAngleRight /></button>

            {
                loading ? (
                    loadingList.map((product,index)=> {
                        return (
                                <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px]  md:max-w-[320px] h-36 bg-white rounded shadow-md flex'>
    
                                <div className='bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse '>
                                    {/* <img 
                                    className='object-scale-down h-full hover:scale-110 transition-all'
                                    src={product.productImage[0]}/>
                     */}
                                </div>
                                
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='rounded-full  animate-pulse p-1 bg-slate-300 text-black font-medium md:text-lg text-base text-ellipsis line-clamp-1 '>
                                        
                                        
                                    </h2>
                                    <p className='rounded-full animate-pulse bg-slate-300 p-1 capitalize text-slate-500 font-semibold'>
                                        
                                    </p>
    
                                    <div className=' flex gap-3 w-full'>
                                        <p className='rounded-full  animate-pulse w-full bg-slate-300 p-1 text-red-600 font-medium'>
                                           
                                        </p>
    
                                        <p className='rounded-full animate-pulse w-full bg-slate-300 p-1 text-slate-500 line-through'>
                                           
                                        </p>
                                    </div>  
                                    <button className= 'animate-pulse bg-slate-300  w-full text-sm  text-white px-3 py-0.5 rounded-full'>
                                        </button>
    
                                </div>
                            
                            </div>
                        )
                    })
                ) :
                (
                    data.map((product,index)=> {
                        return (
                                <Link to={'product/'+product._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px]  md:max-w-[320px] h-36 bg-white rounded shadow-md flex'>
    
                                <div className='bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                    <img 
                                    className='object-scale-down h-full hover:scale-110 transition-all'
                                    src={product.productImage[0]}/>
                    
                                </div>
                                
                                <div className='p-4 grid'>
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
                                    onClick={(e)=>handleAddToCart(e,product?._id)}
                                    className=' text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>
                                        Add to Cart</button>
    
                                </div>
                            
                            </Link>
                        )
                    })
                )

               
            }
        </div>
        
      

    </div>
  )
}

export default HorizontalCardProduct