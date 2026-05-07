const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const CatchAsync = require('./CatchAsync');
const AppError = require('./AppError');
const authController = require('../Controllers/AuthController');

exports.protect = CatchAsync(async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    try {
        // 1) Try to verify Access Token if it exists
        if (accessToken) {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            
            if (!user) {
                return next(new AppError('The user belonging to this token does no longer exist.', 401));
            }

            req.user = user;
            return next();
        }
        
        // 2) If no Access Token but Refresh Token exists, trigger refresh
        throw { name: 'TokenExpiredError' }; 

    } catch (err) {
        // 3) If Access Token is expired or missing, try to refresh using Refresh Token
        if ((err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') && refreshToken) {
            try {
                const jwt_Refresh_Secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
                const decodedRefresh = jwt.verify(refreshToken, jwt_Refresh_Secret);
                
                const user = await User.findById(decodedRefresh.userId);
                if (!user || user.refreshToken !== refreshToken) {
                    return next(new AppError('Invalid session. Please log in again.', 401));
                }

                // Generate new Access Token
                const newAccessToken = authController.createToken(user._id);
                
                // Set new Access Token cookie
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 15, // 15 minutes
                    sameSite: 'lax'
                });

                req.user = user;
                return next();
            } catch (refreshErr) {
                return next(new AppError('Session expired. Please log in again.', 401));
            }
        }
        
        return next(new AppError('Invalid token. Please log in again.', 401));
    }
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
