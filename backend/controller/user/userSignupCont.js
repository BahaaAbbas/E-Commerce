const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');



async function userSignUpCont(req,res) {
    try {

        
        
        const {email , password , name} = req.body;

        //console.log(req.body);

        const user = await userModel.findOne({email});

        if(user) {
            throw new Error('Already user exists.')
        }

        if(!email){
            throw new Error('Please Provide Email');
        }

        if(!password){
            throw new Error('Please Provide Password');
        }

        if(!name){
            throw new Error('Please Provide Name');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassord =  bcrypt.hashSync(password, salt);
        
        if(!hashPassord){
            throw new Error('Something in Hash is Wrong!!');
        }

        const payload = {
            ...req.body ,
            role : 'GENERAL',
            password: hashPassord
        }
        const userData =  new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: 'User Created Successfully!'
        })



        
    } catch (error) {

        res.json({
            message: error.message || error  ,
            error: true,
            success: false,
        })

    }
}

module.exports = userSignUpCont;