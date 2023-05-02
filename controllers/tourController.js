const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// route handlers
exports.getAllTours = catchAsync(async (req, res, next) => {
  // try {
  // BUILD QUERY
  // 1A) Filtering
  // const queryObj = { ...req.query };
  // const excludedFields = ['page', 'sort', 'limit', 'fields'];
  // excludedFields.forEach((el) => delete queryObj[el]);

  // // 1B) Advenced filtering
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // let query = Tour.find(JSON.parse(queryStr));

  // 2) Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   // const sortBy = req.query.sort.replace(',', ' ');
  //   query = query.sort(sortBy);
  // } else {
  //   // quyidagi name propertysi ma'lumotlar bir vaqtda saqlanib qolgani uchun paginatsiyada muammo bo'ldi shuning uchun sortlashda qo'shimcha parametrni ishlatishga to'g'ri keldi odatda ma'lumotlar bir vaqtda saqlanib qolmaydi, shuning uchun odatda faqat createdAt propertysiga ko'ra sortlasak bo'ladi boshqa propertsiz
  //   query = query.sort('-createdAt, name');
  // }

  // 3) Field limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.replaceAll(',', ' ');
  //   query = query.select(fields);
  // } else {
  //   query = query.select('-__v');
  // }

  // 4) Pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 10;
  // const skip = (page - 1) * limit;
  // query = query.skip(skip).limit(limit);

  // if (req.query.page) {
  //   const numTours = await Tour.countDocuments();
  //   if (skip >= numTours) throw new Error('This page does not exists');
  // }

  // EXECUTE QUERY
  // const features = new APIFeatures(Tour.find(), req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  // const tours = await features.query;
  // query.sort().select().skip().limit()

  // const query = Tour.find()
  //   .where('duration')
  //   .equals(5)
  //   .where('difficulty')
  //   .equals('easy');

  // SEND RESPONSE
  //   res.status(200).json({
  //     status: 'success',
  //     requestedAt: req.requestTime,
  //     results: tours.length,
  //     data: {
  //       tours,
  //     },
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'Not found',
  //     message: 'Bad request',
  //   });
  // }
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // try {
  //   const tour = await Tour.findById(req.params.id);
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour,
  //     },
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'Failed',
  //     message: 'Tour not found',
  //   });
  // }

  // const tour = await Tour.findById(req.params.id).populate({
  //   path: 'guides',
  //   select: '-__v -passwordChangedAt',
  // });

  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError(`No tour found with ${req.params.id} ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  // try {
  //   const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour: updatedTour,
  //     },
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'Not Found',
  //     message: err,
  //   });
  // }
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTour) {
    return next(new AppError(`No tour found with ${req.params.id} ID`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  // try {
  //   const deletedTour = await Tour.findByIdAndDelete(req.params.id);
  //   res.status(204).json({
  //     status: 'No Content',
  //     data: deletedTour,
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'Not found',
  //     message: 'Requested tour not found',
  //   });
  // }
  const deletedTour = await Tour.findByIdAndDelete(req.params.id);
  if (!deletedTour) {
    return next(new AppError(`No tour found with ${req.params.id} ID`, 404));
  }
  res.status(204).json({
    status: 'No Content',
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  // try {
  //   const stats = await Tour.aggregate([
  //     {
  //       $match: {
  //         ratingsAverage: { $gte: 4.5 },
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: { $toUpper: '$difficulty' },
  //         numTours: { $sum: 1 },
  //         numRatings: { $sum: '$ratingsQuantity' },
  //         avgRating: { $avg: '$ratingsAverage' },
  //         avgPrice: { $avg: '$price' },
  //         minPrice: { $min: '$price' },
  //         maxPrice: { $max: '$price' },
  //       },
  //     },
  //     {
  //       $sort: { avgPrice: 1 },
  //     },
  //     {
  //       $match: { _id: { $ne: 'EASY' } },
  //     },
  //   ]);

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       stats,
  //     },
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'Not found',
  //     message: 'Requested tour not found',
  //   });
  // }
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    {
      $match: { _id: { $ne: 'EASY' } },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  // try {
  //   const year = req.params.year * 1;
  //   const plan = await Tour.aggregate([
  //     {
  //       $unwind: '$startDates',
  //     },
  //     {
  //       $match: {
  //         startDates: {
  //           $gte: new Date(`${year}-01-01`),
  //           $lte: new Date(`${year}-12-31`),
  //         },
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: { $month: '$startDates' },
  //         numTourStarts: { $sum: 1 },
  //         tours: { $push: '$name' },
  //       },
  //     },
  //     {
  //       $addFields: { month: '$_id' },
  //     },
  //     {
  //       $project: {
  //         _id: 0,
  //       },
  //     },
  //     {
  //       $sort: { numTourStarts: -1 },
  //     },
  //     {
  //       $limit: 2,
  //     },
  //   ]);

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       plan,
  //     },
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'Not found',
  //     message: 'Requested tour not found',
  //   });
  // }
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 2,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
