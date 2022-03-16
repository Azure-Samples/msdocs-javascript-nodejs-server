import express from 'express';
import * as ejs from 'ejs';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import createError from 'http-errors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import {
  viewAllRentals,
  viewDeleteRental,
  viewAddNewRental,
  viewEditRental,
  apiAllRentals,
  apiAddNewRental,
  apiDeleteRental,
  apiEditRental,
} from '../controller/rentals.controller.js';
import { connectToDatabase } from '../model/rental.model.js';

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

// get root directory for paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const on404Error = (req, res, next) => {
  next(createError(404));
};
const onRouteErrors = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', err);
};
const checkTrailingSlash = (req, res, next) => {
  const trailingSlashUrl = req.baseUrl + req.url;
  if (req.originalUrl !== trailingSlashUrl) {
    res.redirect(301, trailingSlashUrl);
  } else {
    next();
  }
};

export default async (app) => {
  // Static files with cache
  app.use(
    express.static('public', {
      maxAge: '1d',
      cacheControl: true,
    }),
  );

  // Parse JSON
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Accept PATCH and DELETE verbs
  app.use(methodOverride('_method'));

  // Configure view engine to return HTML
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'html');
  app.engine('.html', ejs.__express);

  // http://localhost:3000/ instead of
  // http://locahost:3000 (no trailing slash)
  app.use(checkTrailingSlash);

  // EJS Views
  app.get('/', viewAllRentals);
  app.get('/rental/edit/:id', viewEditRental);
  app.get('/rental/delete/:id', viewDeleteRental);
  app.get('/rental/new', viewAddNewRental);

  // RESTful APIs
  app.get('/api/rentals', apiAllRentals);
  app.patch('/api/rental/:id', uploadStrategy, apiEditRental);
  app.delete('/api/rental/:id', apiDeleteRental);
  app.post('/api/rental', uploadStrategy, apiAddNewRental);

  // Configure error handling for routes
  app.use(on404Error);
  app.use(onRouteErrors);

  // Connect to Database
  await connectToDatabase();

  return app;
};
