// import iconv from 'iconv-lite';
const iconv = require('iconv-lite');
//
const https = require('https');
const http = require('http');

let client;

function initClient(options) {
    switch (options.protocol) {
        case 'http:':
            client = http;
            break;
        case 'https:':
            client = https;
            break;
        default:
            throw new Error('Invalid protocol:' + options.protocol);
    }
}

function init(options, hook) {
    initClient(options);

    const req = client.request(options, (res) => {
        let received = '';
        res.on('data', (d) => {
            received += d;
        });
        res.on('end', () => {
            // console.info(received);
            const decoded = iconv.decode(Buffer.from(received), 'gb2312');
            console.info('decoded gb2312---->', decoded);
            hook && hook(received);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

exports.init = init;
