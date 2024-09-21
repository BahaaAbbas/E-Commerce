import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar  , FaStarHalf } from "react-icons/fa";
import displayCurrency from '../helpers/DisplayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';


const ProductDetails = () => {

    const [ data , setData] = useState({
        
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description:'',
        price : '',
        sellingPrice:'',
    });

    const [loading , setLoading] = useState(false);
    const params = useParams();
    const productImageListLoading = new Array(4).fill(null);
    const [activeImage ,setActiveImage] = useState('');
    const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
        x:0,
        y:0
    });
    const [zoomImage , setZoomImage] = useState(false);
    const { fetchUserDetails , fetchUserAddToCart} = useContext(Context);
    const navigate = useNavigate();

    const fetchProductDetails = async () => {

        setLoading(true);
        const response = await fetch(SummaryApi.productDetails.url,{
            method: SummaryApi.productDetails.method,
            headers: {
                'content-type':'application/json',
            },
            body: JSON.stringify({
                productId : params?.id
            })
        })

        
        const dataAPI = await response.json();
        setLoading(false);

        setData(dataAPI?.data);
        setActiveImage(dataAPI?.data?.productImage[0]);
    }

   

    useEffect(()=>{
        fetchProductDetails();
    },[params])


    const hanldeMouseEnterProduct = (imageURL)=> {
        
        setActiveImage(imageURL);

    }

    const handleZoomImage = useCallback((e) => {
        
        setZoomImage(true);   
        const {left , top , width , height } = e.target.getBoundingClientRect();
        console.log('coordinate', left , top , width,height);
        
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        setZoomImageCoordinate({
            x,y
        });

         


    },[zoomImageCoordinate])

    const handleLeaveZoomImage = ()=> {
        setZoomImage(false);
    }

    const handleAttToCart = async(e,id)=> {
        await addToCart(e,id);
        fetchUserAddToCart();

    }

    const handleBuyProduct = async(e,id)=> {
        await addToCart(e,id);
        fetchUserAddToCart();
        navigate('/cart');

    }




  return (
    <div className='container mx-auto p-4'>
        <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>
            {/* product image */}
            <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 '>
                <div className=' h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-300 relative p-2 ' >
                    <img src={activeImage}
                    onMouseMove={handleZoomImage}
                    onMouseLeave={ handleLeaveZoomImage}

                    className='h-full w-full object-scale-down mix-blend-multiply '
                     />

                     {/* zoom product */}
                     {
                        zoomImage && (
                            <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-300 p-1 -right-[520px] top-0 '>
                                <div
                                className='w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply'
                                style={{
                                    backgroundImage: `url(${activeImage})`,
                                    backgroundRepeat : 'no-repeat',
                                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                }}
                                >
        
        
                                </div>    
                         </div>
                        )
                     }
                   

                </div>
                <div className='h-full'>
                    {
                        loading  ? (
                         <div className='flex gap-2 lg:flex-col h-full overflow-scroll scrollbar-none'>
                                {
                                       productImageListLoading.map((el,index) => {
                                        return (
                                            <div
                                            key={`loadingImage-${index}`}
                                             className='h-20 w-20 bg-slate-300 rounded animate-pulse'>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                           
                        )
                        : (
                            <div className='flex gap-2 lg:flex-col h-full overflow-scroll scrollbar-none'>
                            {
                                   data?.productImage?.map((imageURL , index) => {
                                    return (
                                        <div
                                        key={imageURL} 
                                         className='h-20 w-20 bg-slate-300 rounded p-1'>
                                        
                                        <img src={imageURL}
                                        onMouseEnter={()=>hanldeMouseEnterProduct(imageURL)}
                                        onClick={()=>hanldeMouseEnterProduct(imageURL)}

                                        className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'/>
                                        
                                        </div>
                                    )
                                })
                            }
                            </div> 
                        )
                    }
                </div>
            </div>

             {/* product details */}
             {
                loading ? (
                    <div className='grid  gap-1 w-full'>
                    <p className='bg-slate-300 animate-pulse h-6 lg:h-8 rounded-full inline-block w-full'></p>
                    <h2 className=' text-2xl lg:text-4xl font-medium bg-slate-300 rounded-full animate-pulse h-6 lg:h-8 w-full'></h2>
                    <p className='capitalize text-slate-400 bg-slate-300 rounded-full animate-pulse h-6 lg:h-8 min-w-[100px] w-full'></p>
                    <div className='text-red-600 flex items-center gap-1 bg-slate-300 rounded-full animate-pulse h-6 lg:h-8 w-full '>
                 
    
                    </div>
    
                    <div className='flex items-center gap-2 my-1 lg:text-3xl text-2xl font-medium bg-slate-300 rounded-full animate-pulse h-6 lg:h-8 w-full '>
                        <p className='text-red-600'></p>
                        <p className='text-slate-400 line-through'></p>
    
                    </div>
    
                    <div className='flex items-center gap-3 my-2 w-full'>
                        <button className='bg-slate-300 rounded-full animate-pulse h-6 lg:h-8 w-full '></button>
                        <button className='bg-slate-300 rounded-full animate-pulse h-6 lg:h-8 w-full '></button>
                    </div>
    
                    <div className='w-full'> 
                        <p className='bg-slate-300 rounded-full animate-pulse h-6 lg:h-8 w-full mb-1 '></p>
                        <p className='bg-slate-300 rounded-full animate-pulse h-10 lg:h-8 w-full'></p>
                    </div>
    
                </div>
                ):
                (
                    <div className='flex flex-col gap-1'>
                    <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                    <h2 className=' text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                    <p className='capitalize text-slate-400'>{data?.category}</p>
                    <div className='text-red-600 flex items-center gap-1'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
    
                    </div>
    
                    <div className='flex items-center gap-2 my-1 lg:text-3xl text-2xl font-medium'>
                        <p className='text-red-600'>{displayCurrency(data?.sellingPrice)}</p>
                        <p className='text-slate-400 line-through'>{displayCurrency(data?.price)}</p>
    
                    </div>
    
                    <div className='flex items-center gap-3 my-2'>
                        <button 
                        onClick={(e)=>handleBuyProduct(e,data?._id)}
                        className='border border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                        <button
                          onClick={(e)=>handleAttToCart(e,data?._id)}
                         className='border border-red-600 rounded px-3 py-1 min-w-[120px]  font-medium text-white bg-red-600 hover:bg-white hover:text-red-600'>Add To Cart</button>
                    </div>
    
                    <div className=''> 
                        <p className='text-slate-600 font-medium my-1'>Description : </p>
                        <p className=''>{data?.description}</p>
                    </div>
    
                </div>
                )
             }


        </div>
        
        {
            data.category && (
                <CategoryWiseProductDisplay  category={data?.category} heading={'Recommended Products'}/>

            )
        }
        
   
    </div>
  )
}

export default ProductDetails