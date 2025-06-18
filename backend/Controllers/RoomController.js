const express = require('express');
const Rooms = require('../Models/Rooms');
const CatchAsync = require('../Utili/CatchAsync');
const AppError = require('../Utili/AppError');
const mongoose = require('mongoose');

// getting rooms by Id
exports.getRoomByID = CatchAsync(async (req, res, next) => {
    const roomId = req.params.id;

    // Validate ObjectId format before querying
    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
        return next(new AppError('Invalid Room ID format', 400));
    }

    // Find the room by ID
    // If the room is not found, return an error
    const room = await Rooms.findById(roomId);

    // If the room is not found, return an error
    if (!room) {
        return next(new AppError('No room found with that ID', 404));
    }

    // If the room is found, return it in the response
    res.status(200).json({
        status: 'success',
        data: room
    });
});

// creating a new room
exports.createRoom = CatchAsync(async (req, res, next) => {
    const newRoom = await Rooms.create(req.body);

    // If the room creation fails, return an error
    if (!newRoom) {
        return next(new AppError('Failed to create room', 400));
    }

    // If the room is created successfully, return it in the response
    res.status(201).json({
        status: 'success',
        Data: newRoom
    });
});

// updating a room by ID
exports.updateRoom = CatchAsync(async(req, res, next)=>{
    const roomId =  req.params.id;
    const foundRoom = await Rooms.findByIdAndUpdate(roomId, req.body,{new:true, runValidators:true});

    if(!foundRoom){
        return next(new AppError('No room Found with that Id ', 404));
    }
    res.status(200).json({status: 'success', message: 'Room updated successfully', data:foundRoom})
});

// delete room 
exports.deleteRoom = CatchAsync(async(req, res, next) => {
  const roomId = req.params.id;
  const foundedRoom = await Rooms.findByIdAndDelete(roomId)

  const deletedRoom = await Rooms.findById(roomId)

  if (deletedRoom) {
    return next(new AppError('Not deleted the room data', ))
  }
});

// get all room
exports.getAllRooms = CatchAsync(async(req, res, next) => {
  
  const allRoomsData = await Rooms.find();
  if (!allRoomsData || allRoomsData.length === 0) {
    return next(new AppError('No rooms found', 404));
  };

  res.status(200).json({
    status: 'success',
    data: allRoomsData
  });

});