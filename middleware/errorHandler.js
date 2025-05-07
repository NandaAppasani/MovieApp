const errorHandler = (status, message) => {
  return (err, req, res, next) => {
    console.error(err);
    return res.status(status).json({
      message: message,
      error: err.message || err,
    });
  };
};

module.exports = errorHandler;
