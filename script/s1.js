let initGetBaidu = require('./backend/socket').init;
let {findLinks, findBody} = require('./script/linkParser');

function initMenu() {
    const {ipcRenderer} = require('electron');

    ipcRenderer.on('msg', (event, message) => {
        console.log(message);
    });

    initGetBaidu((content) => {
        let bodyContent = findBody(content);
        // console.info(bodyContent);
        document.querySelector('#abc').textContent = bodyContent;
        findLinks(content);
        // console.info(html);
        // if (!html.head || !html.body) {
        //     return;
        // }
        // // console.info(html);
        // document.head.innerHTML = html.head;
        // document.body.innerHTML = html.body;
    });
}

initMenu();
