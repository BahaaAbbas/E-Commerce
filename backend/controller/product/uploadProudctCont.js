const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");

async function UploadPorudctCon(req,res) {
    
    try {

        const sessionUserId = req.userId;
        if(!uploadProductPermission(sessionUserId)) {
                throw new Error('Permission Denied..')
        }

        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message: 'Product Upload Successfully' ,
            error: false,
            success: true,
            data: saveProduct
        })
        
    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }
}

module.exports = UploadPorudctCon

