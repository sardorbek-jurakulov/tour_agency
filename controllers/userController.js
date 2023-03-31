const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const DB_PATH = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(DB_PATH, "UTF-8"));

// route handlers
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};