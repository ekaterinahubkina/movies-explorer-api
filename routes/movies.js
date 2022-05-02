const router = require('express').Router();
const { createFilm, getMovies, deleteMovie } = require('../controllers/movies');
const { movie, movieId } = require('../middlewares/validation');

router.post('/', movie, createFilm);
router.get('/', getMovies);
router.delete('/:movieId', movieId, deleteMovie);

module.exports = router;
