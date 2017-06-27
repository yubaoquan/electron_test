const parser = require('./linkParser');
const { findLinks, findBody } = parser;
const request = require('./request');
import initOptions from './requestOptionGenerator';

function showLink(link) {
    console.info(link);
    console.info(link.href);
    console.info(link.innerHTML);
}

module.exports.init = function({ url, encoding = 'utf8' }, cb) {
    const options = initOptions({
        url,
        encoding
    });
    parser.setConfig(options);
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
