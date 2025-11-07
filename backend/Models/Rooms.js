const mongoose = require('mongoose');
const validator = require('validator');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Room name is required'],
        trim: true
    },
    discription: {
        type: String,
        required: [true, 'Room description is required'],
        trim: true,
        minlength: [10, 'Room description must be at least 10 characters long']
    },
    gestCapacity: {
        type: Number,
        required: [true, 'Room guest capacity is required'],
        min: [1, 'Room guest capacity must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Room price is required'],
        min: [0, 'Room price must be positive']
    },
    location: {
        type: String,
        required: [true, 'Room location is required'],
        trim: true
    },
    amenities: {
        type: [String],
        required: [true, 'Room amenities are required']
    },
    images: {
        type: [String],
        required: [true, 'Room images are required'],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'At least one image is required'
        }
    },
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
