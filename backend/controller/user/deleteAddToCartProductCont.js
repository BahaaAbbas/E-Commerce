const userModel = require("../../models/userModel");
const addToCartModel = require("../../models/cartProductModel");


async function deleteAddToCartProductCon(req,res) {
    
    try {

        const userId = req.userId;
        const addToCartproductId = req.body._id;


        const deleteProduct = await addToCartModel.deleteOne({_id:addToCartproductId})



    return res.json({
            message: 'Product deleted from cart' ,
            data: deleteProduct,
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

module.exports = deleteAddToCartProductCon;