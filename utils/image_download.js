const fs = require('fs');
const request = require('request');
const path = require('path');
const current_path = require('../utils/path');

module.exports = download = (uri, filename, existingFile) => {
    if(existingFile){
        let removeFileLink = path.resolve(current_path, 'public', 'music_images', existingFile);
        console.log(removeFileLink);
        fs.unlinkSync(removeFileLink);
    }
    request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(
        path.resolve(current_path, 'public', 'music_images', filename + '.jpg')))
        .on('close', function(){
            return 'done';
        });
    });
};