const path = require('path');

module.exports = (app, db) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/../public/index.html'));
    });
    if(process.env.NODE_ENV === 'production') {
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/../build/index.html'));
        });
    }
}