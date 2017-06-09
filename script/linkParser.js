function findBody(content) {
    return getHTMLContent(content).body;
}

function findLinks(content) {
    let html = getHTMLContent(content);
    getLinksFromBody(html.body);
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
        return STATUS.CONTENT;
    }

    while (body) {
        let result, left, content;
        switch (currentStatus) {
            case STATUS.INIT:
                result = body.match(/([\s\S]*?)<a [^>]*?>/);
                let uselessContent = result[1];
                console.info(uselessContent);
                body = body.slice(uselessContent.length);
                currentStatus = STATUS.LEFT;
                console.info('init end');
                break;
            case STATUS.LEFT:
                result = body.match(/(<a [^>]*?>)[\s\S]*/);
                if (!result) {
                    throw new Error('parse error: should find <a >');
                }
                left = result[1];
                console.info(left);
                body = body.slice(left.length);
                stack.unshift({
                    type: 'left',
                    value: left
                });
                currentStatus = getStatus(body);
                console.info('left end');
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
                }
                body = body.slice(content.length);
                stack.unshift({
                    type: 'content',
                    value: content
                });
                currentStatus = getStatus(body);
                console.info('content end');
                break;
            case STATUS.RIGHT:
                content = stack.shift();
                left = stack.shift();
                if (!content || !left) {
                    throw new Error('Stack is empty');
                }
                let linkHTML = `${left.value}${content.value}</a>`;
                let link = getLink(linkHTML);
                console.info(link);
                body = body.slice('</a>'.length);
                console.info('right end');
                break;
            default: throw new Error('Invalid status:' + currentStatus);
        }
    }
}

function getLink(html) {
    document.createDocumentFragment();
    let div = document.createElement('div');
    div.innerHTML = html;
    console.info(div.childNodes[0]);
    return 'building';
}

exports.findLinks = findLinks;
exports.findBody = findBody;
