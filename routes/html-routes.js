const path = require('path');

module.exports = (app, db) => {
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '/react-folder/public/index.html'));
    // });
    // if(process.env.NODE_ENV === 'production') {
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/react-folder/build/index.html'));
        });
    // }
}