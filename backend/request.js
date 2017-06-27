import iconv from 'iconv-lite';
import https from 'https';
import http from 'http';
import initOptions from './requestOptionGenerator';

let client;

function initClient(options) {
    const protocol = options.protocol || 'http:';
    switch (protocol) {
        case 'http:':
            client = http;
            break;
        case 'https:':
            client = https;
            break;
        default:
            throw new Error('Invalid protocol:' + protocol);
    }
}

function init(options, hook) {
    console.info(options);
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

function simpleInit(options, hook) {
    return init(initOptions(options), hook);
}

export { init, simpleInit };
