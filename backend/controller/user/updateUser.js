const userModel = require("../../models/userModel");


async function updateUserCon(req,res) {
    
    try {   

        const sessionUser = req.userId;

        const { userId, email, name, role } = req.body;

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),

        }

        const user = await userModel.findById(sessionUser);
        if (!user) {
            return res.status(404).json({
              message: 'Session user not found',
              error: true,
              success: false,
            });
          }
          
        console.log('user role', user.role);

        const updateUser = await userModel.findByIdAndUpdate(userId,payload);
        

        res.json({
            message: 'User Updated' ,
            data: updateUser,
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

module.exports = updateUserCon;