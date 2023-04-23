const express = require('express');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const app = express();

app.use(express.json());

// route handlers
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Internel server error',
    message: 'This route is not yet defined!',
    data: {},
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Internel server error',
    message: 'This route is not yet defined!',
    data: {},
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Internel server error',
    message: 'This route is not yet defined!',
    data: {},
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Internel server error',
    message: 'This route is not yet defined!',
    data: {},
  });
};
