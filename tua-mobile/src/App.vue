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
        font-family:'hkMedium',"Helvetica Neue","Helvetica","Arial",sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body{background-color: #000;color:#fff;}
    .body-frame{margin: 50px 3% 20px 3%;}
    .main-title {font-family:'微软雅黑','Microsoft YaHei';font-weight: bold;}
    .item-list{ display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 60px;}
</style>
