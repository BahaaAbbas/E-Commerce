import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {

    const [categoryProduct ,setCategoryProduct] = useState([]);
    const [loading , setLoading ] = useState(false);

    const CategoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async ()=>{
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataAPI = await response.json();
        setLoading(false);
        setCategoryProduct(dataAPI.data);
    }

    useEffect(()=>{
        fetchCategoryProduct();
    },[])


  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4  justify-between overflow-scroll scrollbar-none'>
            {

                loading ? (
                    
                  CategoryLoading.map((el,index)=> {
                            return(
                                <div 
                                key={'categoryLoaing'+index}
                                className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-300 animate-pulse'> 

                                </div>
                            )
                        })

                ) 
                :
                (

                
                    categoryProduct.map((product,index)=> {
                        return(
                            <Link 
                            key={product?.category}
                            to={'/product-category?category='+product?.category}
                            className='cursor-pointer'> 
                                <div className='w-16 h-16 flex items-center justify-center bg-slate-300 p-4 md:w-20 md:h-20 rounded-full overflow-hidden'>
                                    <img 
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                    src={product?.productImage[0]} alt={product?.category}/>
                                </div>
                                <p className='  capitalize font-semibold text-center text-sm md:text-base'>{product?.category}</p>

                            </Link>
                        )
                    })

                )
            }
        </div>
    </div>
  )
}

export default CategoryList