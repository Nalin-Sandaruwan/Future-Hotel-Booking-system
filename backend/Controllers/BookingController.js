const Booking = require('../Models/Booking');
const Room = require('../Models/Rooms');  
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
          /* In the code snippet provided, `startDate: { : end },` is a query condition used to
          check if the `startDate` of an existing booking is less than the `end` date provided in
          the request. */
          startDate: { $lt: end },
          endDate: { $gt: start },
          // status: { $in: ['pending', 'confirmed'] }
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

    // 1) Basic validation
    if (!roomId || !startDate || !endDate) {
        return next(new AppError('Please provide roomId, startDate, and endDate', 400));
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time for date-only comparison

    // 2) Logical Date Validation
    if (start < now) {
        return next(new AppError('Booking start date cannot be in the past', 400));
    }
    if (end <= start) {
        return next(new AppError('End date must be after the start date', 400));
    }

    // 3) Verify Room Exists
    const room = await Room.findById(roomId);
    if (!room) {
        return next(new AppError('No room found with that ID', 404));
    }

    // 4) Check for Overlapping Bookings
    const existingBooking = await Booking.findOne({
        roomId,
        status: { $in: ['pending', 'confirmed'] },
        $or: [
            { startDate: { $lt: end, $gte: start } }, // Existing starts during new
            { endDate: { $gt: start, $lte: end } },   // Existing ends during new
            { startDate: { $lte: start }, endDate: { $gte: end } } // New is inside existing
        ]
    });

    if (existingBooking) {
        return next(new AppError('This room is already booked for the selected dates', 400));
    }

    // 5) Create Booking
    const newBooking = await Booking.create({
        userId: req.user._id,
        roomId,
        startDate: start,
        endDate: end
        // Consider adding: totalPrice: room.price * days
    });

    res.status(201).json({
        status: 'success',
        data: { booking: newBooking }
    });
});


exports.getAllBookings = CatchAsync(async (req, res, next) => {
     // Assuming you have a utility class for API features

     const features = new APIFeatures(Booking.find(), req.query)
          .filter()
          .sort()
          .limitFields()
          .pagination();

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
               new: true,  //show new responce
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
