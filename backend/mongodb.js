const mongoose = require('mongoose');

let mongoDB = 'mongodb://127.0.0.1:27017/booksite';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));