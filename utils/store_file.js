const multer = require('multer');
const path = require('path');

let fileUploadPath = '';

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // let filePath = req.body.filePath;
        console.log("uploading" + fileUploadPath);
        cb(null, path.resolve(fileUploadPath));
     },
    filename: function (req, file, cb) {
        let fileName = req.body.track_id + '_' + req.body.track_name + '.mp3'
        cb(null , fileName);
    }
});

module.exports = function(uploadPath){
    fileUploadPath = uploadPath;
    return multer({ storage: storage }).single('track_file'); 
}
