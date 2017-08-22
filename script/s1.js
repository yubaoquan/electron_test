const Vue = require('vue');
const VueRouter = require('vue-router');
const template = require('./s1.html');
const { ipcRenderer } = require('electron');
import { remote } from 'electron';

import MainComponent from 'vueDir/main.vue';
import Saying from 'vueDir/saying.vue';
import resetStyle from '../stylesheet/reset.css';
import style from './s1.less';

Vue.use(VueRouter);

const App = Vue.extend({
    template: template,
    data() {
        return {};
    },
    created: function() {
        console.info('created');
        createContextMenu();
        ipcRenderer.on('forward', window.history.forward);
        ipcRenderer.on('back', window.history.back);
    },
    methods: {
        go2SecondPage() {
            console.info('go to second page');
            ipcRenderer.send('jump', 'index2.html');
        }
    }
});

new App({
    el: '#page',
    router: new VueRouter({
        routes: [{
            path: '/main',
            component: MainComponent
        }, {
            path: '/saying',
            component: Saying
        }]
    })
});

function createContextMenu() {
    const { Menu, MenuItem } = remote;
    let rightClickPosition = null;

    const menu = new Menu();
    const menuItem = new MenuItem({
        label: 'Inspect Element',
        click: () => {
            remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y);
        },
    });

    const disabledMenuItem = new MenuItem({
        label: 'Rename',
        click: () => {
            console.info('Rename the folder');
        },
        enabled: false,
    });

    menu.append(menuItem);
    menu.append(disabledMenuItem);

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        menu.items[1].enabled = e.target.id !== 'link-1';
        rightClickPosition = { x: e.x, y: e.y };
        menu.popup(remote.getCurrentWindow());
    }, false);
}
