<style lang="css">
.saying-generator__link {
    padding: 5px;
}
.saying-generator__link--selected {
    background-color: rgb(208,213,109);
}
</style>

<template lang="html">
    <div class="saying-generator">
        <h1>Saying generator</h1>
        <div>
            <button @click="pickOneLink">random</button>
            <p
                class="saying-generator__link saying-generator__link--selected"
            >
                <a :href="selected.href">{{selected.text | trim}}</a>
            </p>
        </div>
        <div class="">
            <ul>
                <li v-for="link in links" class="saying-generator__link">
                    <a :href="link.href">{{link.text | trim}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import {init as getSayingLinks} from '../backend/logic';
import { random } from '../util/util';
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
        };
    },
    methods: {
        pickOneLink() {
            const index = random(0, this.links.length);
            this.selected = this.links[index];
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
