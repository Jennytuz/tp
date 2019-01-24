<style>
    .top-nav{ width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; background-color: #000;}
    .top-nav section{ max-width: 1800px; margin: 0 auto;display: flex;justify-content: space-between}
    .top-nav section .logo{ margin:15px 0; float: left; cursor: pointer;}
    .top-nav section nav{ float: left; margin-left: 60px;}
    .top-nav section nav .first-level{ display: flex; margin-top: 23px;}
    .top-nav section nav .first-level>li{ margin-left: 70px; position: relative; padding-bottom: 18px;}
    .top-nav section nav .first-level>li>a{ width: 45px; font-size: 14px; color: #fff;  text-align: center; display: block; text-align-last: justify;}
    .top-nav section nav .first-level>li>a span{ transform: scale(0.5,0.5); display:block;}
    .top-nav section nav .first-level>li .second-level{ width: 90px; background-color: #000; position: absolute; top:56px; left: 50%; margin-left: -45px; display: none;}
    .top-nav section nav .first-level>li:hover .second-level{ display: block;}
    .top-nav section nav .first-level>li .second-level:before{ content: ''; width: 25px; height: 8px; background: url('../assets/images/arrow1.png') no-repeat; position: absolute; top: -7px; left: 32px;}
    .top-nav section nav .first-level>li .second-level li{ margin: 0 10px; border-bottom: 1px solid #fff;}
    .top-nav section nav .first-level>li .second-level li:last-child{ border-bottom: none;}
    .top-nav section nav .first-level>li .second-level li a{ font-size: 14px; padding: 10px 0; color: #fff; text-align: center; display: block;}

    @media screen and (max-width:1920px) { 
        .top-nav section{ max-width: 1370px;}
    }
</style>

<template>
    <header class="top-nav">
        <section>
            <div class="logo" @click="gotoPage('/index',-4)"><img src="../assets/images/logo-bottom.png" height="56"> </div>
            <nav>
                <ul class="first-level hkLight f14">
                    <li>
                        <a href="javascript:;" @click="gotoPage('/index',-4)">首页
                            <span>HOME</span>
                        </a>
                    </li>
                    <li :class="activeIndex == -2 ? 'active' : ''">
                        <a href="javascript:;"
                           @click="getList(-2,0,0)">
                            案例
                            <span>WORKS</span>
                        </a>
                    </li>
                    
                    <li :class="activeIndex == -3 ? 'active' : ''">
                        <a href="javascript:;"
                           @click="gotoPage('/about',-3)">
                            关于
                            <span>ABOUT</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </section>
    </header>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{
                activeIndex2:-4//首页-1，全部-2，关于页-3
            }
        },
        mounted(){
            this.$store.dispatch('doGetCate');
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
            },
            gotoPage(name,index){
                this.$store.commit('setNavActiveIndex',index);
                this.$router.push(name)
            }
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            },
            activeIndex(){
                return this.$store.state.navActiveIndex
            }
        }
    }

</script>

