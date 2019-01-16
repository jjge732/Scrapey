const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/app/public')));

require('./routes/html-routes.js')(app, db);
require('./routes/api-routes.js')(app, db);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/news_db", { useNewUrlParser: true });
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
