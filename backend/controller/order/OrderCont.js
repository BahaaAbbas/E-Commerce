const userModel = require("../../models/userModel");
const addToCartModel = require("../../models/cartProductModel");
const stripe = require('../../config/stripe');
const orderModel = require("../../models/orderProductMode");


async function orderCon(req,res) {
    
    try {

        const currentUserId = req.userId;

        const orderList = await orderModel.find({userId:currentUserId}).sort({createdAt : -1})
     

    return res.json({
            message: 'Order List' ,
            data: orderList,
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

module.exports = orderCon;