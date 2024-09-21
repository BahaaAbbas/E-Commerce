import React, { useEffect, useState } from 'react'
import { FaAngleLeft , FaAngleRight } from "react-icons/fa6";



import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';



import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'



const BannerProduct = () => {

    const desktopImages = [
        image4,
        image3,
        image4,
        image3,
        image4,

    ]

    
    const mobileImages = [
        image4Mobile,
        image3Mobile,
        image4Mobile,
        image3Mobile,
        image4Mobile,

    ]

    const [currentImage , setCurrentImage ]= useState(0);
    const nextImage = ()=> {

        if(desktopImages.length - 1 > currentImage) {
            setCurrentImage((prev)=> prev +1);
        }
        
    }

    const previousImage = ()=> {

        if(currentImage != 0) {
            setCurrentImage((prev)=> prev - 1);
        }
        
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
          if(desktopImages.length - 1 > currentImage) {
            nextImage();
          }
          else{
                setCurrentImage(0);
          }

        },5000)

        return ()=> clearInterval(interval);
    },[currentImage])

  return (
    <div className='container  mx-auto px-4 rounded '>

      <div className=' h-56 md:h-72 w-full bg-slate-300 relative'>
            <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                <div className=' flex justify-between w-full text-2xl'>

                    <button 
                    onClick={previousImage}
                    className='bg-white shadow-md rounded-full p-1 mx-1'> <FaAngleLeft /></button>
                    
                    <button 
                    onClick={nextImage}
                    className='bg-white shadow-md rounded-full p-1 mx-1'> <FaAngleRight /></button>

                </div>

            </div>
            {/* dekstop & tablet vesion */}
          <div className='hidden md:flex h-full w-full overflow-hidden '>
            
            {
                desktopImages.map((imageURL,index)=>{
                    return (
                        <div 
                        key={imageURL}
                    
                        className='h-full w-full min-w-full min-h-full transition-all'>
                            <img src={imageURL} 
                            style={{transform:`translateX(-${currentImage * 100}%)`}}
                                className='w-full h-full' />
            
                        </div>

                    )
                })
            } 
          </div>

             {/* mobile vesion */}
             <div className='flex h-full w-full overflow-hidden md:hidden '>
            
            {
                mobileImages.map((imageURL,index)=>{
                    return (
                        <div 
                        key={imageURL}
                    
                        className='h-full w-full min-w-full min-h-full transition-all'>
                            <img src={imageURL} 
                            style={{transform:`translateX(-${currentImage * 100}%)`}}
                                className='w-full h-full object-cover' />
            
                        </div>

                    )
                })
            } 
          </div>

           {/* Dots Indicator */}
           <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {desktopImages.map((_, index) => (
                        <div
                            key={index}
                            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${currentImage === index ? 'bg-blue-500 scale-110' : 'bg-gray-400'}`}
                            onClick={() => setCurrentImage(index)}
                        ></div>
                    ))}
            </div>
           
           
      </div>

    </div>
  )
}

export default BannerProduct
