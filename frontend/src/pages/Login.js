import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye , FaEyeSlash  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword , setshowPassword] = useState(false);
    const [data , setData] = useState({
        email: '',
        password:''
    })

    const handleOnChangeData = (e) => {
            const {name , value } = e.target;

            setData((prev)=> {
                return {
                    ...prev,
                    [name]: value
                }
            })

    }

    // console.log('data login', data);
    const navigate = useNavigate();
    const { fetchUserDetails , fetchUserAddToCart} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

       

            const dataResponse = await fetch(SummaryApi.signIN.url,{
                method: SummaryApi.signIN.method,
                credentials : 'include',
                headers: {
                    'content-type': 'application/json'
                },
        
                body : JSON.stringify(data)
              })
        
              const dataAPI = await dataResponse.json()
    
              if(dataAPI.success) {
    
                toast.success(dataAPI.message);
              
                navigate('/');
                fetchUserDetails();
                fetchUserAddToCart();
                
              }
    
              if(dataAPI.error) {
    
                toast.error(dataAPI.message);
              }
    
    
    
              console.log('data',dataAPI);
    
             
        
    
    }

  return (
    <section id='login'>
        <div className='mx-auto container p-4'> 
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto '>
                        <img src={loginIcons} alt='Login Icons'/>
                    </div>
                    <form className='pt-6 flex flex-col gap-6' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email: </label>
                            <div className='bg-slate-200 p-2 flex'>
                            <input type='email' 
                             name='email'
                             value={data.email}
                             onChange={handleOnChangeData}
                             placeholder='Enter Your Email...'
                            className='w-full h-full bg-transparent outline-none'
                            />

                            </div>
                        </div>

                        <div>
                            <label>Password: </label>
                            <div className='bg-slate-200 p-2 flex'>
                            <input type={showPassword ? 'text' : 'password'} 
                             name='password'
                             value={data.password}
                             onChange={handleOnChangeData}
                            placeholder='Enter Your Password...'
                            className='w-full h-full bg-transparent outline-none  '
                            />
                            <div className='cursor-pointer text-xl' onClick={()=> setshowPassword((prev)=>!prev)}>
                                <span>
                                    {
                                        showPassword? (
                                            <FaEyeSlash />
                                        )
                                        :
                                        (
                                            <FaEye />   
                                        )
                                    }
                                   
                                    
                                </span>
                            </div>

                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-400'>Forgot Password?</Link>
                        </div>

                        <button className='bg-red-600 hover:bg-red-900 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
                    </form>

                    <p className='my-5'>Dont have an account? <Link to={'/sign-up'} className=' text-red-500 hover:text-red-700 hover:underline'>Sign Up</Link></p>

                </div>
        </div>

    </section>
  )
}

export default Login