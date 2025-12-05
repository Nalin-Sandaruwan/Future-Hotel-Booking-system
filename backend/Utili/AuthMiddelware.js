const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const CatchAsync = require('./CatchAsync');
const AppError = require('./AppError');

exports.protect = CatchAsync(async (req, res, next) => {

     let token;

     // Check if the token is provided in the headers
     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Also check for token in cookies
    else if (req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }  

     //verify the token
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.userId);

     if(!user){
          return next(new AppError('The user belonging to this token does no longer exist', 401));
     }
     req.user = user;
     next();

})


exports.restrictTo = (...roles) =>{
     return (req,res,next) => {
          if(!roles.includes(req.user.role)){
               return next(new AppError('You do not have permission to perform this action ', 403));
          }
          next();
     }
}
