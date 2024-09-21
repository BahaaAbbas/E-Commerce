const backendDomain = 'http://localhost:4001';

const SummaryApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method: 'post'
    },
    signIN : {
        url : `${backendDomain}/api/signin`,
        method: 'post'
    },
    logOUT : {
        url : `${backendDomain}/api/userlogout`,
        method: 'get'
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method: 'get'
    },
    all_Users : {
        url : `${backendDomain}/api/all-user`,
        method: 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method: 'post'
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method: 'post'
    },
    getProduct : {
        url : `${backendDomain}/api/get-product`,
        method: 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method: 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method: 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method: 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        method: 'post'
    },
    countAddToCartProduct : {
        url : `${backendDomain}/api/countaddtocartproduct`,
        method: 'get'
    },
    viewAddToCartProduct : {
        url : `${backendDomain}/api/view-cart-product`,
        method: 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method: 'post'
    },
    searchPorudct : {
        url : `${backendDomain}/api/search`,
        method: 'get'
    },
    filterPorudct : {
        url : `${backendDomain}/api/filter-product`,
        method: 'post'
    },
    payment : {
        url : `${backendDomain}/api/checkout`,
        method: 'post'
    },
    getOrder : {
        url : `${backendDomain}/api/order-list`,
        method: 'get'
    },
    allOrder : {
        url : `${backendDomain}/api/all-order`,
        method: 'get'
    },

    

    

    


    

    

    
    


    


    

    

    



   



    

    

    
}

export default SummaryApi