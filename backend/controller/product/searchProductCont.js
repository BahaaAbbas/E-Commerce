const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");





const searchProudctCon = async (req,res)=> {

    try {

        const query = req.query.q;
        
        const regex = new RegExp(query,'i','g');

        const product = await productModel.find({
            '$or': [
                {
                    productName : regex
                    
                },
                {
                    category : regex
                    
                },
            ]
        })
        

        res.json({
            message: 'Search Product list' ,
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

 module.exports = searchProudctCon