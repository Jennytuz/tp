<style>
    .top-nav{ width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; background-color: #000;}
    .top-nav section{ height: 50px; display: flex; justify-content: space-between; align-items: center; padding: 0 3%;}
    .top-nav section .logo{ width: 80px;}
    .top-nav section a{ width: 30px; display: flex;flex-direction: column; align-items: flex-end;}
    .top-nav section a span {display: block;height:1px;border-top: 2px solid #fff;margin-bottom: 4px;}
    .top-nav section a span:first-child{width:26px;}
    .top-nav section a span:nth-child(2){width:23px;}
    .top-nav section a span:nth-child(3){width:20px;}
</style>

<template>
    <header class="top-nav">
        <section>
            <div class="logo" @click="gotoPage('/index',-4)"><img src="../assets/images/logo-bottom.png"> </div>
            <a href="javascript:;" @click="doShowMenu"><span></span><span></span><span></span> </a>
        </section>
    </header>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{
                activeIndex:-4//首页-1，全部-2，关于页-3
            }
        },
        methods:{
            gotoPage(name,index){
                this.activeIndex = index;
                this.$router.push(name)
            },
            doShowMenu(){
                this.$store.commit('setShowMenu',true)
            }
        }
    }

</script>

