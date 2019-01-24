<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide (){
            return {
                reload: this.reload
            }
        },
        data(){
            return {
                isRouterAlive : true
            }
        },
        methods:{
            reload(){
                this.isRouterAlive = false
                this.$nextTick(function(){
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>

<style>
    @import "assets/css/reset.css";

    #app {
        font-family:'hkMedium',"Helvetica Neue","Helvetica","Arial",sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .body-frame{ width: 1800px; min-width: 1800px; margin: 60px auto 0px auto; position: relative;max-height: calc(100vh - 200px);overflow: scroll;}

    .recommend-title{ font-size: 20px; padding: 8px 0;color:white;}
    @media screen and (max-width:1920px) {
        .body-frame{width: 1370px;min-width:1370px}
    }
    /* .item-list{ margin: 0 -14px;} */
</style>
