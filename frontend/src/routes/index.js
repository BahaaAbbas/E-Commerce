import * as React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProudcts from "../pages/AllProudcts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Cancel from "../pages/Cancel.js";
import Success from "../pages/Success.js";
import OrderPage from "../pages/OrderPage.js";
import AllOrder from "../pages/AllOrder.js";


const router = createBrowserRouter ([
    {
        path: '/',
        element: <App/>,
        children : [
            {
                path: '',
                element: <Home/>

            },
            {
                path: 'login',
                element: <Login/>

            },
            {
                path: 'forgot-password',
                element: <ForgotPassword/>

            },
            {
                path: 'sign-up',
                element: <SignUp/>

            },
            {
                path: 'product-category',
                element: <CategoryProduct/>
            },
            {
                path: 'product/:id',
                element: <ProductDetails/>
            },
            {
                path: 'cart',
                element: <Cart/>
            },
            {
                path: 'search',
                element: <SearchProduct/>
            },
            {
                path: 'order',
                element: <OrderPage/>
            },
            {
                path: 'success',
                element: <Success/>
            },
            {
                path: 'cancel',
                element: <Cancel/>
            },
          

        
            {
                path: 'admin-panel',
                element: <AdminPanel/>,
                children : [
                    {
                        path: 'all-users',
                        element: <AllUsers/>
        
                    },
                    {
                        path: 'all-products',
                        element: <AllProudcts/>
        
                    },
                    {
                        path: 'all-order',
                        element: <AllOrder/>
                    },
                ]
                

            },
           

        ]
    }
])

export default router