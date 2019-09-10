const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render("user_profile",{
                    title:"Username",
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
        
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

    // find user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in sign in');
             return;
        }
    
    // handle user found

    if(user){
        // handle mismatching password 
        if(user.password != req.body.password){
            res.redirect('back');
        }
    // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    }else{
    // handle user not found
        return res.redirect('back');
    }
    });
      

}

//Sign out
module.exports.SignOut = function(req,res){
    // res.cookies.set('testtoken', {expires:Date.now()});   
    res.clearCookie("user_id"); 
    return res.redirect('/users/sign-in');
}