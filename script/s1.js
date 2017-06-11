const Vue = require('vue');
const VueRouter = require('vue-router');
const template = require('./s1.html');
const {ipcRenderer} = require('electron');
let initGetBaidu = require('../backend/logic').init;

Vue.use(VueRouter);

const App = Vue.extend({
    template: template,
    data: function() {
        return {
            content: '',
            url: '',
            links: [],
            debug: false,
        };
    },
    created: function() {
        ipcRenderer.on('msg', (event, message) => {
            console.log(message);
        });
    },
    methods: {
        search() {
            if (!this.url) {
                return alert('Please write down the url first!');
            }
            try {
                initGetBaidu(this.url, (bodyContent, links) => {
                    this.content = bodyContent;
                    this.links = links;
                    console.info(links[0]);
                });
            } catch (e) {
                alert('Fetch fail, maybe the URL is invalid, please check');
            }
        }
    }
});

new App({
    el: '#page',
    router: new VueRouter()
});
