const userModel = require("../../models/userModel");


async function allUsersCon(req,res) {
    
    try {

        console.log('AllUsers-userid ',req.userId);

        const allUsers = await userModel.find();

        res.json({
            message: 'all-users' ,
            data: allUsers,
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

module.exports = allUsersCon;