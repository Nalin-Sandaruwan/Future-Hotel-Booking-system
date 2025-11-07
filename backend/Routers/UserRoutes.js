const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

router.route('/sign-up').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/forget-password').post(authController.forgetPassword);
router.route('/reset-password').post(authController.resetPassword);

module.exports = router;
