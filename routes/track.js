const express = require('express');
const upload = require('../utils/music/store_track');

const trackController = require('../controllers/track');
const router = express.Router();

router.get('/fetch_tracks', trackController.getTracks);
router.get('/fetch_track_details', trackController.getTrackDetails);
router.get('/play_track', trackController.getPlayTrack);
router.post('/upload', upload, trackController.postUploadTrack);
router.post('/update', trackController.postEditTrack);
router.post('/remove_track', trackController.postDeleteTrack)

module.exports = router;
