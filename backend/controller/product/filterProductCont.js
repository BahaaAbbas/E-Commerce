const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");

const filterProductCon = async(req,res) => {
    try {
        
        const categoryList = req?.body?.category || [];
        
        const product = await productModel.find({
            category: {
                '$in': categoryList
            }
        })

        
        
        res.json({
            message: 'Category List Product' ,
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

module.exports = filterProductCon