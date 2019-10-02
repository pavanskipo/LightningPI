const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('public', 'music'));
     },
    filename: function (req, file, cb) {
        let fileName = req.body.track_id + '_' + req.body.track_name + '.mp3'
        cb(null , fileName);
    }
});

module.exports = multer({ storage: storage }).single('track_file'); 
