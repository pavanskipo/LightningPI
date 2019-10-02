const express = require('express');
const upload = require('../utils/store_track');

const trackController = require('../controllers/track');
const router = express.Router();

router.post('/upload', upload, trackController.postUploadTrack);
router.post('/update', trackController.postEditTrack);
router.get('/fetch_tracks', trackController.getTracks);
router.get('/fetch_track_details', trackController.getTrackDetails);
router.get('/play_track', trackController.getPlayTrack);
router.get('/delete_track', trackController.postDeleteTrack)

module.exports = router;
