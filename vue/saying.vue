<style lang="css">
.saying-generator__link {
    padding: 5px;
}
.saying-generator__random-button-wrapper {
    padding: 5px;
}
.saying-generator__random-button-wrapper button {
    width: 100px;
    height: 40px;
    font-size: 14px;
    padding: 5px;
}
.saying-generator__link--selected {
    background-color: rgb(208,213,109);
}
.saying-generator__saying {
    padding: 5px;
    font-size: 16px;
    font-weight: bold;
}
.saying-generator__item--hidden {
    display: none;
}
</style>

<template lang="html">
    <div class="saying-generator">
        <h1>Saying generator</h1>
        <div>
            <div class="saying-generator__random-button-wrapper">
                <button @click="pickOneLink">random</button>
            </div>
            <p class="saying-generator__saying">{{saying}}</p>
            <p
                class="saying-generator__link saying-generator__link--selected"
            >
                <a :href="selected.href">{{selected.text | trim}}</a>
            </p>
        </div>
        <div class="saying-generator__links saying-generator__item--hidden">
            <ul>
                <li v-for="link in links" class="saying-generator__link">
                    <a :href="link.href">{{link.text | trim}}</a>
                </li>
            </ul>
        </div>
        <div v-html="sayingPageContent" class="test-place saying-generator__item--hidden"></div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { init as getSayingLinks } from '../backend/logic';
import { simpleInit as request } from '../backend/request';
import { random, trim, nodeList2Array, removeNode } from '../util/util';
const SAYING_SITE_URL = 'http://www.geyanw.com/';

export default {
    created() {
        try {
            getSayingLinks({
                url: SAYING_SITE_URL,
                encoding: 'gb2312'
            }, (bodyContent, links) => {
                this.links = links.filter(link => {
                    return /\d+\.html$/.test(link.href);
                });
            });
        } catch (e) {
            alert('Fetch fail, maybe the URL is invalid, please check');
        }
    },
    data() {
        return {
            links: [],
            selected: {},
            sayingPageContent: '',
            sayings: [],
            saying: ''
        };
    },
    methods: {
        pickOneLink() {
            if (this.sayings.length) {
                return this.pickRandomSaying();
            }
            const index = random(0, this.links.length);
            this.selected = this.links[index];
            request({
                url: this.selected.href,
                encoding: 'gb2312'
            }, (bodyContent) => {
                this.sayingPageContent = bodyContent;
                setTimeout(() => {
                    this.sayingPageContent = document.querySelector('.content').innerHTML;
                    setTimeout(() => {
                        this.filterBlankLine();
                        this.pickRandomSaying();
                    }, 500);
                }, 500)
            });
        },
        filterBlankLine() {
            const container = document.querySelector('.test-place');
            const childNodes = nodeList2Array(container.childNodes);

            const blankLines = childNodes.filter(node => !trim(node.textContent));
            blankLines.forEach(removeNode);

            const adLinks = document.querySelectorAll('.test-place a');
            nodeList2Array(adLinks).forEach(removeNode);

            const sayingNodes = nodeList2Array(container.childNodes);
            this.sayings = sayingNodes.map(node => node.innerText);
        },
        pickRandomSaying() {
            const saying = this.sayings[random(0, this.sayings.length)];
            this.saying = saying.replace(/^\d+、/, '');
        }
    },
    filters: {
        trim(val) {
            if (!val) {
                return '--';
            }
            return val.trim() || '--';
        }
    }
}
</script>
