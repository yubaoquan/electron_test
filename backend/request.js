import iconv from 'iconv-lite';
import https from 'https';
import http from 'http';

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
        let buffer = Buffer.alloc(0);
        res.on('data', (d) => {
            buffer = Buffer.concat([buffer, d]);
        });
        res.on('end', () => {
            const decoded = iconv.decode(buffer, options.encoding);
            hook && hook(decoded);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

exports.init = init;
