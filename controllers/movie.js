const Movie = require('../models/movie');

const image_upload = require('../utils/movie/image_download');
const path = require('path');

exports.getPlayMovie = async (req, res, next) => {
    const movieId = req.query.movie_id;
    let responseJson = {
        status: 0,
        result: {}
    };
    if(movieId){
        await Movie.findById(movieId)
                .then(movie => {
                    responseJson.status = 1;
                    responseJson.result['movie_id'] = movie['_id'];
                    responseJson.result['movie_name'] = movie['movie_name'];
                    responseJson.result['movie_location'] = movie['movie_location'];
                })
                .catch(err => {
                    responseJson.result = 'Error while fetching movie details';
                    console.log(err);
                });
    } else {
        responseJson.result = 'Id is missing from query params';
    }
    res.json(responseJson);
}

exports.getMovieDetails = async (req, res, next) => {
    const movieId = req.query.movie_id;
    let responseJson = {
        status: 0,
        result: {}
    };
    if(movieId){
        await Movie.findById(movieId)
                .then(movie => {
                    responseJson.status = 1;
                    responseJson.result['movie_id'] = movie['_id'];
                    responseJson.result['movie_name'] = movie['movie_name'];
                    responseJson.result['movie_image'] = movie['movie_image'];
                    responseJson.result['movie_location'] = movie['movie_location'];
                    responseJson.result['movie_plot'] = movie['movie_plot'];
                    responseJson.result['movie_tags'] = movie['movie_tags'];
                    responseJson.result['created_at'] = movie['created_at'];
                })
                .catch(err => {
                    responseJson.result = 'Error while fetching movie details';
                    console.log(err);
                });
    } else {
        responseJson.result = 'Id is missing from query params';
    }
    res.json(responseJson);
}

exports.getMovies = async (req, res, next) => {
    const tag = req.query.tag;
    const searchPhrase = req.query.search_phrase;
    let responseJson = {
        status: 0,
        result: []
    };
    let searchKey = {};
    if(tag) {
        searchKey = {movie_tags: tag}
    }
    else if(searchPhrase) {
        searchKey = {$text: { $search : searchPhrase}}
    }
    await Movie.find(searchKey)
            .sort({created_at: -1})
            .then(movies => {
                responseJson.status = 1;
                movies.forEach(data => {
                    responseJson.result.push({
                        movie_id: data['_id'],
                        movie_name: data['movie_name'],
                        movie_image: data['movie_image']
                    });
                });
            })
            .catch(err => {
                responseJson.result = 'Error while fetching movie details';
                console.log(err);
            });
    res.json(responseJson);
}

exports.postUploadMovie = async (req, res, next) => {
    let responseJson = {
        status: 0,
        result: []
    };
    let fileName = req.body.movie_id + '_' + req.body.movie_name;
    let payload = {
        _id: req.body.movie_id,
        movie_name: req.body.movie_name,
        movie_image: path.join('movie_images', fileName + '.jpg'),
        movie_location: path.join('movies', fileName + '.mp4'),
        movie_plot: req.body.movie_plot,
        movie_tags: req.body.movie_tags.split(',').map(item => item.trim()),
    }
    const movie = new Movie(payload);
    try {
        await movie.save()
        image_upload(req.body.movie_image, fileName)
        responseJson.status = 1
        responseJson.result = 'New Movie Added!';
        res.json(responseJson);
    } catch(err) {
        console.log(err);
        responseJson.result = 'Error while uploading a new Movie';
        res.json(responseJson);
    };
}

exports.postEditMovie = async (req, res, next) => {
    let responseJson = {
        status: 0,
        result: []
    };
    // changesArray(0/1) = [movie_name, movie_image, movie_plot, movie_tags];
    let changesArrayMapping = {
        0: 'movie_name',
        1: 'movie_image',
        2: 'movie_plot',
        3: 'movie_tags'
    }
    let changesArray = req.body.changes_array.split(',');
    Movie.findById(req.body.movie_id)
    .then(movie => {
        let current_name = movie.movie_name
        changesArray.forEach((state, index) => {
            if(+state === 1) {
                if(index === 1){
                    image_upload(req.body.movie_image,
                        movie._id + '_' + req.body.movie_name,
                        movie._id + '_' + current_name + '.jpg');
                    movie.movie_image = path.join('movie_images', movie._id + '_' + req.body.movie_name + '.jpg')
                } else {
                    movie[changesArrayMapping[index]] = req.body[changesArrayMapping[index]]
                }
            }
        });
        return movie.save().then(result => {
            responseJson.status = 1;
            responseJson.result = 'Movie has been updated!';
            res.json(responseJson);
        });
    })
    .catch(err => {
        console.log(err);
        responseJson.result = 'Error while updating Movie';
        res.json(responseJson);
    });
}

exports.postDeleteMovie = async (req, res, next) => {
    const movieId = req.query.productId;
    let responseJson = {
        status: 0,
        result: []
    };
    Movie.findByIdAndRemove(movieId)
    .then(() => {
        responseJson.status = 1;
        responseJson.result = 'Movie has been deleted!';
        res.json(responseJson);
    })
    .catch(err => {
        console.log(err);
        responseJson.result = 'Error while deleting Movie';
        res.json(responseJson);
    });
}