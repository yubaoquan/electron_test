let parser = require('./linkParser');
let {findLinks, findBody} = parser;
let request = require('./request');

const options = {
    // hostname: 'www.baidu.com',
    // port: 443,
    hostname: 'news.baidu.com',
    port: 80,
    path: '/',
    method: 'GET',
    protocol: 'http:'
};

parser.setConfig(options);


function showLink(link) {
    console.info(link);
    console.info(link.href);
    console.info(link.innerHTML);

}
module.exports.init = function(cb) {
    request.init(options, (received) => {
        let links = [];
        try {
            links = findLinks(received);
        } catch (e) {
            console.error(e);
        }
        let bodyContent = findBody(received);
        cb && cb(bodyContent, links);
        showLink(links[0]);
    });
};
