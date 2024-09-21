import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [cartProductCount , setCartProductCount] = useState(0);
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });

      if (!dataResponse.ok) {
        throw new Error(`Error: ${dataResponse.status} - ${dataResponse.statusText}`);
      }

      const dataAPI = await dataResponse.json();
      console.log('data-user', dataAPI);
      if(dataAPI.success){
        dispatch(setUserDetails(dataAPI.data));
      }
      // Assuming authentication is determined based on the fetched data
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setIsAuthenticated(false); // Adjust authentication state based on error
    }
  };




  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: 'include',
    });

    const dataAPI = await dataResponse.json();

    console.log('dataapi',dataAPI);

    if(dataAPI.success){

      setCartProductCount(dataAPI?.data);
    }

  }




  useEffect(() => {
    // Check authentication status only if necessary
    if (isAuthenticated) {
      fetchUserDetails();
      fetchUserAddToCart();
    }

  }, [isAuthenticated]);



  return (
    <>
    <Context.Provider value={{
        fetchUserDetails,
        fetchUserAddToCart,
        cartProductCount,
    }}>
      <ToastContainer 
        position='top-center'
      />
      <Header/>
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet/>
      </main>
    
      <Footer/>
    </Context.Provider>
    </>
  );
}

export default App;
