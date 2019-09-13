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

passport.setAuthenticatedUser = function(req,res,next){
    
    if(req.isAuthenticated()){
    // req.user contains the current signed in user from the session cookie 
    // res.locals.user takes the data for the view 
        res.locals.user = req.user;
    }
    next();
}

// hCheck if user is authenticated
passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated()){
        // if user is signed in, then pass the request to "next" function (which is controllers action)
        return next();
    }
    // if user is not authenticated
    return res.redirect('/users/sign-in');
}


module.exports = passport;