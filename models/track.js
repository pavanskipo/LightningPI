const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    track_name: {
        type: String,
        required: true
    },
    track_image: {
        type: String,
        required: true
    },
    track_location: {
        type: String,
        required: true
    },
    track_description: {
        type: String,
        required: false
    },
    track_tags: {
        type: [String],
        required: true
    },
    created_at: {
        type: { type: Date, default: Date.now }
    }

});

trackSchema.index({ 
    track_name: 'text', 
    track_description: 'text', 
    track_tags: 'text'
});


module.exports = mongoose.model('Track', trackSchema)