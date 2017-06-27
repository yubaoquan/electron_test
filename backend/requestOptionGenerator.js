function initOptions({ url, encoding }) {
    const options = {
        hostname: '',
        port: 80,
        path: '/',
        method: 'GET',
        protocol: 'http:'
    };

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
    return options;
}

export default initOptions;
