<template>
    <main>
        <div class="row">
            <div class="col-md-3 col-xs-7" v-if="sidebarStatus" id="sidebar">
                <Sidebar></Sidebar>
            </div>
            <div class="col-md-9" :class="(!sidebarStatus) ? 'col-xs-12' :  (!isMobile) ? 'col-xs-5' : 'col-xs-5 fade'" id="doc-area" @click="docClicked()">
                <Doc></Doc>
            </div>
        </div>
    </main>
</template>

<script>
    import Sidebar from "./Sidebar";
    import Doc from "./Doc";
    export default {
        name: 'ContentRoot',
        components: {Doc, Sidebar},
        props: ['sidebarStatus'],
        methods: {
            docClicked() {
                if (this.sidebarStatus && this.isMobile) {
                    this.sidebarStatus = false;
                }
            },
            checkWindowSize() {
                if (window.innerWidth <= 1025) {
                    this.isMobile = true;
                } else {
                    this.isMobile = false;
                }
            },
        },
        data() {
            return {
                isMobile: false,
            }
        },
        mounted() {
            window.addEventListener("resize", this.checkWindowSize);
            this.checkWindowSize();
        },
        destroyed() {
            window.removeEventListener("resize", this.checkWindowSize);
        },
    }
</script>

<style scoped>
    main {
        height: 100vh;
    }

    #doc-area {
        overflow-x: hidden;
    }

    .fade {
        opacity: 20%;
    }

</style>