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
            console.info(received);
            hook && hook(received);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

exports.init = init;
