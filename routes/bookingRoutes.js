const express = require('express');
const bookingController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(
  '/chackout-session/:tourID',
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
