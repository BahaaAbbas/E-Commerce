import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

    const [allUsers  , setAllUsers]= useState([]);
    const [openupdateUser , setOpenUpdateUser ] = useState(false);
    const [updateUserDetails , setUpdateUserDetails] = useState({
      email : '',
      name : '',
      role : '',
      _id: '',

    });


    const fetchAllUsers = async() => {

      try {
          const fetchData = await fetch(SummaryApi.all_Users.url, {
              method: SummaryApi.all_Users.method,
              credentials: 'include',
          });
  
          if (!fetchData.ok) {
              throw new Error(`HTTP error! status: ${fetchData.status}`);
          }
       
          const dataAPI = await fetchData.json();
          console.log(dataAPI)
          if(dataAPI.success){
            setAllUsers(dataAPI.data);
          }
          if(dataAPI.error){
            toast.error(dataAPI.message);
          }

          
      } catch (error) {
          console.error('Error fetching all users:', error);
      }
  };
  
    

    useEffect(()=> {

        fetchAllUsers();

    },[])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white '>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className=''>
          {
            allUsers.map((el,index)=> {
              return (
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button 
                    onClick={()=> {
                      setUpdateUserDetails(el)
                      setOpenUpdateUser(true)

                    }}
                    className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'>
                      <MdEdit />
                      </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

        {
          openupdateUser && (
              <ChangeUserRole 
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId = {updateUserDetails._id}
              callFun = {fetchAllUsers}
              onClose={()=> setOpenUpdateUser(false)}
              />
          )
        }
     

    </div>
  )
}

export default AllUsers