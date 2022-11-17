const AppError = require('./../utils/appError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrDev(err, res);
  if (process.env.NODE_ENV === 'production') {
    let myErr = { ...err };
    myErr.message = err.message;
    if (myErr.kind === 'ObjectId') myErr = handleCastErrDB(myErr);

    sendErrProd(myErr, res);
  }
};

function sendErrDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

function sendErrProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('⚠️ ERROR:', err);
    res.status(err.statusCode).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
}

function handleCastErrDB(err) {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}
