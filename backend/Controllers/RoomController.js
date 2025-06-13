const express = require('express');
const Rooms = require('../Models/Rooms');
const CatchAsync = require('../Utili/CatchAsync');
const AppError = require('../Utili/AppError');
const mongoose = require('mongoose');

// getting all rooms
exports.getRoomByID = CatchAsync(async (req, res, next) => {
    const roomId = req.params.id;

    // Validate ObjectId format before querying
    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
        return next(new AppError('Invalid Room ID format', 400));
    }

    const room = await Rooms.findById(roomId);

    if (!room) {
        return next(new AppError('No room found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: room
    });
});

// creating a new room
exports.createRoom = CatchAsync(async (req, res, next) => {
    const newRoom = await Rooms.create(req.body);

    if (!newRoom) {
        return next(new AppError('Failed to create room', 400));
    }

    res.status(201).json({
        status: 'success',
        Data: newRoom
    });


});
