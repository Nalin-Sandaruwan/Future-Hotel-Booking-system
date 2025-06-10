const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

//dot env configaration
dotenv.config({ path: './config.env' })



mongoose.connect('mongodb://127.0.0.1:27017/blog', {
}).then(() => {
    console.log('mongo is connectd...')
}).catch((e) => {
    console.log(e);
})

const port = process.env.PORT ;
const server = app. listen(port, () => {
    console.log(`server is running in the port ${port}`)
})
