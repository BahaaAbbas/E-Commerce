const userModel = require("../../models/userModel");
const addToCartModel = require("../../models/cartProductModel");


async function updateAddToCartProductCon(req,res) {
    
    try {

        const userId = req.userId;
        const addToCartproductId = req?.body?._id;
        const qty = req.body.quantity;

        const updateProduct = await addToCartModel.updateOne({_id: addToCartproductId},{
           
           ...( qty && {quantity: qty})
        })



    return res.json({
            message: 'Updated Product' ,
            data: updateProduct,
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

module.exports = updateAddToCartProductCon;