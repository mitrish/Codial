const User = require('../models/user');
module.exports.profile = function(req,res){
    return res.render("user_profile",{
        title: "Username"
    });
}

module.exports.signUp = function(req,res){
    return res.render("user_signup",{
        title: "Codial | Sign up"
    });
}

module.exports.signIn = function(req,res){
    return res.render("user_signin",{
        title: "Codial | Sign in"
    });
}

// get the signup data

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    } 
    
    User.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log('error in finding user in signup');
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error while creating user');
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('/users/sign-in');

        }
    });

}

// Sign in and create a session for the user
module.exports.createSession = function(req,res){
    // To - do
    return res.redirect('/');
}