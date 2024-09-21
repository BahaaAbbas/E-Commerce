const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");

const getProductDetailCon = async(req,res) => {
    try {

        const { productId } = req.body;
        const product = await productModel.findById(productId);


        
        res.json({
            message: '{Product Details}' ,
            error: false,
            success: true,
            data: product,
        })
        
        
    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }


    
}

module.exports = getProductDetailCon