const userModel = require("../../models/userModel");
const addToCartModel = require("../../models/cartProductModel");


async function countAddToCartProductCon(req,res) {
    
    try {

        const userId = req.userId;
        const count = await addToCartModel.countDocuments({
            userId : userId
        })
        

       

    return res.json({
            message: 'Ok ,Count products' ,
            data: count,
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

module.exports = countAddToCartProductCon;