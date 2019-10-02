const dirName = require('./utils/path');
const db_url = require('./utils/db_url');
const path = require('path');

const express   = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const trackRoutes = require('./routes/track');

app.use(express.static(path.join(dirName, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Routes
app.use('/music', trackRoutes);

// Database and Server connection
mongoose
    .connect(
        db_url,
        {   useNewUrlParser: true,
            useUnifiedTopology: true }
    )
    .then(result => {
        console.log("Connected to DB, Running server on port 8000");
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    });


    const Product = require('./models/track');

    let p = new Product({
        _id: '123456',
        track_name: 'track_dummy',
        track_image: '../../dummy',
        track_location: '../../dummy',
        track_description: 'blah blah blah',
        track_tags: ['pop', 'rock', 'e;ectric'],
    })

    p.save();