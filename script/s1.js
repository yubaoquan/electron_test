const Vue = require('vue');
const VueRouter = require('vue-router');
const template = require('./s1.html');
const { ipcRenderer } = require('electron');

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
