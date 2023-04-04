const express = require('express');

const app = express();

app.use(express.json());

// route handlers
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Internel server error',
    message: 'This route is not yet defined!',
    data: {},
  });
};

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
