// Load required packages
var passport        = require('passport');
var passportJWT     = require("passport-jwt");
var BasicStrategy   = require('passport-http').BasicStrategy;
var JwtStrategy     = require('passport-jwt').Strategy;
var User            = require('../models/user');
var ExtractJwt      = passportJWT.ExtractJwt;
var Strategy        = passportJWT.Strategy;



passport.use('basic', new BasicStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { console.log("1");return callback(err); }

      // No user found with that username
      if (!user) { console.log("2");return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { console.log("3");return callback(err); }

        // Password did not match
        if (!isMatch) { console.log("4");return callback(null, false); }

        // Success
        console.log("5");
        return callback(null, user);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });