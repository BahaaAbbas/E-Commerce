const userModel = require("../../models/userModel");
const addToCartModel = require("../../models/cartProductModel");


async function addToCartViewProductCon(req,res) {
    
    try {

    const currentUser = req.userId;
    const allProduct = await addToCartModel.find({
        userId : currentUser,

    }).populate('productId');

    return res.json({
            message: 'View addToCart' ,
            data: allProduct,
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

module.exports = addToCartViewProductCon;