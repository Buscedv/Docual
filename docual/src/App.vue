<template>
    <div id="app">
        <Index></Index>
    </div>
</template>

<script>
    import './static/colors.css'
    import './assets/css/flexboxgrid.min.css'
    import Index from "./views/Index";

    import config from './assets/config.json';

    export default {
        name: 'App',
        components: {Index},
        mounted() {
            document.title = config.title;
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    body {
        font-family: 'Roboto', sans-serif;
        padding: 0;
        margin: 0;
        height: 100vh;
        width: 100%;
    }

    #app {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    * {
        box-shadow: none !important;
        outline: none !important;
        scroll-behavior: smooth;
    }

    ::-webkit-scrollbar {
        width: 0;
    }

    /** {*/
    /*    outline: 1px solid red !important;*/
    /*}*/
</style>
