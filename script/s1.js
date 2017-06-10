let initGetBaidu = require('./backend/logic').init;

function initMenu() {
    const {ipcRenderer} = require('electron');

    ipcRenderer.on('msg', (event, message) => {
        console.log(message);
    });

    initGetBaidu((bodyContent, links) => {
        document.body.innerHTML = bodyContent;
        let fragment = document.createDocumentFragment();
        links.forEach((link) => {
            document.body.appendChild(link);
            let p = document.createElement('p');
            p.appendChild(link);
            fragment.appendChild(p);
        });
        document.body.appendChild(fragment);
    });
}

initMenu();
