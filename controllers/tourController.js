const fs = require('fs');

const DB_PATH = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(DB_PATH, 'UTF-8'));

exports.checkID = (req, res, next, val) => {
  const requestedTourIndex = tours.findIndex(
    (el) => el.id === req.params.id * 1
  );
  if (requestedTourIndex === -1) {
    return res.status(404).json({
      status: 'not founded',
      message: `No element found with id ${val} in tours`,
      data: {},
    });
  }
  req.requestedTourIndex = requestedTourIndex;
  next();
};

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
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: tours[req.requestedTourIndex],
    },
  });
};

exports.createTour = (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newTourId, ...req.body };
  tours.push(newTour);
  fs.writeFile(DB_PATH, JSON.stringify(tours), (err) => {
    if (err) {
      res.status(500).json({
        status: 'Internal Server Error',
        message:
          'Some error was occured when writeing data to the database, pleace try to rewrite data',
        data: {},
      });
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const updatedTour = { id, ...req.body };
  tours.splice(req.requestedTourIndex, 1, updatedTour);
  fs.writeFile(DB_PATH, JSON.stringify(tours), (err) => {
    if (err) {
      res.status(500).json({
        status: 'Internal Server Error',
        message:
          'Some error was occured when writeing data to the database, pleace try to update data',
        data: {},
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  });
};

exports.deleteTour = (req, res) => {
  tours.splice(req.requestedTourIndex, 1);
  fs.writeFile(DB_PATH, JSON.stringify(tours), (err) => {
    if (err) {
      res.status(500).json({
        status: 'Internal Server Error',
        message:
          'Some error was occured when writeing data to the database, pleace try to delete data',
        data: {},
      });
    } else {
      res.status(204).json({
        status: 'No Content',
        data: null,
      });
    }
  });
};
