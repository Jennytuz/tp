<style>
    .swiper-frame-index{ position: relative; margin-bottom: 20px;width: 1800px}
    .banner-item {width:584px}
    .banner-item .link{  display: block; font-size: 28px; letter-spacing: 1.3px; margin-top: 10px; color: #000; white-space:nowrap; text-overflow: ellipsis; overflow: hidden;}
    .banner-item .link:hover{ color: #7f7f7f;}
    .banner-item .bgimg{overflow: hidden; height: 730px;background-size: cover; background-position: center center;}
    .banner-item .bgimg a{ position: relative; font-size: 0; display: block;height: 100%}
    .banner-item .bgimg:hover .detail{transform: translateY(0); position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
    .banner-item .bgimg:hover .detail h2 {top: 16px;opacity: 1}
    .banner-item .bgimg:hover .item-mask {display: none}
    .banner-item .item-mask {color:white;background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8));height: 365px;position:absolute;bottom: 0px;width: 100%;padding: 16px;display: flex;flex-direction: column;justify-content: flex-end;}
    .banner-item .item-mask h2 {font-size: 37px;}
    .banner-item .item-mask p {font-size: 21px;}
    .banner-item .item-mask span {position: absolute;right: 12px;}
    .banner-item .detail{ transition:.3s ease-in-out;display: flex;color:white;height: 100%; font-size: 16px; line-height: 1.3; margin-bottom: 15px; padding: 16px;color:white; background: rgba(0,0,0,.7);flex-direction: column;justify-content: space-between;box-sizing: border-box;transform:translateY(730px)}
    .banner-item .detail h2 {font-size: 37px;}
    .banner-item .detail p {font-size: 21px}
    .banner-item .detail .cate-name {position: absolute;top: 16px;right: 16px;}
    .banner-item .detail .desc {max-height: 130px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 6;-webkit-box-orient: vertical; line-height: 1;}
    .banner-item .time{ padding-top: 15px;color: rgb(127,127,127);position: relative; font-size: 14px;}
    .banner-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .banner-item .time span{ margin-right: 30px;}
    .banner-item .time span a{color: rgb(127,127,127);}
    .banner-item .time span a:hover{color: #000;}
    .banner-item img {margin-top: 10px}
    .banner-frame-index .arrow{ width: 295px; height: 560px; position: absolute; top: 0; z-index: 100; display: block;}
    .banner-frame-index .arrow:hover a{ display: block;}
    .banner-frame-index .arrow a{ width: 40px; height: 100%; background-color: #fff; display: none;}
    .banner-frame-index .arrow img{ margin-top: 256px;}
    .banner-frame-index .left{ left: 0;}
    .banner-frame-index .right{ right: 0;}
    .banner-frame-index .right a{ margin-left: 255px;}
    .banner-frame-index .right img{ margin-left: -40px;}

    .recommend-container .recommend-item{ height: 124px!important;}
    .recommend-container .recommend-item .imgs{display: block; height: 100%;background-size: cover; background-position: center center;background-repeat: no-repeat}
    .recommend-container .recommend-item .imgs:after{ content: ''; background-color: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
    .recommend-container .recommend-item:hover .imgs:after{ background-color: rgba(0,0,0,0);}

    .welcome{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 1100; display: flex; justify-content: center; align-items: center;background-size:cover;background-repeat: no-repeat }
    .slide-fade-enter-active {
        transition: all 1s ease;
    }
    .slide-fade-leave-active {
        transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
    }
    .more-container {width: 1500px;}
    .swiper-container{position: static;}
    .swiper-button-prev,.swiper-button-next {top:53%;background-image: none!important;}
    .swiper-button-prev {left:120px!important;}
    .swiper-button-next {right:60px!important;}
    .swiper-button-disabled {display: none;}

    @media screen and (max-width:1910px) {
        .banner-item {width:438px}
        .banner-item .bgimg{ height: 548px;}
        .banner-item .item-mask h2 {font-size: 30px;}
        .banner-item .item-mask p {font-size: 16px;}
        .recommend-container .recommend-item{ height: 94px!important;}
        .swiper-frame-index {width: 1370px;}
        .more-container {width: 1120px;}
    }
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame style="margin-top:100px">
            <div class="swiper-frame-index flex_sb">
                    <!-- slides -->
                        <section class="banner-item" v-for="(item,index) in bannerList" v-if="index<3">
                            <div class="bgimg" :style="{backgroundImage:'url('+mainUrl+item.banner_cover+')'}">
                                <router-link :to="'/works/detail/'+item.id">
                                <div class="item-mask">
                                    <h2 class="main-title">{{item.title}}</h2>
                                    <p>{{item.title_ext}}</p>
                                    <span class="f12 fr">{{item.catename}}</span>
                                </div>
                                <div class="detail ">
                                    <div>
                                        <h2 class="main-title">{{item.title}}</h2>
                                        <p>{{item.title_ext}}</p>
                                        <span class="f12 cate-name">{{item.catename}}</span>
                                    </div>
                                    <div>
                                        <div class="desc f12" v-html="item.goods_desc"></div>
                                        <img v-if="item.catename =='音乐'" src="../assets/images/music-play.png" width="30" alt="">
                                    </div>
                                </div>
                                </router-link>
                            </div>
                        </section>
            </div>
            <div class="flex_sb recommend-container" style="position:relative">
                <div class="recommend-title">MORE</div>
                <swiper class="more-container" :options="recommendSwiperOpt" ref="mySwiper">
                    <swiper-slide class="recommend-item" v-for="item in recommendList">
                        <router-link :to="'/works/detail/'+item.id" class="imgs" :style="{backgroundImage:'url('+mainUrl+item.recomm_cover+')'}"></router-link>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev">
                        <img src="../assets/images/arrow-left.png" width="30" alt="">
                    </div>
                    <div class="swiper-button-next" slot="button-next">
                        <img src="../assets/images/arrow-right.png" width="30" alt="">
                    </div>
                </swiper>
            </div>
        </body-frame>
        <bottom-nav></bottom-nav>

        <transition name="slide-fade">
        <div class="welcome" v-if="isGuide" :style="{'backgroundImage':'url('+mainUrl+loadingImg +')'}"><img src="../assets/images/loading.gif"> </div>
        </transition>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,BodyFrame},
        mounted(){
            this.swiper = this.$refs.mySwiper.swiper;
            this.activeIndex = this.swiper.activeIndex;

            if(this.isGuide){
                setTimeout(()=>{
                    this.$store.commit('doPassGuide');
                },2000);
            }
            this.$store.dispatch('doGetIndex');

            this.recommendList.map((item)=>{
                this.idList.push(item.id);
            })

            this.$store.commit('setIdList',this.idList);
        },
        computed:{
            isGuide(){
                return this.$store.state.isGuide
            },
            mainUrl(){
                return this.$store.state.indexData.domain_url
            },
            bannerList(){
                try{
                    return this.$store.state.indexData.banner.list.slice(0,3)
                }catch(err){
                    return []
                }
            },
            recommendList(){
                try{
                    return this.$store.state.indexData.recommend.list
                }catch(err){
                    return []
                }
            },
            cateList(){
                return this.$store.state.cateList
            },
            loadingImg(){
                return this.$store.state.aboutData.loading
            }
        },
        data(){
            let self = this;
            return{
                swiper:null,
                activeIndex:0,
                idList:[],
                recommendSwiperOpt:{
                    width: 1070,
                    spaceBetween: 30,
                    slidesPerView:6,
                    slidesPerGroup:6,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    } 
                }
            }
        },
        methods: {
            getList(id,id2){
                for(let i=0;i<this.cateList.length;i++){
                    if(this.cateList[i].id == id){
                        this.$store.commit('setNavActiveIndex',i);
                    }
                }
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
            }
        }
    }

</script>

