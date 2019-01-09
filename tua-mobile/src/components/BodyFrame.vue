<style>
    .header{height: 50px; display: flex; justify-content: space-between; align-items: center; padding:0 3%;}
    .header .logo{ width: 80px;}
    .body-frame .bgCover{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5);  position: fixed; top: 0; left: 0; z-index: 1050}
    .nav-frame{ width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 1100; }
    .nav-frame .btn-close{ height: 50px; display: flex; justify-content: flex-end; align-items: center;}
    .nav-frame .btn-close span{ width: 22px;height: 1px;border-top: 2px solid #fff;transform: rotate(45deg);}
    .nav-frame .btn-close span:first-child{ transform: rotate(-45deg);position: relative;left: 22px}
    .nav-frame nav{ width: 100%; position: absolute; top: 0; right: 0; bottom: 0; background-color: #000; padding-left:3%;overflow-y: scroll;}
    .nav-frame nav a{font-size:16px;letter-spacing: 15px;color: #fff;}
    .nav-frame nav a span{font-size:9px;letter-spacing: 5px;transform: scale(0.9,0.8);display: inline-block;}
    .nav-frame nav .first-level {margin-top: 50px}
    .nav-frame nav .first-level>li {margin-bottom: 20px}
    .nav-frame nav .first-level>li>a{ font-size: 16px;  display: block;padding: 15px 0 15px 20px;}
    .nav-frame nav .first-level>li .second-level{ margin-left: 40px; }
    .nav-frame nav .first-level>li .second-level li a{ padding: 15px 0 15px 10px; color: #fff; display: block;}

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .slide-enter-active, .slide-leave-active {
        transition: left 0.3s;
    }
    .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
        left: 100%;
    }
</style>
<template>
    <section class="body-frame">
        <slot></slot>

        <transition name="fade">
            <div class="bgCover" v-if="showMenu" @touchmove.prevent="move($event)"></div>
        </transition>
        <transition name="slide">
        <div class="nav-frame" v-if="showMenu" @touchmove.prevent="move($event)">
            <nav @touchmove.stop="move($event)">
                <div class="header">
                    <div class="logo" @click="gotoPage('/index',-4)"><img src="../assets/images/logo-bottom.png"> </div>
                    <a href="javascript:;" class="btn-close" @click="doHideMenu"><span></span><span></span></a>
                </div>
                <ul class="first-level hkLight">
                    <li>
                        <a href="/">
                        首页<span>HOME</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;"
                           @click="getList(-2,0,0)">
                            案例<span>WORKS</span>
                        </a>
                        <ul class="second-level">
                            <li>
                                <a href="javascript:;"
                                    @click="getList(-2,0,0)">
                                        全部<span>ALL</span>
                                </a>
                            </li>
                            <li v-for="(item,index) in cateList">
                                <a href="javascript:;"
                                @click="getList(index,item.id,0)">
                                    {{item.cname}}<span>{{item.code}}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;"
                           @click="gotoPage('/about',-3)">
                            关于<span>ABOUT</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        </transition>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{

            }
        },
        mounted(){
            this.$store.dispatch('doGetCate');
        },
        computed:{
            cateList(){
                try{
                    return this.$store.state.cateList
                }catch(err){
                    return [];
                }
            },
            showMenu(){
                return this.$store.state.showMenu
            }
        },
        methods:{
            getList(index,id,id2){
                this.$store.commit('setNavActiveIndex',index);
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
                this.doHideMenu();
            },
            gotoPage(name,index){
                this.$store.commit('setNavActiveIndex',index);
                this.$router.push(name);
                this.doHideMenu();
            },
            doHideMenu(){
                this.$store.commit('setShowMenu',false)
            },
            move(e){
                //console.log(e);
            }
        }
    }

</script>

