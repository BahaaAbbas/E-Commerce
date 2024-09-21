const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");

const getCategoryWiseProductCon = async(req,res) => {
    try {
        
        const { category } = req?.body || req?.query;
        const productCategory = await productModel.find({category});

        
        res.json({
            message: 'Product Category' ,
            error: false,
            success: true,
            data:productCategory,
        })
        
        
    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }


    
}

module.exports = getCategoryWiseProductCon