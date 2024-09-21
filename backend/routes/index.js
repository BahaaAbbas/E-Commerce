const express = require('express');
const router = express.Router();


const userSignUpCont = require('../controller/user/userSignupCont');
const userSignInCont = require('../controller/user/userSigninCont');
const userDetailsCont = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogOUTCon = require('../controller/user/userLogoutCont');
const allUsersCon = require('../controller/user/allUsersCont');
const updateUserCon = require('../controller/user/updateUser');
const UploadPorudctCon = require('../controller/product/uploadProudctCont');
const getProudctCon = require('../controller/product/getProudctCont');
const UpdateProductCon = require('../controller/product/updateProductCont');
const getCategoryProductCon = require('../controller/product/getOneCategoryProductCont');
const getCategoryWiseProductCon = require('../controller/product/getCategoryWiseProductCont');
const getProductDetailCon = require('../controller/product/getProductDetailCont');
const addToCartCon = require('../controller/user/addToCartCont');
const countAddToCartProductCon = require('../controller/user/countAddToCartProductCont');
const addToCartViewProductCon = require('../controller/user/addToCartViewProductCont');
const updateAddToCartProductCon = require('../controller/user/updateAddToCartProductCont');
const deleteAddToCartProductCon = require('../controller/user/deleteAddToCartProductCont');
const searchProudctCon = require('../controller/product/searchProductCont');
const filterProductCon = require('../controller/product/filterProductCont');
const paymentCon = require('../controller/order/paymentCont');
const webhooks = require('../controller/order/webhook');
const orderCon = require('../controller/order/OrderCont');
const allOrderCon = require('../controller/order/allOrderCont');


router.post('/signup',userSignUpCont);
router.post('/signin',userSignInCont);
router.get('/user-details',authToken ,userDetailsCont);
router.get('/userlogout',userLogOUTCon);


//admin-panel
router.get('/all-user',authToken,allUsersCon);
router.post('/update-user',authToken,updateUserCon);


//product
router.post('/upload-product',authToken,UploadPorudctCon);
router.get('/get-product',getProudctCon);
router.post('/update-product',authToken,UpdateProductCon);
router.get('/get-categoryProduct',getCategoryProductCon);
router.post('/category-product',getCategoryWiseProductCon);
router.post('/product-details',getProductDetailCon);
router.get('/search',searchProudctCon);
router.post('/filter-product',filterProductCon);



//User add to cart
router.post('/addtocart',authToken,addToCartCon);
router.get('/countaddtocartproduct',authToken,countAddToCartProductCon);
router.get('/view-cart-product',authToken,addToCartViewProductCon);
router.post('/update-cart-product',authToken,updateAddToCartProductCon);
router.post('/delete-cart-product',authToken,deleteAddToCartProductCon);

//payment and order
router.post('/checkout',authToken,paymentCon);
router.post('/webhook',webhooks); 
router.get('/order-list',authToken,orderCon); 
router.get('/all-order',authToken,allOrderCon); 










module.exports = router;