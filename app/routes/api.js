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
var Book = require('../models/book');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;

//token creation function
function createToken(user) {
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username
    }, secretKey, {
        expiresInMinutes: 1440
    });

    return token;
}

module.exports = function(app, express, io) {
    //create a new express router
    var api = express.Router();

    /****************************************************
     * UnAuthenticated Routes
     ****************************************************/
    //Route for getting all books That anyone can see
    api.get('/all_books', function(req, res){
        Book.find({}, function(err, books) {
            if(err) {
                res.send(err);
                return;
            }
            res.json(books);
        }).populate('creator');
    });

    //SignUp API
    api.post('/signup', function(req, res) {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        var token = createToken(user);
        //now save the user to the database
        user.save(function(err) {
            if(err) {
                res.send(err);
                return;
            }
            res.json({ 
                        success: true,
                        message: 'User has been created',
                        token: token
                    });
        });
    });

    //token based login route
    api.post('/login', function(req, res) {
        //Find the user trying to login
        User.findOne({ 
            username: req.body.username
        }).select('name username password').exec(function(err, user) {
            //if there is an error throw it
            if(err) throw err;
            //if this user doesn't exist send resposne that user doesn't exist
            if(!user) {
                res.send({ message: "User doenst exist"});
            } else if(user){ 
                //Use the compare password function
                var validPassword = user.comparePassword(req.body.password);
                //If the password is not valid return invalid response
                if(!validPassword) {
                    res.send({ message: "Invalid Password"});
                } else {
                    //Create New token
                    var token = createToken(user);

                    res.json({
                        success: true,
                        message: "Successfuly login!",
                        token: token
                    });
                }
            }
        });
    });
    /****************************************************
     * Authentication Middleware
     ****************************************************/
    //Authentication Middleware
    api.use(function(req, res, next) {
        console.log("Somebody just logged in.");

        //Get the token from either the body of the response, the param, or x-access(using for postman)
        var token = req.body.token || req.param.token|| req.headers['x-access-token'];
        //Check if token exists
        if(token){
            jsonwebtoken.verify(token, secretKey, function(err, decoded) {
                if(err) {
                    res.status(403).send({ success: false, message: 'Failed to authenticate user' });
                } else {
                    req.decoded = decoded;

                    next();
                }
            });
        } else {
            res.status(403).send({ success: false, message: 'No token provided.'});
        } 
    });
    /****************************************************
     * Authenticated Routes
     ****************************************************/
    //Main Book Routes
    api.route('/')
    //Post Route to create a new book
       .post(function(req, res){
            var book = new Book({
                creator: req.decoded.id,
                content: req.body.content,
                author: req.body.author,
                title: req.body.title,
                rating: req.body.rating
            });
            book.save(function(err, newBook) {
                if(err) {
                    res.send(err);
                    return;
                }
                io.emit('book', newBook);
                res.json({ message: 'New Story Created.'});
            })
       })
       //Get route to get all the users current books
       .get(function(req, res) {
            Book.find({ creator: req.decoded.id }, function(err, books) {
                if(err) {
                    res.send(err);
                    return;
                }
                res.json(books);
            });
       });
       //get the decoded user data for the front end
       api.get('/me', function(req, res) {
        res.json(req.decoded);
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
        });

    return api
}

