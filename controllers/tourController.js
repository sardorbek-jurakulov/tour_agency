const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Missing name or price',
      data: {},
    });
  }
  next();
};

// route handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    data: {
      // tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      // tour: tours[req.requestedTourIndex],
    },
  });
};

exports.createTour = async (req, res) => {
  const newTour = await Tour.create({});

  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour,
    },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      // tour: updatedTour,
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'No Content',
    data: null,
  });
};
