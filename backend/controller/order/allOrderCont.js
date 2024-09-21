const userModel = require("../../models/userModel");
const addToCartModel = require("../../models/cartProductModel");
const stripe = require('../../config/stripe');
const orderModel = require("../../models/orderProductMode");


async function allOrderCon(req,res) {
    
    try {

        const currentUserId = req.userId;

        const user = await userModel.findById(currentUserId);
        
        if(user.role !== 'ADMIN'){
            return res.status(500).json({
                message: 'Can\'t Access' ,
      

            })
        }

        const allOrders = await orderModel.find().sort({createdAt : -1})

    return res.status(200).json({
            message: 'All Order' ,
            data: allOrders,
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

module.exports = allOrderCon;