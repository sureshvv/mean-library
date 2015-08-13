/****************************************************
 *
 * MEAN-Library
 * Created by Mike Klein
 *
 * This is the user model contains the schema for a 
 * user.
 *
 * 8/12/2015
 ****************************************************/
var mongoose = require('mongoose');

var Schema = require('mongoose.Schema');

var UserSchema = new Schema({
    name: String,
    username:  { type: String, required: true, index: { unique: true }},
    password:  { type: String, required: true, select: false },
});

module.exports = mongoose.model('User', UserSchema);