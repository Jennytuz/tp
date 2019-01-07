<style>
    .swiper-frame-index{ position: relative; margin-bottom: 20px;}
    .swiper-item .link{  display: block; font-size: 28px; letter-spacing: 1.3px; margin-top: 10px; color: #000; white-space:nowrap; text-overflow: ellipsis; overflow: hidden;}
    .swiper-item .link:hover{ color: #7f7f7f;}
    .swiper-item .img{ height: 730px;background-size: cover; background-position: center center;}
    .swiper-item .img a{ position: relative; font-size: 0; display: block;height: 100%}
    .swiper-item .img:hover .detail{ display: flex; position: absolute; top: 0; left: 0; right: 0; bottom: 0;transition: all .8s ;}
    .swiper-item .item-mask {color:white;background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8));height: 365px;position:absolute;bottom: 0px;width: 100%;padding: 16px;display: flex;flex-direction: column;justify-content: flex-end;}
    .swiper-item .detail{ color:white;height: 100%; font-size: 16px; letter-spacing: 3px; line-height: 1.8; margin-bottom: 15px; padding: 16px;color:white; background: rgba(0,0,0,.7);display:flex;flex-direction: column;justify-content: space-between;box-sizing: border-box;display:none;}
    .swiper-item .detail h2 {font-size: 28px}
    .swiper-item .detail p {font-size: 20px}
    .swiper-item .detail span {position: absolute;top: 16px;right: 16px;}
    .swiper-item .detail .desc {max-height: 130px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 6;-webkit-box-orient: vertical;}
    .swiper-item .time{ padding-top: 15px;color: rgb(127,127,127);position: relative; font-size: 14px;}
    .swiper-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .swiper-item .time span{ margin-right: 30px;}
    .swiper-item .time span a{color: rgb(127,127,127);}
    .swiper-item .time span a:hover{color: #000;}
    .swiper-frame-index .arrow{ width: 295px; height: 560px; position: absolute; top: 0; z-index: 100; display: block;}
    .swiper-frame-index .arrow:hover a{ display: block;}
    .swiper-frame-index .arrow a{ width: 40px; height: 100%; background-color: #fff; display: none;}
    .swiper-frame-index .arrow img{ margin-top: 256px;}
    .swiper-frame-index .left{ left: 0;}
    .swiper-frame-index .right{ right: 0;}
    .swiper-frame-index .right a{ margin-left: 255px;}
    .swiper-frame-index .right img{ margin-left: -40px;}

    .recommend-item{ height: 124px;}
    .recommend-item .imgs{display: block; height: 100%;background-size: cover; background-position: center center;}
    .recommend-item .imgs:after{ content: ''; background-color: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
    .recommend-item:hover .imgs:after{ background-color: rgba(0,0,0,0);}

    .welcome{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 1100; display: flex; justify-content: center; align-items: center;}
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
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame style="margin-top:100px">
            <div class="swiper-frame-index">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in bannerList">
                        <section class="swiper-item">
                            <div class="img" :style="{backgroundImage:'url('+mainUrl+item.banner_cover+')'}">
                                <router-link :to="'/works/detail/'+item.id">
                                <div class="item-mask">
                                    <h2 class="f30">{{item.title}}</h2>
                                    <p class="f20">{{item.title_ext}}</p>
                                </div>
                                <div class="detail ">
                                    <div>
                                        <h2>{{item.title}}</h2>
                                        <p>{{item.title_ext}}</p>
                                        <span class="f12">{{item.catename}}</span>
                                    </div>
                                    <div>
                                        <div class="desc f12" v-html="item.goods_desc"></div>
                                    </div>
                                </div>
                                </router-link>
                            </div>
                        </section>
                    </swiper-slide>
                </swiper>
            </div>

            <div class="flex_sb">
                <div class="recommend-title">MORE</div>
                <swiper class="more-container" :options="recommendSwiperOpt" ref="mySwiper">
                    <swiper-slide class="recommend-item" v-for="item in recommendList">
                        <router-link :to="'/works/detail/'+item.id" class="imgs" :style="{backgroundImage:'url('+mainUrl+item.recomm_cover+')'}"></router-link>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </body-frame>
        <bottom-nav></bottom-nav>

        <transition name="slide-fade">
        <div class="welcome" v-if="isGuide"><img src="../assets/images/loading.gif"> </div>
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
                    return this.$store.state.indexData.banner.list.slice(3)
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
            }
        },
        data(){
            let self = this;
            return{
                swiperOption: {
                    width: 584,
                    spaceBetween:25,
                    simulateTouch : false,
                    on: {
                        slideChangeTransitionStart: function(){
                            self.activeIndex = this.activeIndex;
                        }
                    }
                },
                swiper:null,
                activeIndex:0,
                recommendSwiperOpt:{
                    width: 222,
                    spaceBetween: 12,
                    slidesPerGroup:6,
                }
            }
        },
        methods: {
            bannerPrev(){
                this.swiper.slidePrev();
            },
            bannerNext(){
                this.swiper.slideNext();
            },
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

