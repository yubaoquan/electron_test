import { app, Menu, ipcMain } from 'electron';

function initTemplate(win) {
    const template = [{
        label: 'Edit',
        submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
            { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
        ]
    }, {
        label: 'View',
        submenu: [
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' },
            { type: 'separator' },
            {
                label: 'Forward',
                accelerator: 'CmdOrCtrl+]',
                click() {
                    win.webContents.send('forward');
                }
            },
            {
                label: 'Back',
                accelerator: 'CmdOrCtrl+[',
                click() {
                    win.webContents.send('back');
                }
            },
        ]
    }, {
        label: 'Operation',
        submenu: [{
            label: 'Reload',
            accelerator: 'Cmd+R',
            click: reloadProject
        }, {
            label: 'test',
            click() {
                console.info('This triggers in main process');
                win.webContents.send('msg', 123);
            }
        }]
    }];

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        });
    }
    return Menu.buildFromTemplate(template);
}

function reloadProject() {
    require('./reload').reload();
    process.exit(0);
}

exports.init = function(win) {
    const menu = initTemplate(win);
    Menu.setApplicationMenu(menu);
};
