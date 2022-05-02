const errorHandler = (err, req, res, next) => {
  console.log(err.stack || err);
  const status = err.statusCode || 500;

  if (status === 500) {
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }

  res.status(status).send({
    message: err.message,
  });
  return next();
};

module.exports = errorHandler;
