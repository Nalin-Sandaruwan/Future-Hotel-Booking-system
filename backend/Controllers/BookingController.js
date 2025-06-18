const Booking = require('../Models/Booking');
const CatchAsync = require('../Utili/CatchAsync');
const APIFeatures = require('../Utili/APIFeatures');
const AppError = require('../Utili/AppError');

// check the booking is already exist or not middelware I build
exports.checkBookingExists = CatchAsync(async (req, res, next) => {
     const { checkIn, checkOut, roomId } = req.body;
     // Validate required fields
     if (!checkIn || !checkOut || !roomId) {
          return res.status(400).json({
               status: 'fail',
               message: 'Missing required fields'
          });
     }

     const checkInDate = new Date(checkIn);
     const checkOutDate = new Date(checkOut);

     const existingBooking = await Booking.findOne({
          roomId,
          startDate: { $lt: checkOutDate },
          endDate: { $gt: checkInDate },
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