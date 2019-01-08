<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    @import "assets/css/reset.css";

    #app {
        background-color: #000;
        font-family:'hkMedium',"Helvetica Neue","Helvetica","Arial",sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    img{ width: 100%;}
    .body-frame{margin: 50px 3% 60px 3%;}

    .item-list{ display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 70px;}
</style>
