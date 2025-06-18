const express = require('express');
const BookingController = require('../Controllers/BookingController');
const AuthMiddleware = require('../Utili/AuthMiddelware');
const router = express.Router();

router.route('/')
.post(AuthMiddleware.protect, BookingController.createBooking)
.get(AuthMiddleware.protect, BookingController.getAllBookings);

router.route('/:id')
.get(BookingController.getBookingById)
.put(BookingController.updateBooking)
.delete(BookingController.deleteBooking);

module.exports = router;
