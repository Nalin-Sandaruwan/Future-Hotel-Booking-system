const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

const authMiddleware = require('../Utili/AuthMiddelware');

router.route('/sign-up').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forget-password').post(authController.forgetPassword);
router.route('/reset-password').post(authController.resetPassword);
router.route('/logout').post(authController.logout);
router.route('/auth-me').get(authMiddleware.protect, authController.getMe);

module.exports = router;
