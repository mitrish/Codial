const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require("./routes/"));
// set the view engine
app.set('view engine','ejs');
app.set('views','./views');


//start and listen to server
app.listen(port, function(err){
    if(err){
        console.log(`Error while running the server: ${err}`);
    }

    console.log(`Server running on port: ${port}`);
});