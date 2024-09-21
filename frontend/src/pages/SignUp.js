
import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye , FaEyeSlash  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imagetobase64 from '../helpers/imagetobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {



  const [showPassword , setshowPassword] = useState(false);
  const [showConfirmPassword , setshowConfirmPassword] = useState(false);

  const [data , setData] = useState({
      email: '',
      password:'',
      name: '',
      confirmPassword:'',
      profilePic:'',
  })

  const navigate = useNavigate();

  const handleOnChangeData = (e) => {
          const {name , value } = e.target;

          setData((prev)=> {
              return {
                  ...prev,
                  [name]: value
              }
          })

  }

  

  const handleUploadPic = async(e) => {
    const file = e.target.files[0];

    const imagePic = await  imagetobase64(file);
    //console.log('imagepic',imagePic);

    if (file.size > 5 * 1024 * 1024) {
        toast.error('File is too large. Please upload a file smaller than 5MB.');
        return;
      }
  
      try {
        const imagePic = await imagetobase64(file);
        setData((prev) => ({
          ...prev,
          profilePic: imagePic,
        }));
      } catch (error) {
        console.error('Error converting image:', error);
        toast.error('Failed to upload image');
      }

}

  // console.log('data login', data);

  const handleSubmit = async (e) => {
      e.preventDefault();

      if(data.password === data.confirmPassword) {

        const dataResponse = await fetch(SummaryApi.signUP.url,{
            method: SummaryApi.signUP.method,
    
            headers: {
                'content-type': 'application/json'
            },
    
            body : JSON.stringify(data)
          })
    
          const dataAPI = await dataResponse.json()

          if(dataAPI.success) {

            toast.success(dataAPI.message);
            navigate('/login');
          }

          if(dataAPI.error) {

            toast.error(dataAPI.message);
          }



          console.log('data',dataAPI);

         
      }
      else {
        toast.error('Please Check Simalirty for password and confirm password');
        console.log('Please Check Simalirty for password and confirm password');
      }

      

  }


  return (
    <section id='signup'>
    <div className='mx-auto container p-4'> 
            <div className='bg-white p-5 w-full max-w-sm mx-auto '>

                <div className='w-20 h-20 mx-auto  relative overflow-hidden rounded-full'>
                   <div>
                    <img src={data.profilePic || loginIcons} alt='Login Icons'/>
                   </div>
                   <form className=''>
                    <label>
                    <div className='cursor-pointer pb-4 pt-2 bg-opacity-70 text-xs bg-slate-200 py-4 text-center absolute bottom-0 w-full'>
                        Upload Photo
                      </div>
                      <input type='file' className='hidden' onChange={handleUploadPic}/>
                    </label>
                     
                   </form>
                </div>
                <form className='pt-6 flex flex-col gap-6' onSubmit={handleSubmit}>
                <div className='grid'>
                        <label>Name: </label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type='text' 
                         name='name'
                         value={data.name}
                         required
                         onChange={handleOnChangeData}
                         placeholder='Enter Your Name...'
                        className='w-full h-full bg-transparent outline-none'
                        />

                        </div>
                    </div>
                    
                    <div className='grid'>
                        <label>Email: </label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type='email' 
                         name='email'
                         required
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
                         required
                         value={data.password}
                         onChange={handleOnChangeData}
                        placeholder='Enter Your Password...'
                        className='w-full h-full bg-transparent outline-none'
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
                       
                    </div>

                    <div>
                        <label>Confirm Password: </label>
                        <div className='bg-slate-200 p-2 flex'>
                        <input type={showConfirmPassword ? 'text' : 'password'} 
                         name='confirmPassword'
                         value={data.confirmPassword}
                         onChange={handleOnChangeData}
                         required
                         placeholder='Enter Confirm Password...'
                        className='w-full h-full bg-transparent outline-none'
                        />
                        <div className='cursor-pointer text-xl' onClick={()=> setshowConfirmPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showConfirmPassword? (
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
                       
                    </div>

                    <button className='bg-red-600 hover:bg-red-900 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>SignUp</button>
                </form>

                <p className='my-5'>Already have an account? <Link to={'/login'} className=' text-red-500 hover:text-red-700 hover:underline'>Login</Link></p>

            </div>
    </div>

</section>
  )
}

export default SignUp