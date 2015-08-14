/****************************************************
 *
 * MEAN-Library
 * Created by Mike Klein
 *
 * This is the route file for all the data apis.
 * 
 *
 * 8/12/2015
 ****************************************************/
var User = require('../models/user');
var config = require('../../config');

var secretKey = config.secretKey;

module.exports = function(app, express) {
    //create a new express router
    var api = express.Router();

    //SignUp API
    api.post('/signup', function(req, res) {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        //now save the user to the database
        user.save(function(err) {
            if(err) {
                res.send(err);
                return;
            }
            res.json({ message: 'User has been created'});
        });
    });
    //get users
    api.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            //if err return the error with 
            if(err) {
                res.send(err);
                return
            }
            //return all the users
            res.json(users);
        });
    })

    return api
}

