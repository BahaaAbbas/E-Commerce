
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userLogOUTCon(req,res) {

    try {
        
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite : 'None'
        }

        res.clearCookie('token',tokenOption);

        res.json({
            message: 'Logout Successfully'  ,
            error: false,
            success: true,
            data: [],
        })

    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })
    }
    
}

module.exports = userLogOUTCon;