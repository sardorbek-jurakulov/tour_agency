module.exports = (err, req, res, next) => {
  // console.log(`Error has been occured at ${err.stack}`);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Oops, some error has been accured';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
