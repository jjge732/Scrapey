const axios = require('axios');
const cheerio = require('cheerio');
module.exports = (app, db) => {
    app.get('/api/articles/', (req, res) => {
        db.Article.find().then(articles => {
            res.json(articles);
        }).catch(err => console.log(err));
    });
    app.get('*', (req, res) => axios.get('https://www.pride.com/').then(site => {
        const $ = cheerio.load(site.data);
        $('.panel').each(function() {
            let url = $(this).find('.panel-body a').attr('href')
            // ensures uniformity of urls
            if ($(this).find('.panel-body a').attr('href').split('/')[0] !== 'https:') {
                url = 'https://www.pride.com' + url;
            }
            db.Article.create({
                headline: $(this).find('.title').text(),
                genre: $(this).find('.imgText a').text(),
                url: url,
                imageUrl: $(this).find('source').attr('srcset').split(' ')[0]
            }).then(article => {
                console.log(article);
            }).catch(err => {
                console.log(err);
            });
        })
        res.json('scraped');
    }));
}