let links = [];
let config;

function setConfig(_config = {}) {
    config = _config;
}

function findBody(content) {
    return getHTMLContent(content).body;
}

function findLinks(content) {
    let html = getHTMLContent(content);
    getLinksFromBody(html.body);
    return links;
}

function getHTMLContent(html) {
    let contentReg = /<head>([\s\S]*)<\/head>([\s\n]*)<body[^>]*>([\s\S]*)<\/body>/i;
    let matchResult = html.match(contentReg);
    return {
        head: matchResult[1],
        body: matchResult[3]
    };
}

function getLinksFromBody(body) {
    let stack = [];
    const STATUS = {
        INIT: 0,
        LEFT: 1,
        CONTENT: 2,
        RIGHT: 3
    };
    let currentStatus = STATUS.INIT;

    function getStatus(body) {
        if (body.indexOf('<a ') === 0) {
            return STATUS.LEFT;
        }
        if (body.indexOf('</a>') === 0) {
            return STATUS.RIGHT;
        }
        if (currentStatus === STATUS.LEFT) {
            return STATUS.CONTENT;
        }
        return STATUS.INIT;
    }

    while (body) {
        let result, left, content;
        switch (currentStatus) {
            case STATUS.INIT:
                result = body.match(/([\s\S]*?)<a [^>]*?>/);

                let uselessContent;
                if (!result) {
                    uselessContent = body;
                } else {
                    uselessContent = result[1];
                }
                body = body.slice(uselessContent.length);
                currentStatus = STATUS.LEFT;
                break;
            case STATUS.LEFT:
                result = body.match(/(<a [^>]*?>)[\s\S]*/);
                if (!result) {
                    throw new Error('parse error: should find <a >');
                }
                left = result[1];
                body = body.slice(left.length);
                stack.unshift({
                    type: 'left',
                    value: left
                });
                currentStatus = getStatus(body);
                break;
            case STATUS.CONTENT:
                result = body.match(/([\s\S]+?)((<a )|(<\/a>))/);
                if (!result) {
                    console.info(body);
                    console.info(stack);
                    throw new Error('parse error: should find content');
                }
                content = result[1];
                if (!content) {
                    console.info(result);
                    throw new Error('Should find conent');
                }
                body = body.slice(content.length);
                stack.unshift({
                    type: 'content',
                    value: content
                });
                currentStatus = getStatus(body);
                break;
            case STATUS.RIGHT:
                content = stack.shift();
                left = stack.shift();
                if (!content || !left) {
                    throw new Error('Stack is empty');
                }
                let linkHTML = `${left.value}${content.value}</a>`;
                saveLink(linkHTML);
                body = body.slice('</a>'.length);
                currentStatus = getStatus(body);
                break;
            default: throw new Error('Invalid status:' + currentStatus);
        }
    }
}

function makeLinkNode(html) {
    document.createDocumentFragment();
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.childNodes[0];
}

function saveLink(html) {
    let linkNode = makeLinkNode(html);
    linkNode.href = getAbsoluteURL(linkNode.href);
    links.push(linkNode);
}

function getAbsoluteURL(href) {
    let {hostname, protocol} = config;
    if (href.indexOf('file://' + hostname + '/') === 0) {
        return href.replace(/^file:/, protocol);
    }
    return href.replace(/^file:\/\//, `${protocol}//${hostname}`);
}

module.exports = {
    findLinks,
    findBody,
    setConfig
};
