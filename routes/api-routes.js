const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

module.exports = (app, db) => {
    axios.get('https://www.pride.com/').then(site => {
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
                // console.log(article);
            }).catch(err => {
                console.log(err);
            });
        })
    });
    app.get('/api/articles/', (req, res) => {
        db.Article.find().sort({_id:-1}).populate('comments').then(articles => {
            let first24 = [];
            for (let i = 0; i < 24; i++) {
                first24.push(articles[i]);
            }
            res.json(first24);
        }).catch(err => console.log(err));
    });
    app.post('/api/articles/', (req, res) => {
        db.Comment.create({
            author: req.body.author,
            body: req.body.comment
        }).then(comment => {
            db.Article.update({
                _id: req.body._id,
            }, {
                $push: {
                    comments: comment._id
                }
            }, {new: true}).then(added => res.json(added)).catch(err => res.send(err));
        }).catch(err => console.log(err));
    })
    app.get('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '/../public/manifest.json')));
}