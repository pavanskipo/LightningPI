const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    movie_name: {
        type: String,
        required: true
    },
    movie_image: {
        type: String,
        required: true
    },
    movie_location: {
        type: String,
        required: true
    },
    movie_plot: {
        type: String,
        required: false
    },
    movie_tags: {
        type: [String],
        required: true
    },
    created_at: {
        type: { type: Date, default: Date.now }
    }

});

movieSchema.index({ 
    movie_name: 'text', 
    movie_plot: 'text', 
    movie_tags: 'text'
});


module.exports = mongoose.model('movie', movieSchema)