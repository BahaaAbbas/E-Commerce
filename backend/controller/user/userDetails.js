const userModel = require("../../models/userModel");


async function userDetailsCont(req,res) {
  try {
    
        console.log('userId= ',req.userId);
        const user = await userModel.findById(req.userId);
        

        if (!user) {
            return res.status(404).json({
              message: 'User not found',
              error: true,
              success: false,
            });
          }
          
        res.status(200).json({
            data : user,
            message: 'User Details',
            error: false,
            success: true,
    
    
        })
        


  } catch (error) {
    res.status(400).json({
        message: error.message || error,
        error: true,
        success: false,


    })
  }
}

module.exports = userDetailsCont;