const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, '/react-folder/public')));
// if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/react-folder/build')));
// }

require('./routes/html-routes.js')(app, db);
require('./routes/api-routes.js')(app, db);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/news_db", { useNewUrlParser: true });
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
