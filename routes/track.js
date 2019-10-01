const express = require('express');
const upload = require('../utils/store_file');

const trackController = require('../controllers/track');
const router = express.Router();

router.post('/upload', upload, trackController.postUploadTrack);
router.post('/update', );
router.get('/fetch_tracks', trackController.getTracks);
router.get('/fetch_track_details', trackController.getTrackDetails);
router.get('/play_track', trackController.getPlayTrack);

module.exports = router;
