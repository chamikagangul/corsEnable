var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetch = require('node-fetch');
const cors = require("cors");
const request = require('request');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(async function(err, req, res, next) {
    url = req.originalUrl.slice(1);
    console.log(url)


    // let r = await fetch(url);
    // let j = await r.json();
    // console.log(JSON.stringify(j));
    // res.send(j);

    // axios.get(url)
    // .then(function (response) {
    //   res.send(response.data);
    // });

    request({ url: url },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
        });

});

module.exports = app;