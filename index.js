const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.use(express.urlencoded()); // this is to read through POST requests
app.use(cookieParser());
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assets/'));
app.use(expressLayouts);
//use express router
// set the view engine
app.set('view engine','ejs');
app.set('views','./views');

//extract styles and scripts from partials into layout header

app.set('layout extractStyles', true);
app.set('layout extractScripts',true);
app.use(session({
    name:'codial',
    // TODO - change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',require("./routes/"));

//start and listen to server
app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server: ${err}`);
    }

    console.log(`Server running on port: ${port}`);
});