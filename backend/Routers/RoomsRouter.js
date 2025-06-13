// const express = require('express');
// const RoomController = require('../Controllers/RoomController');

// const router = express.Router();

// router.route('/:id').get(RoomController.getRoomByID);
// module.exports = router;
const express = require('express');
const RoomController = require('../Controllers/RoomController');
const AuthMiddleware = require('../Middelwares/AuthMiddelware');

const router = express.Router();

router.route('/')
     .post(AuthMiddleware.protect, AuthMiddleware.restrictTo('admin'), RoomController.createRoom);
     // Ensure the JWT is included in the Authorization header with the Bearer scheme when making a POST request to this route.

router.route('/:id')
     .get(AuthMiddleware.protect, AuthMiddleware.restrictTo('user'), RoomController.getRoomByID)
     .patch(AuthMiddleware.protect, AuthMiddleware.restrictTo('admin'), RoomController.updateRoom);

module.exports = router;
