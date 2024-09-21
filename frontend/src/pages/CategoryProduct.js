import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/ProductCategory';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {

    const params = useParams();
    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const URLSearch = new URLSearchParams(location.search);
    const urlCategoryListArray = URLSearch.getAll('category');
    
    const urlCategoryListObject = {}
    urlCategoryListArray.forEach(el=>{
      urlCategoryListObject[el] = true;
    })

    console.log('urlarray',urlCategoryListArray )

    console.log('urlobject', urlCategoryListObject)

    const [sortBy , setsortBy] = useState('');


    const [selectCategory , setSelectCategory]= useState(urlCategoryListObject);
    const [filterCategoryList , setFilterCategoryList] = useState([])

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterPorudct.url,{
        method: SummaryApi.filterPorudct.method,
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({
            category : filterCategoryList
        })
      
      });

      const dataAPI = await response.json();

      setData(dataAPI?.data || [] )
      console.log('dataAPIRESPONE:  ',dataAPI)
      
    }

    useEffect(()=>{
      fetchData();

    },[filterCategoryList])

    const handleSelectCategory = (e) =>{
      const {name , value , checked} = e.target;
      setSelectCategory((prev)=>{
        return{
          ...prev,
          [value ] : checked,
        }
      })
    
    }

    useEffect(()=>{

      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }

        return null;
      }).filter(el=>el)

      setFilterCategoryList(arrayOfCategory);

      const urlFormat = arrayOfCategory.map((el,index)=> {
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}`
        }
        
        return `category=${el}&&`
      })
      navigate(`/product-category?${urlFormat.join('')}`)

    },[selectCategory])

    const handleOnChangeSoryBy = (e) => {
      const { value } = e.target;

      setsortBy(value);

      if(value === 'asc'){

          setData(prev => prev.sort((a,b)=> a.sellingPrice - b.sellingPrice))

      }

      if(value === 'dsc'){

        setData(prev => prev.sort((a,b)=> b.sellingPrice - a.sellingPrice))

    }

    }

    useEffect(()=>{
      
    },[sortBy])
 
  return (
    <div className='container mx-auto p-4'>
      {/* desktop... */}
        <div className='hidden md:grid grid-cols-[200px,1fr]'>
            {/* left-side */}
            <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
              {/* sort by */}
              <div className=''>
                <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

                <form className='text-sm flex flex-col gap-2 py-2'>

                    <div className='flex items-center gap-3'>
                      <input
                      className='' 
                      onChange={handleOnChangeSoryBy}
                      value={'asc'}
                      checked={sortBy === 'asc'}
                      type='radio'
                       name='sortBy' />
                      <label className=''>Price - Low to High</label>
                    </div>

                    <div className='flex items-center gap-3'>
                      <input
                      className='' 
                      onChange={handleOnChangeSoryBy}                      value={'dsc'}
                      type='radio'
                      checked={sortBy === 'dsc'}

                       name='sortBy' />
                      <label className=''>Price - High to Low</label>
                    </div>

                </form>

              </div>


              {/* filter by */}
              <div className=''>
                <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

                <form className='text-sm flex flex-col gap-2 py-2'>

                  {
                    productCategory.map((categoryName,index)=>{
                      return(
                        <div className='flex items-center gap-3 '>
                            <input 
                            checked={selectCategory[categoryName?.value]}
                            value={categoryName?.value}
                            onChange={handleSelectCategory}
                            type='checkbox' name={'category'} id={categoryName?.value}/>
                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                        </div>
                      )
                    })
                  }


                </form>

              </div>


            </div>

             {/* right-side for product.. */}
             <div className=' px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

              <div className='min-h-[calc(100vh - 120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                  data.length !==0 &&(
                    <VerticalCard data={data} loading={loading}/>
                  )

                }
                 
              </div>

       
              </div>
        </div>
    </div>
  )
}

export default CategoryProduct