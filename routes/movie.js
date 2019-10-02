const express = require('express');
const upload = require('../utils/movie/store_movie');

const movieController = require('../controllers/movie');
const router = express.Router();

router.get('/fetch_movies', movieController.getMovies);
router.get('/fetch_movie_details', movieController.getMovieDetails);
router.get('/play_movie', movieController.getPlayMovie);
router.post('/upload', upload, movieController.postUploadMovie);
router.post('/update', movieController.postEditMovie);
router.post('/remove_movie', movieController.postDeleteMovie)

module.exports = router;
