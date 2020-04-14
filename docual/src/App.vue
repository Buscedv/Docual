<template>
    <div id="app">
        <Index></Index>
    </div>
</template>

<script>
    import './assets/css/flexboxgrid.min.css'
    import Index from "./views/Index";

    export default {
        name: 'App',
        components: {Index},
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    :root {
        --light: #eff2f5;
        --dark: #2f2f2f;
        --almost-dark: #3f3f3f;
        --light-dark: #666;
        --accent: #5A8CFF;
        --accent-hover: #497BEE;
        --white: #fff;
        --medium: #1c2023;
        --medium-two: #3e4145;
        --light-hover: rgba(224, 230, 235, 0.4);
    }

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
