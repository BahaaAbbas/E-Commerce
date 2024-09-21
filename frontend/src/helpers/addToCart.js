import SummaryApi from "../common";
import { toast } from 'react-toastify'

const addToCart = async (e,id) => {
    e.stopPropagation();
    e.preventDefault();

    const response = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({

        
            productId : id
        })

    })

    const dataAPI = await response.json();

    if(dataAPI.success){
        toast.success(dataAPI.message);
    }
    if(dataAPI.error){
        toast.error(dataAPI.message);
    }


    return dataAPI;
    
    
}


export default addToCart