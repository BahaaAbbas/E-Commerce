import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { MdDescription } from 'react-icons/md';
import productCategory from '../helpers/ProductCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImages';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditCompnent = ({
  onClose,
  productData,
  dataFetched,


}) => {

  const [data , setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price : productData?.price,
    sellingPrice: productData?.sellingPrice,
})

const handleOnChange = (e) => {

    const { name , value}= e.target;
    setData((prev)=> {
        return {
            ...prev,
            [name]: value,
        }
    })

}

const [openFullScreenImage, setOpenFullScreenImage ] = useState(false);
const [fullScreenImage ,setFullScreenImage] = useState('');


const handleUploadProduct = async(e) => {

    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((prev)=> {
        return {
            ...prev,
            productImage:[...prev.productImage , uploadImageCloudinary.url]
        }
    })

}

const handleDeleteProductImage = async(index)=> {

   const neProudctImage = [...data.productImage];

   neProudctImage.splice(index,1);
   setData((prev)=> {
    return {
        ...prev,
        productImage:[...neProudctImage]
    }
})
}

// upload final Proudct 
const handleSumbit = async (e) => {
    e.preventDefault();
    console.log('data',data)

    const fetchData = await fetch(SummaryApi.updateProduct.url , {
        method: SummaryApi.updateProduct.method,
        credentials: 'include',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(data),

        


    })

    const dataAPI = await fetchData.json();
    if(dataAPI.success) {
        toast.success(dataAPI?.message);
        onClose();
        dataFetched();
    }

    if(dataAPI.error) {
        toast.error(dataAPI?.message);

    }

}



  return (
    <div className='fixed  w-full bg-slate-200 bg-opacity-35 h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 rounded max-w-2xl w-full h-full max-h-[80%] overflow-hidden'>
        
        <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg '>Edit Porudct </h2>
            <div 
            onClick={onClose}
            className='w-fit  hover:bg-red-200 hover:rounded-full hover:scale-150 hover:transition-all ml-auto text-2xl hover:text-red-600 cursor-pointer '>
                <IoClose className='' />
            </div>
        </div>

       <form 
        onSubmit={handleSumbit}
       className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' >

        <label htmlFor='productName'>Product Name :</label>
        <input
         type='text'
         id='productName' 
         name = 'productName'
        placeholder='Enter Product Name' 
        value={data.productName}
        onChange={handleOnChange}
        required
        className='p-2 bg-slate-100 border rounded'
        />

        <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
        <input
         type='text'
         id='brandName' 
         name = 'brandName'
        placeholder='Enter Brand Name' 
        value={data.brandName}
        onChange={handleOnChange}
        required
        className='p-2 bg-slate-100 border rounded'
        />


        <label htmlFor='category' className='mt-3'>Category :</label>
        <select
        value={data.category}
        name='category'
        onChange={handleOnChange}
        required
        className='p-2 bg-slate-100 border rounded'

        >
            <option 
            
            className='' value={''} >Select Category</option>
            {
                productCategory.map((el,index)=> {
                    return (
                        <option value={el.value} key={el.value+index}>
                            {el.label}
                        </option>
                    )
                })
            }

        </select>

        <label htmlFor='productImage' className='mt-3'>Product Image :</label>
        <label htmlFor='UploadImageInput'>
            <div className=' cursor-pointer p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center'>
                    <div className='text-slate-500 flex justify-center items-center flex-col gap-2' >
                    
                        <span className='text-4xl'>
                            <FaCloudUploadAlt />
                        </span>
                        
                        <p className='text-md '>Upload Product Image </p>
                    
                        <input type='file' id='UploadImageInput' className='hidden'
                        onChange={handleUploadProduct}
                        />
                    </div>
            </div>
        </label>

        <div className=''>
            {
                data?.productImage[0] ? (
                   <div className='flex items-center gap-2'>
                    {
                        // <MdDelete />

                         data.productImage.map((el,index) => {
                            return (
                                <div className='relative group'> 
                                    <img src={el} 
                                        alt={el}
                                        width={80} height={80}
                                        className='bg-slate-100 border cursor-pointer'
                                        onClick={()=>{
                                            setOpenFullScreenImage(true);
                                            setFullScreenImage(el);
                                            

                                        }}
                                    />
                                    <div 
                                    onClick={()=>handleDeleteProductImage(index) }
                                    className=' cursor-pointer absolute bottom-1 right-1 p-1 text-white bg-red-600 rounded-full hidden group-hover:block'>
                                        <MdDelete />
                                    </div>
                                </div>
                      
                            )
                        })
                    }
                    </div>
                ) : (
                    <p className='text-red-600 text-xs'>*Please Upload Product Image </p>
                )
            }
           
        </div>


        <label htmlFor='price' className='mt-3'>Price :</label>
        <input
         type='number'
         id='price' 
         name = 'price'
        placeholder='Enter Price ' 
        value={data.price}
        onChange={handleOnChange}
        required
        className='p-2 bg-slate-100 border rounded'
        />   

        <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
        <input
         type='number'
         id='sellingPrice' 
         name = 'sellingPrice'
        placeholder='Enter Selling Price ' 
        value={data.sellingPrice}
        onChange={handleOnChange}
        required
        className='p-2 bg-slate-100 border rounded'
        /> 

        <label  className='mt-3'>Description :</label>
            <textarea  
            name='description' 
            onChange={handleOnChange} 
            htmlFor='description' 
            value={data.description}
            className='h-28 bg-slate-200 border resize-none p-1' placeholder='Enter Product Description' rows={3} >

            </textarea>

        <button

        className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'
        >Update Product</button>



       </form>



    </div>
    {
openFullScreenImage && (
    <>
        {/* Background overlay */}
        <div
            className="fixed inset-0  bg-opacity-90 z-500 bg-slate-200"
            
        ></div>
        
        {/* Image display component */}
        <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgURL={fullScreenImage}
            style={{ zIndex: 1001 }} 
        />
    </>
)
}


    {/* display image full-screen */}
     
      
</div>
  )
}

export default AdminEditCompnent