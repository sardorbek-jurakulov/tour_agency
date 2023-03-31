const express = require("express");
const fs = require("fs");

const app = express();
const router = express.Router();

app.use(express.json());

const DB_PATH = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(DB_PATH, "UTF-8"));

// route handlers
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "Internel server error",
    message: "This route is not yet defined!",
    data: {}
  });
};

router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;