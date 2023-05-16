const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
// const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

router.use(authController.isLoggedIn);
router.get('/', viewsController.getOverview);
router.get('/tour/:slug', authController.protect, viewsController.getTour);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
