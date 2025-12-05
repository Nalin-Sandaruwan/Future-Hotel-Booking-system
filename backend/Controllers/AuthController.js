const User = require('../Models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CatchAsync = require('../Utili/CatchAsync');
const AppError = require('../Utili/AppError');
const sendEmail = require('../Utili/Email');


const createToken = (userId) => {
     const playload = { userId }; // playload is obj
     const jwt_Secret = process.env.JWT_SECRET
     return jwt.sign(playload, jwt_Secret, { expiresIn: '15m' }) // Short-lived access token
}

const createRefreshToken = (userId) => {
     const playload = { userId };
     const jwt_Secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET; // Use separate secret if available
     return jwt.sign(playload, jwt_Secret, { expiresIn: '7d' }) // Long-lived refresh token
}

const createSendToken = async (user, statusCode, res) => {
     const accessToken = createToken(user._id);
     const refreshToken = createRefreshToken(user._id);
     
     // Store refresh token in database
     user.refreshToken = refreshToken;
     await user.save({ validateBeforeSave: false });
     
     const cookieOptions = {            
          httpOnly: true,
          secure: false, // only send over HTTPS in production
          maxAge: 1000 * 60 * 15, // 15 minutes for access token
          sameSite: 'lax'
     };
     
     const refreshCookieOptions = {
          httpOnly: true,
          secure: false, // only send over HTTPS in production
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days for refresh token
          sameSite: 'lax'
     };

     res.cookie('accessToken', accessToken, cookieOptions);
     res.cookie('refreshToken', refreshToken, refreshCookieOptions);

     // Remove password and refreshToken from output
     user.password = undefined;
     user.refreshToken = undefined;

     res.status(statusCode).json({
          status: 'success',
          accessToken,
          refreshToken,
          data: {
               user
          }
     });
};


exports.signup = CatchAsync(async (req, res, next) => {

     const { name, email, password, confirmPassword } = req.body;

     if (!name || !email || !password || !confirmPassword) {
          return next(new AppError('All fields are required', 400));
     }

     if (password !== confirmPassword) {
          return next(new AppError('Password and confirm password do not match', 400));
     }

     const existingUser = await User.findOne({ email });

     if (existingUser) {
          return next(new AppError('User already exists', 400));
     }

     const hashedPassword = await bcrypt.hash(password, 12);
     const newUser = await User.create({
          name,
          email,
          password: hashedPassword
     })

     await createSendToken(newUser, 201, res)

})

//Login
exports.login = CatchAsync(async (req, res, next) => {

     const { email, password } = req.body;

     if (!email || !password) {
          return next(new AppError('Email and password are required', 400));
     }
     const user = await User.findOne({ email });
     if (!user) {
          return next(new AppError('Invalid email or password', 400));
     }

     const isMatch = await bcrypt.compare(password, user.password);

     if (!isMatch) {
          return next(new AppError('Invalid email or password', 400));
     }


     await createSendToken(user, 200, res)


})


//forget Password
exports.forgetPassword = CatchAsync(async (req, res, next) => {

     const { email } = req.body;
     if (!email) {
          return next(new AppError('Email is required', 400));
     }

     const user = await User.findOne({ email });
     if (!user) {
          return next(new AppError('No user found with that email', 404));
     }

     const otp = Math.floor(100000 + Math.random() * 900000).toString();

     // DB update (example Mongoose)
     const hashedOTP = await bcrypt.hash(otp, 12);
     user.resetCode = hashedOTP;

     // Set expiration time for the OTP
     // OTP valid for 10 minutes
     user.resetExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
     await user.save();

     // Here you would send the OTP to the user's email
     const message = ` This is your OTP for password reset : ${otp}. It is valid for 10 minutes.`;

     res.status(200).json({
          status: 'success',
          message: 'OTP sent to your email. Please check your inbox.',
          otp: otp // For testing purposes, you might want to remove this in production

     });
     // await sendEmail({
     //      email: user.email,
     //      subject: 'Your Password Reset OTP',
     //      message: message
     // })

     // res.status(200).json({
     //      status: 'success',
     //      message: 'OTP sent to your email. Please check your inbox.'
     // });
});


// Reset password
exports.resetPassword = CatchAsync(async (req, res, next) => {
     const { email, otp, newPassword, confirmPassword } = req.body;

     if (!email || !otp || !newPassword || !confirmPassword) {
          return next(new AppError('All fields are required', 400));
     }
     // find the user by email
     const user = await User.findOne({ email });
     if (!user) {
          return next(new AppError('No user found with that email', 404));
     }

     // check otp is matched or not
     const isValidOTP = await bcrypt.compare(otp, user.resetCode);
     if (!isValidOTP) {
          return next(new AppError('Invalid or expired OTP', 400));
     }

     // check if the OTP is expired or not
     if (user.resetExpires < Date.now()) {
          return next(new AppError('OTP has expired', 400));
     }

     // check the new password and confirm password are same or not
     if (newPassword !== confirmPassword) {
          return next(new AppError('Password and confirm password do not match', 400));
     }


     // save the new password and new data
     user.password = await bcrypt.hash(newPassword, 12);
     user.resetCode = undefined;
     user.resetExpires = undefined;
     await user.save();

     res.status(200).json({
          status: 'success',
          message: 'Password reset successfully'
     });
});

// Refresh Token
exports.refreshToken = CatchAsync(async (req, res, next) => {
     const { refreshToken } = req.cookies || req.body;

     if (!refreshToken) {
          return next(new AppError('Refresh token not provided', 401));
     }

     try {
          const jwt_Secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
          const decoded = jwt.verify(refreshToken, jwt_Secret);
          
          const user = await User.findById(decoded.userId);
          if (!user || user.refreshToken !== refreshToken) {
               return next(new AppError('Invalid refresh token', 401));
          }

          // Generate new access token
          const newAccessToken = createToken(user._id);
          
          const cookieOptions = {
               httpOnly: true,
               secure: false, // only send over HTTPS in production
               maxAge: 1000 * 60 * 15, // 15 minutes
               sameSite: 'lax'
          };

          res.cookie('accessToken', newAccessToken, cookieOptions);

          res.status(200).json({
               status: 'success',
               accessToken: newAccessToken,
               message: 'Access token refreshed successfully'
          });

     } catch (error) {
          return next(new AppError('Invalid refresh token', 401));
     }
});

// Logout
exports.logout = CatchAsync(async (req, res, next) => {
     const { refreshToken } = req.cookies || req.body;

     if (refreshToken) {
          // Find user and remove refresh token from database
          const jwt_Secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
          try {
               const decoded = jwt.verify(refreshToken, jwt_Secret);
               const user = await User.findById(decoded.userId);
               if (user) {
                    user.refreshToken = null;
                    await user.save({ validateBeforeSave: false });
               }
          } catch (error) {
               // Token might be invalid, but we still proceed with logout
          }
     }

     // Clear cookies
     res.clearCookie('accessToken');
     res.clearCookie('refreshToken');

     res.status(200).json({
          status: 'success',
          message: 'Logged out successfully'
     });
});
