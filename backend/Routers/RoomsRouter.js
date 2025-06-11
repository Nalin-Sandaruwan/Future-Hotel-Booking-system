// const express = require('express');
// const RoomController = require('../Controllers/RoomController');

// const router = express.Router();

// router.route('/:id').get(RoomController.getRoomByID);
// module.exports = router;
const express = require('express');
const RoomController = require('../Controllers/RoomController');

const router = express.Router();

router.route('/')
     .post(RoomController.createRoom);

router.route('/:id')
     .get(RoomController.getRoomByID);

module.exports = router;
