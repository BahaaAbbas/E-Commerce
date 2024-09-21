const jwt = require('jsonwebtoken');



async function authToken(req,res,next) {
    try {
               
               const token = req.cookies?.token;

               console.log('token= ',token);

               if (!token) {
               
                   return res.status(401).json({
                       message: 'Access Denied: No token provided , Please Login',
                       error: true,
                       success: false,
                   });

               }
   
               jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
                   if (err) {
                        console.log('error AUTH',err);
                        return res.status(403).json({
                            message: 'Invalid or expired token',
                            error: true,
                            success: false,
                        });

                   }

                   req.userId = decoded?._id;
                   next(); 

                   
               });
             
        
    } catch (error) {

        res.status(400).json({
            message: error.message || error,
            data : [],
            error: true,
            success: false,
    
    
        })
    }
}

module.exports = authToken;