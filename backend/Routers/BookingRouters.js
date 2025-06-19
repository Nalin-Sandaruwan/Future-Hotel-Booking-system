const express = require('express');
const BookingController = require('../Controllers/BookingController');
const AuthMiddleware = require('../Utili/AuthMiddelware');
const router = express.Router();

router.route('/')
.post(AuthMiddleware.protect, BookingController.createBooking)
.get(AuthMiddleware.protect, BookingController.getAllBookings);

router.route('/:id')
.get( AuthMiddleware.protect , AuthMiddleware.restrictTo('admin'), BookingController.getBookingById)
.put( AuthMiddleware.protect , AuthMiddleware.restrictTo('admin'), BookingController.updateBooking)
.delete( AuthMiddleware.protect , AuthMiddleware.restrictTo('admin'), BookingController.deleteBooking);

module.exports = router;
