const path = require('path');

module.exports = (app, db) => {
    app.get('/', (req, res) => {
        res.sendFile('../../views/html/index.html');
    });
}