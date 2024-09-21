const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");

const getCategoryProductCon = async(req,res) => {
    try {

        const productCategory = await productModel.distinct('category');

        console.log('category',productCategory);
        

        
        const productByCategory = []

        for( const category of productCategory){

            const product = await productModel.findOne(
                {
                    category : category
                }
            );
            if(product){
                productByCategory.push(product);
            }
        }

        res.json({
            message: 'Category Product' ,
            error: false,
            success: true,
            data:productByCategory,
        })
        
        
    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }


    
}

module.exports = getCategoryProductCon