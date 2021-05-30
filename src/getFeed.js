let Parser = require('rss-parser');
let parser = new Parser();

function getFeed() {
    let feed = parser.parseURL('https://www.reddit.com/.rss');
    console.log(feed.title);

    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
    });
}

export { getFeed };