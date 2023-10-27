const express = require('express');
const app = express();
const morgan = require('morgan');
const APIError = require('./utils/apiError');
const globalErrorHandler = require('./controllers/errorController');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const helmet = require('helmet');
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const bodyParser = require('body-parser');
const Recipe = require('./models/recipeSchema')

 

app.use('/api',helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();
  next();
});

const recipeRoutes = require('./routes/recipeRoute');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoute');
const ingredientRoutes = require('./routes/ingredientRoute');
const sampleCtrl = require('./sample')

app.use('/users', userRoutes)
app.use('/recipes', recipeRoutes);
app.use('/categories', categoryRoutes);
app.use('/ingredient', ingredientRoutes);

app.use('/sample', sampleCtrl)

app.all('*', (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} in server plus`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
