const userModel = require("../../models/userModel");
const addToCartModel = require("../../models/cartProductModel");


async function addToCartCon(req,res) {
    
    try {

        const { productId } = req?.body;
        const currentUser = req.userId;

        const isProductAvailable = await addToCartModel.findOne({productId , userId:currentUser});
        
        if(isProductAvailable){
            return  res.json({
                message: 'Already exits in Add To cart' ,
                success:false,
                error:true,
             
            })

        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId : currentUser,
        }

        const newAddToCart =  await addToCartModel(payload);
        const saveProduct = await newAddToCart.save();


    return res.json({
            message: 'Product Added to Cart' ,
            data: saveProduct,
            success:true,
            error:false,
         
        })


    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }
}

module.exports = addToCartCon;