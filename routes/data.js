const express = require('express');
const {
	getLongestDurationMovies,
	addNewMovie,
	getTopRatedMovies,
} = require('../controllers/data');
getLongestDurationMovies;
const router = express.Router();

router.route('/longest-duration-movies').get(getLongestDurationMovies);
router.route('/new-movie').post(addNewMovie);
router.route('/top-rated-movies').get(getTopRatedMovies);

module.exports = router;
