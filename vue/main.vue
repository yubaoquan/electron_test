<style lang="css">
</style>
<template lang="html">
    <div class="">
        <h1>Please input the web page address you want to fetch.</h1>
        <section>
            <input type="text" v-model="url" @keyup.enter="search">
            <button type="button" name="button" v-on:click="search">Go</button>
        </section>
        <section>
            <button type="button" v-on:click="debug = true">show debug info</button>
        </section>
        <ul>
            <li v-for="link in links">
                <a :href="link.href">{{link.text.trim() || '无文字'}}</a>
            </li>
        </ul>
        <div v-if="debug">{{content}}</div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import {init as initGetBaidu} from '../backend/logic';

export default {
    created() {
        console.info('main created');
    },
    data() {
        return {
            content: '',
            url: '',
            links: [],
            debug: false,
        };
    },
    methods: {
        search() {
            if (!this.url) {
                return alert('Please write down the url first!');
            }
            try {
                initGetBaidu({
                    url: this.url
                }, (bodyContent, links) => {
                    this.content = bodyContent;
                    this.links = links;
                    console.info(links[0]);
                });
            } catch (e) {
                alert('Fetch fail, maybe the URL is invalid, please check');
            }
        },
    }
}
</script>
