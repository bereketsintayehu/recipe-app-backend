const fs = require('fs');
const express = require('express');
const tourController  = require('../controllers/tourController');
const authController  =  require('../controllers/authController');

let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const router = express.Router();

router.get('/top-five-tours',tourController.getTopTours,tourController.getAllTours)
router.get("/monthly-tours/:year",tourController.getMonthlyTour)
router.get("/tour-stat",tourController.getTourStatus)


router
.route('/')
.get(authController.protect, tourController.getAllTours)
.post(tourController.createTour);

 
router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);
  
module.exports = router; 