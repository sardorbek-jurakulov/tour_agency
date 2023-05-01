const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const reviewId = req.body.id ?? "";
  if (reviewId === "") {
    return next(new AppError("It is required for get a review", 400));
  }
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError(`Review with ${reviewId} id is not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // const userReview = req.body.review;
  // const userReviewRating = req.body.rating;
  // const userReviewId = req.body.user;
  // const tourReviewId = req.body.tour;

  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  
});