require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrorNotFound = require('./errors/ErrorNotFound');

const { NODE_ENV, DB_URL } = process.env;
const { PORT = 3001 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb-dev');

app.use(cors({
  origin: ['http://localhost:3000', 'https://api.movies.hubkina.nomoredomains.work'],
  credentials: true,
}));

app.use(requestLogger);

require('./routes/auth')(app);

app.use(auth);

require('./routes/index')(app);

app.use((req, res, next) => {
  next(new ErrorNotFound('Неправильный путь'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
