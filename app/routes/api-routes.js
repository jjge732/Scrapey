const axios = require('axios');
const $ = require('cheerio');
module.exports = (app, db) => {
    app.get('/scrape/', (req, res) => axios.get('https://www.pride.com/').then(site => {
        console.log(data.site);
        // db.Article.create()
        res.send('scraped');
    }));
}