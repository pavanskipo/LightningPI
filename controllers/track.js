const Track = require('../models/track');
const current_path = require('../utils/path');

const path = require('path');

exports.getPlayTrack = async (req, res, next) => {
    const id = req.query.track_id;
    let responseJson = {
        status: 0,
        result: {}
    };
    if(id){
        await Track.findById(id)
                .then(track => {
                    responseJson.status = 1;
                    responseJson.result['track_id'] = track['_id'];
                    responseJson.result['track_name'] = track['track_name'];
                    responseJson.result['track_location'] = track['track_location'];
                })
                .catch(err => {
                    responseJson.result = 'Error while fetching track details';
                    console.log(err);
                });
    } else {
        responseJson.result = 'Id is missing from query params';
    }
    res.json(responseJson);
}

exports.getTrackDetails = async (req, res, next) => {
    const id = req.query.track_id;
    let responseJson = {
        status: 0,
        result: {}
    };
    if(id){
        await Track.findById(id)
                .then(track => {
                    responseJson.status = 1;
                    responseJson.result['track_id'] = track['_id'];
                    responseJson.result['track_name'] = track['track_name'];
                    responseJson.result['track_image'] = track['track_image'];
                    responseJson.result['track_location'] = track['track_location'];
                    responseJson.result['track_description'] = track['track_description'];
                    responseJson.result['track_tags'] = track['track_tags'];
                    responseJson.result['created_at'] = track['created_at'];
                })
                .catch(err => {
                    responseJson.result = 'Error while fetching track details';
                    console.log(err);
                });
    } else {
        responseJson.result = 'Id is missing from query params';
    }
    res.json(responseJson);
}

exports.getTracks = async (req, res, next) => {
    const tag = req.query.tag;
    let responseJson = {
        status: 0,
        result: []
    };
    let searchKey = null;
    if(tag){
        searchKey = {track_tags: tag}
    }
    await Track.find(searchKey)
            .then(tracks => {
                responseJson.status = 1;
                tracks.forEach(data => {
                    responseJson.result.push({
                        track_id: data['_id'],
                        track_name: data['track_name'],
                        track_image: data['track_image']
                    });
                });
            })
            .catch(err => {
                responseJson.result = 'Error while fetching track details';
                console.log(err);
            });
    res.json(responseJson);
}

exports.postUploadTrack = async (req, res, next) => {
    let responseJson = {
        status: 0,
        result: []
    };
    console.log(req)
    // let filePath = path.resolve(req.body.track_id, '_', req.body.track_name);
    // req.filePath = path.resolve(current_path, 'public', 'music');
    // let payload = {
    //     // _id: req.body.track_id,
    //     track_name: req.body.track_name,
    //     track_image: path.resolve(current_path, filePath, '.jpg'),
    //     track_location: path.resolve(current_path, filePath, '.mp3'),
    //     track_description: req.body.track_description,
    //     track_tags: req.body.track_tags,
    // }
    // console.log(payload);


    
}