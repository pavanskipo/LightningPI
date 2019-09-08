const dirName = require('./utils/path');
const path = require('path');

const express   = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(dirName, 'public')));




app.listen(8000);