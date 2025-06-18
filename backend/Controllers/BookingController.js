const Booking = require('../Models/Booking');
const CatchAsync = require('../Utili/CatchAsync');
const APIFeatures = require('../Utili/ApiFeature');
const AppError = require('../Utili/AppError');
const mongoose = require('mongoose');


// check the booking is already exist or not middelware I build
exports.checkBookingExists = CatchAsync(async (req, res, next) => {
     const { roomId, startDate, endDate } = req.body;
     // Validate required fields
     if (!roomId || !startDate || !endDate) {
          return res.status(400).json({
               status: 'fail',
               message: 'Missing required fields'
          });
     }

     // Check if roomId is a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(roomId)) {
          return res.status(400).json({
               status: 'fail',
               message: 'Invalid roomId'
          });
     }

     const start = new Date(startDate);
     const end = new Date(endDate);

     const existingBooking = await Booking.findOne({
          roomId,
          startDate: { $lt: end },
          endDate: { $gt: start },
          status: { $in: ['pending', 'confirmed'] }
     });

     if ( existingBooking ) {
          return res.status(400).json({
               status: 'fail',
               message: 'Booking already exists'
          });
     }    
     next();
})

exports.createBooking = CatchAsync(async (req, res, next) => {
     const { roomId, startDate, endDate } = req.body;

     if (!req.user) {
          return res.status(401).json({
               status: 'fail',
               message: 'User not authenticated'
          });
     }
     const userId = req.user._id; // Assuming user ID is stored in req.user
     
     this.checkBookingExists(req, res, next); // Call the middleware to check for existing bookings
     const newBooking = await Booking.create({
          userId,
          roomId,
          startDate: new Date(startDate),
          endDate: new Date(endDate)
     });

     res.status(201).json({
          status: 'success',
          data: {
               booking: newBooking
          }
     });
});

exports.getAllBookings = CatchAsync(async (req, res, next) => {
     // Assuming you have a utility class for API features

     const features = new APIFeatures(Booking.find(), req.query)
          .filter()
          .sort()
          .limitFields()
          .paginate();

     const bookings = await features.query.populate('userId', 'name email').populate('roomId', 'name price');

     res.status(200).json({
          status: 'success',
          data: {
               bookings
          }
     });
});

exports.getBookingById = CatchAsync(async (req, res, next) => {
     const bookingId = req.params.id;
     const booking = await Booking.findById(bookingId)
          .populate('userId', 'name email')
          .populate('roomId', 'name price');

     if (!booking) {
          return next(new AppError('No booking found with that ID', 404));
     }

     res.status(200).json({
          status: 'success',
          data: {
               booking
          }
     });
});

exports.updateBooking = CatchAsync(async (req, res, next) => {
     const bookingId = req.params.id;
     const updatedBooking = await Booking.findByIdAndUpdate(
          bookingId,
          req.body,
          {
               new: true,
               runValidators: true
          }
     );

     if (!updatedBooking) {
          return next(new AppError('No booking found with that ID', 404));
     }

     res.status(200).json({
          status: 'success',
          data: {
               booking: updatedBooking
          }
     });
});

exports.deleteBooking = CatchAsync(async (req, res, next) => {
     const bookingId = req.params.id;
     const deletedBooking = await Booking.findByIdAndDelete(bookingId);

     if (!deletedBooking) {
          return next(new AppError('No booking found with that ID', 404));
     }

     res.status(204).json({
          status: 'success',
          data: null
     });
});
