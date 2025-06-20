const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();


// parse application/json
app.use(express.json())

app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

//dot env configaration
dotenv.config({ path: './config.env' })

// importing routes
const RoomsRouter = require('./Routers/RoomsRouter');
const BookingRouter = require('./Routers/BookingRouters');
const UserRouter = require('./Routers/UserRoutes');

// connecting to mongodb
mongoose.connect('mongodb://localhost:27017/Hottel-Booking', {
}).then(() => {
    console.log('mongo is connectd...')
}).catch((e) => {
    console.log(e);
})

app.use('/api/v1/rooms', RoomsRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/bookings', BookingRouter);
app.use('/api/v1/payments', require('./Routers/PaymentRouter'));




// handling undefined routes
const port = process.env.PORT;
if (!port) {
    console.error('PORT is not defined in the environment variables');
    process.exit(1);
}

// starting the server
const server = app.listen(port, () => {
    console.log(`server is running in the port ${port}`)
})
