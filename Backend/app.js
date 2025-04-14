var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* routers */

var indexRouter = require('./routes/index');
var firebaseRouter = require('./routes/firebaseRouter');
//var dbRouter = require('./routes/dbRouter');

/* routers */

var app = express();
const cors = require('cors');

app.use(cors());

app.use(logger('dev'));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* routers */

app.get('/', (req, res) => {
    res.send("Hello");
});

app.use('/', indexRouter);
app.use('/api/fireAuth', firebaseRouter);
//app.use('/api/user', dbRouter);

/* routers */

module.exports = app;
