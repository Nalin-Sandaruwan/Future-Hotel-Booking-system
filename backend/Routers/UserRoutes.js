const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');

router.route('/sign-up').post(authController.signup)
router.route('/login').post(authController.login)

module.exports = router;
