/****************************************************
 *
 * MEAN-Library
 * Created by Mike Klein
 *
 * This is the main server file for the application
 *
 * 8/12/2015
 ****************************************************/

//Application dependancies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');

//Create new instance of express object
var app = express();

//Add in middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Routes
app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
})

//Start the server
app.listen(config.port, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log('Listening on port ' + config.port);
    }
});