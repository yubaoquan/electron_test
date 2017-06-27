const parser = require('./linkParser');
const { findLinks, findBody } = parser;
const request = require('./request');

const options = {
    hostname: 'news.baidu.com',
    port: 80,
    path: '/',
    method: 'GET',
    protocol: 'http:'
};

function initOptions({ url, encoding }) {
    if (!url) {
        throw new Error('No url');
    }
    const lowURL = url.toLowerCase();
    if (!/^https?:\/\//i.test(url)) {
        url = `http://${url}`;
    }
    const reg = /^http(s)?:\/\/([^\/]+)(\/.*)?/i;
    const match = url.match(reg);
    if (lowURL.indexOf('https') === 0) {
        options.protocol = 'https:';
        options.port = 443;
    } else {
        options.protocol = 'http:';
        options.port = 80;
    }
    options.hostname = match[2];
    options.path = match[3] || '/';
    options.encoding = encoding;
    parser.setConfig(options);
}


function showLink(link) {
    console.info(link);
    console.info(link.href);
    console.info(link.innerHTML);
}

module.exports.init = function({ url, encoding = 'utf8' }, cb) {
    initOptions({
        url,
        encoding
    });
    request.init(options, (received) => {
        let links = [];
        try {
            links = findLinks(received);
        } catch (e) {
            console.error(e);
            links = [];
        }
        const bodyContent = findBody(received);
        cb && cb(bodyContent, links);
        links && links.length && showLink(links[0]);
    });
};
