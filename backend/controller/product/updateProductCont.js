const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");





async function UpdateProductCon(req,res) {

    try {

        
        if(!uploadProductPermission(req.userId)) {
                throw new Error('Permission Denied..')
        }

        const { _id , ...resBody} = req.body;

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody);

        

        res.json({
            message: 'Product Updated Successfully' ,
            error: false,
            success: true,
            data: updateProduct,
        })
        
    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }
 }

 module.exports = UpdateProductCon