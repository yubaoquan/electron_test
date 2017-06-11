let parser = require('./linkParser');
let {findLinks, findBody} = parser;
let request = require('./request');

let options = {
    hostname: 'news.baidu.com',
    port: 80,
    path: '/',
    method: 'GET',
    protocol: 'http:'
};

function initOptions(url) {
    if (!url) {
        throw new Error('No url');
    }
    let lowURL = url.toLowerCase();
    if (!/^https?:\/\//i.test(url)) {
        throw new Error('URL must starts with http:// or https://');
    }
    let reg = /^http(s)?:\/\/([^\/]+)(\/.*)?/i;
    let match = url.match(reg);
    if (lowURL.indexOf('https') === 0) {
        options.protocol = 'https:';
        options.port = 443;
    } else {
        options.protocol = 'http:';
        options.port = 80;
    }
    options.hostname = match[2];
    options.path = match[3] || '/';
    parser.setConfig(options);
}


function showLink(link) {
    console.info(link);
    console.info(link.href);
    console.info(link.innerHTML);

}
module.exports.init = function(url, cb) {
    initOptions(url);
    request.init(options, (received) => {
        let links = [];
        try {
            links = findLinks(received);
        } catch (e) {
            console.error(e);
            links = [];
        }
        let bodyContent = findBody(received);
        cb && cb(bodyContent, links);
        links && links.length && showLink(links[0]);
    });
};
