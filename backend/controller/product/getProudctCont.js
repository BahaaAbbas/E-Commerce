const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");





const getProudctCon = async (req,res)=> {

    try {

        const allPrduct = await productModel.find().sort({createdAt : -1});
        res.json({
            message: 'Return All Product' ,
            error: false,
            success: true,
            data: allPrduct,
        })
        
    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }
 }

 module.exports = getProudctCon