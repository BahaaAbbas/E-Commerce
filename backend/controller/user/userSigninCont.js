const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userSignInCont(req,res) {
    
    try {
        
        const {email , password} = req.body;

        if(!email){
            throw new Error('Please Provide Email');
        }

        if(!password){
            throw new Error('Please Provide Password');
        }

        const user = await userModel.findOne({email});

        if(!user) {
            throw new Error('User not found.')
        }

        const checkPassord = await bcrypt.compareSync(password, user.password); 
        
        if(checkPassord) {

            const tokenData = {

                _id : user._id,
                email: user.email,


            }

            const token =  await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 10 });
            
            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite : 'None'
            }
            res.cookie('token',token , tokenOption).json({
                message: 'Login Successfully',
                data: tokenData,
                success: true,
                error : false,

            })
        }
        else {
            throw new Error('Password not match !!!')
        }


    } catch (error) {
        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })

    }
}

module.exports = userSignInCont;