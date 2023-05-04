const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {}
  if (req.params.tourId) {
    filter = { tour: req.params.tourId };
  }
  const reviews = await Review.find(filter);
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

  // Allow nested routes
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
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

exports.deleteReview = factory.deleteOne(Review);