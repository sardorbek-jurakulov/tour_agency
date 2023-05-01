const mongoose = require('mongoose');
// review / rating / createdAt / ref to tour / ref to user
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review text must have been provided'],
  },
  rating: {
    type: Number,
    required: [true, 'Review rating must have been provided'],
  },
  createdAt: {
    type: Date(),
    default: Date.now(),
  },
  refToTour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
  },
  refToUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
