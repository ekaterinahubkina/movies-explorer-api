const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.post('/signup', createUser);
app.post('/signin', login);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
