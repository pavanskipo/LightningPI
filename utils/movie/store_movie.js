const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('public', 'movies'));
     },
    filename: function (req, file, cb) {
        let fileName = req.body.movie_id + '_' + req.body.movie_name + '.mp4'
        cb(null , fileName);
    }
});

module.exports = multer({ storage: storage }).single('movie_file'); 
