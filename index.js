const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: true
});
const async = require('async');
const URL = "https://techmaster.vn/posts/"

const cron = require('node-cron');

var realArr = [];
nightmare
    .goto(URL)
    .type('#search','nodejs') // dien du lieu vao o search
    .wait(1000)
    .type('#search', "\u000d") // nhan enter
    .wait(4000)
    .evaluate(() => {
        let news = document.querySelectorAll('.card-title a p');
        let titles = [];
        news.forEach(article => {
            titles.push(article.innerText.trim());
        })
        return titles;
    })
    .end()
    .then(titles => {
       realArr.push(titles);
       cron.schedule('55 * * * * *',() =>{
            let night = new Nightmare();
            night.authentication('vuongquangtuyendz@gmail.com','@gmail.com')
                .goto('https://mail.google.com/mail/u/0/#inbox')
                .click('.T-I')
       })

    })
    .catch(error => {
        console.log(error.message);
    })



