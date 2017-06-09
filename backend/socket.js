const https = require('https');

function init(hook) {
    const options = {
        hostname: 'www.baidu.com',
        port: 443,
        path: '/',
        method: 'GET'
    };
    let received = '';
    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            received += d;

        });
        res.on('end', () => {
            hook && hook(received);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

exports.init = init;
