const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const AppError = require('./Utili/AppError');
const globalErrorHandler = require('./Controllers/ErrorController');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = express();

// Load env variables
dotenv.config({ path: './config.env' });

// MIDDLEWARES
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// DB CONNECTION
const DB = process.env.DATABASE || 'mongodb://localhost:27017/Hottel-Booking';
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('DB CONNECTION ERROR:', err));

// ROUTES
const RoomsRouter = require('./Routers/RoomsRouter');
const BookingRouter = require('./Routers/BookingRouters');
const UserRouter = require('./Routers/UserRoutes');
const PaymentRouter = require('./Routers/PaymentRouter');

app.use('/api/v1/rooms', RoomsRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/bookings', BookingRouter);
app.use('/api/v1/payments', PaymentRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
