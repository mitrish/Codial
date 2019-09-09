const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'error connecting to mongoDB'));

db.once('open', function(){
    console.log('Databse connection sucesfull !');
});

module.exports = db;