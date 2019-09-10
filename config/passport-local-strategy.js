const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");

// Authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email'},

    function(email,password, done){
        // find a user and establish identity
        User.findOne({email:email}, function(err,user){
            if(err){console.log('error in finding user --> Passport');
            return done(err);
        }

        if(!user || user.password != password){
            console.log("Invalid username or password");
            return done(null,false);
        }

        return done(null,user);
        });
    }

));

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){console.log('Error in finding user'); return done(err)}
        return done(null,user);
    });
});


module.exports = passport;