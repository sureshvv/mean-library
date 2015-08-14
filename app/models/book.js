/****************************************************
 *
 * MEAN-Library
 * Created by Mike Klein
 *
 * This is the book model contains the schema for a 
 * book.
 *
 * 8/12/2015
 ****************************************************/
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    author: String,
    title: String,
    rating: Number,
    likes: Number,
    reviewDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);