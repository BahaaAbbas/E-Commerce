import React, { useContext, useState } from 'react'
import Logo from './Logo'
import LogoImg from '../assest/logo.png'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast, ToastContainer} from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch();
  const [menuDisplay , setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll('q');
  const [search , setSearch]= useState(searchQuery);

  const handleLogOut = async() => {
    const fetchData = await fetch(SummaryApi.logOUT.url, {
      method: SummaryApi.logOUT.method,
      credentials: 'include',
      
    })

    const dataAPI = await fetchData.json();
    

    if(dataAPI.success) {
      toast.success(dataAPI.message)
      dispatch(setUserDetails(null));
      navigate('/');
    }

    if(dataAPI.error) {
      toast.error(dataAPI.message)
    }

  }

  const handleSearch = (e) => {

    const { value } = e.target;
    

    setSearch(value);

    if(value){
      navigate(`/search?q=${value}`);
    }
    else{
      navigate('/search');
    }
    
  }


  return (
   <header className='h-16 shadow-md bg-white fixed w-full z-20'>
      <div className='h-full container mx-auto flex items-center justify-between px-4'>
      <div className='bg-transparent'>
        <Link to={'/'}>
          <img 
            className='mix-blend-multiply rounded object-contain bg-transparent' 
            src={LogoImg} 
            alt='Logo'
            width={120} 
            height={50}
          />
        </Link>
      </div>
            <div className='hidden md:flex items-center justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
              <input 
              onChange={handleSearch}
              value={search}
              type='text' placeholder='search product here...'
                className='w-full  outline-none '
              />
              <div className='text-lg min-w-[50px] h-8  bg-red-500 flex  items-center justify-center rounded-r-full text-white'> 
              <IoSearchSharp  className=''/>
              </div>
            </div>

            <div className='flex items-center gap-7'>
           
              <div className='relative   flex justify-center'
                
              >
                {
                  user?._id && (
                    <div className='text-3xl cursor-pointer'
                    onClick={()=> setMenuDisplay(prev => !prev)}
                    >
                    {
                      user?.profilePic ? (
                            <img src={user?.profilePic} alt={user?.name}
                            className='w-10 h-10 rounded-full '/>
                          ) :
                          (
                            <FaRegUserCircle className=''/>
                          )
                    }
                    
                    </div>
                  )
                }
           
                {
                  menuDisplay && (
                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded flex flex-col gap-1'> 
                    {/* hidden md:block for above div to hide the admin-panel */}
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={'admin-panel/all-products'}
                          onClick={()=> setMenuDisplay(prev => !prev)}
                         className='whitespace-nowrap p-2 hover:bg-slate-100 '
                         >Admin Panel</Link>
                        )
                      }
                      </nav>


                      <Link to={'/order'}
                                             onClick={()=> setMenuDisplay(prev => !prev)}
                        className='whitespace-nowrap p-2 hover:bg-slate-100 '

                      >Orders</Link>

                      
                    
                     
                   </div>

                  )
                }
               
              </div>
              {
                  user?._id && (

                    <Link to={'/cart'} className='text-2xl relative'>
                      <span>
                        <FaCartShopping className='cursor-pointer'/>
                      </span>
                      
                      <div className='bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-sm'>{context?.cartProductCount ?? 0}</p>
                      </div>
                    
                    </Link>
                    
                  )
                }
              

              <div>
                {
                  user?._id ? (
                    <button
                    className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 '
                    onClick={handleLogOut}
                    >
                      Logout</button>
                  ) 
                  :
                  (

                    <Link to={'/login'} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 '>Login</Link>
                  )
                }

                
             </div>

            </div>


            
      </div>
   </header>
  )
}

export default Header