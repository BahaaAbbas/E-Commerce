import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFun,
}
) => {
  const [userRole , setUserRole ]= useState(role);
  const handleOnChangeSelect = (e)=> {
    setUserRole(e.target.value);
    console.log(e.target.value);

  }

  const updateUserRole = async ()=> {

    const fetchData = await fetch(SummaryApi.updateUser.url,{
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: { 
         'content-type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      })

    })

    console.log('Raw fetch response:', fetchData);
    const dataAPI = await fetchData.json();

    if(dataAPI.success) {
      toast.success(dataAPI.message);
      onClose();
      callFun();
    }
    console.log('role updated',dataAPI);




  }

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0  w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
        <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
          <button className='block ml-auto hover:bg-red-200 hover:rounded-full hover:scale-150 hover:transition-all'
            onClick={onClose}
          >
            <IoClose />

          </button>
          <h1 className='pb-4 text-lg font-medium'> Change User Role</h1>
          <p>Name : {name}</p>
          <p>Email : {email}</p>
          <div className='flex items-center justify-between my-4'>
                <p className=''>Role :</p>
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el=>{
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                </select>
           </div>

           <button 
           onClick={updateUserRole}
           className='-fit mx-auto block  py-1 px-3 bg-red-600 text-white hover:bg-red-700 rounded-full '>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole