<template>
    <aside>
        <div class="sidebar">
            <div class="header">
                <a class="sidebar-btn-c" @click="isSearch = true" v-if="!isSearch"><font-awesome-icon icon="search"/></a>
                <a class="sidebar-btn-c" @click="isSearch = false" v-if="isSearch"><font-awesome-icon icon="times"/></a>
                <a class="sidebar-btn">Home</a>
            </div>
            <div class="sidebar-items" v-if="!isSearch">
                <a class="sidebar-link">Link 1</a>
                <a class="sidebar-link">Link 1</a>
                <a class="sidebar-link sidebar-link-sub">Sub link 1</a>
                <a class="sidebar-link sidebar-link-sub">Sub link 1</a>
                <a class="sidebar-link sidebar-link-sub">Sub link 1</a>
                <a class="sidebar-link">Link 1</a>
                <a class="sidebar-link">Link 1</a>
                <a class="sidebar-link sidebar-link-sub">Sub link 1</a>
                <a class="sidebar-link sidebar-link-sub">Sub link 1</a>
            </div>
            <div class="sidebar-search" v-if="isSearch">
                <input type="text" placeholder="Search..." v-model="search">
                <div id="no-results">
                    <img src="../assets/img/no_results.png" alt="no results">
                </div>
                <div id="results">
                    <a class="sidebar-link search-result">Link 1</a>
                    <a class="sidebar-link search-result">Link 1</a>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    export default {
        name: 'Sidebar',
        data() {
            return {
                isSearch: false,
                search: '',
            }
        },
    }
</script>

<style scoped>
    aside {
        margin-top: 70px;
        height: 100%;
        width: 100%;
        padding: 1px;
        background-color: var(--light);
    }

    .sidebar {
        height: 100%;
        max-width: 100%;
        border-right: 2px solid var(--light);
        padding: 20px;
    }

    .header {
        padding-top: 30px;
        width: 100%;
        margin-bottom: 20px;
        padding-bottom: 20px;
    }

    .header h1 {
        font-size: 2em;
        color: var(--light-dark);

    }

    .header .row {
        display: flex;
        align-items: center;
    }

    .header .row * {
        padding: 2px;
    }

    .sidebar-link {
        font-size: 1.1em;
        color: var(--dark);
        margin-top: 8px;
        margin-bottom: 8px;
        width: 100%;
        float: left;
        border-left: 2px solid var(--accent);
        padding-left: 8px;
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .sidebar-link:hover {
        color: var(--accent);
        cursor: pointer;
        background-color: var(--light-hover);
    }

    .sidebar-link-sub {
        border: none;
        font-size: 1em;
        font-family: 'Roboto Light', sans-serif;
        margin-left: 8px;
        color: var(--almost-dark);
    }

    .sidebar-btn, .sidebar-btn-c {
        background-color: var(--accent);
        color: var(--white);
        text-align: center;
        font-size: 1em;
        margin-bottom: 25px;
    }

    .sidebar-btn {
        padding: 10px;
        padding-left: 25px;
        padding-right: 25px;
        border-radius: 10px;
        width: auto;
    }

    .sidebar-btn:hover, .sidebar-btn-c:hover {
        background-color: var(--accent-hover);
        cursor: pointer;
    }

    .sidebar-btn-c {
        padding: 5px;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        display: flex;
        align-items: center;
    }

    .sidebar-btn-c * {
        margin-left: auto;
        margin-right: auto;
    }

    .sidebar-search {
        height: 100%;
        width: 100%;
        text-align: center;
    }

    .sidebar-search input {
        width: 90%;
        padding: 10px;
        background-color: #fff;
        border: 1px solid var(--light-hover);
        border-radius: 10px;
        font-size: 1.1em;
        margin-bottom: 20px;
    }

    #no-results {
        width: 100%;
        display: flex;
        align-items: center;
        height: 50%;
    }

    #no-results img {
        height: 100px;
        margin-left: auto;
        margin-right: auto;
    }

    .search-result {
        text-align: left;
    }
</style>