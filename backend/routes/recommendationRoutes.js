const express = require('express');
const router = express.Router();
const {
  getGenres,
  getPlatforms,
  getTags,
  getRecommendations
} = require('../controllers/recommendationController');

router.get('/genres', getGenres);
router.get('/platforms', getPlatforms);
router.get('/tags', getTags);
router.post('/recommend', getRecommendations);

module.exports = router;
