<style lang="css">
</style>

<template lang="html">
    <div class="">
        <h1>Saying generator</h1>
        <div>building...</div>
        <div class="">
            <ul>
                <li v-for="link in links">
                    <a :href="link.href">{{link.text.trim() || '无文字'}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import {init as getSayingLinks} from '../backend/logic';
const SAYING_SITE_URL = 'http://www.geyanw.com/';
export default {
    created() {
        try {
            getSayingLinks({
                url: SAYING_SITE_URL,
                encoding: 'gb2312'
            }, (bodyContent, links) => {
                this.links = links;
                console.info(links[0]);
            });
        } catch (e) {
            alert('Fetch fail, maybe the URL is invalid, please check');
        }
    },
    data() {
        return {
            links: []
        }
    }
}
</script>
