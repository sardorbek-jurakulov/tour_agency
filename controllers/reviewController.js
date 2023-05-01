const catchAsync = require('./../utils/catchAsync');
const Review = require('./../models/reviewModel');

exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  
});

exports.createReview = catchAsync(async (req, res, next) => {
  
});

exports.updateReview = catchAsync(async (req, res, next) => {
  
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  
});