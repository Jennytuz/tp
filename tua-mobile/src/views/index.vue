<style scoped>
    .swiper-frame{ position: relative; margin-bottom: 40px; margin-right: -3%;}
    .swiper-item {width: calc(100vw - 6%);height: 422px;background-size: cover;background-repeat: no-repeat;background-position: center center;}
    .swiper-item .infos .title{ font-size: 30px; margin-top: 10px;}
    .swiper-item .infos h4 {font-size: 14px;font-weight: normal;}
    .swiper-item .item-mask {color: white;background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8));height: 165px;position: absolute;bottom: 0px;width: 100%;padding: 12px;display: flex;flex-direction: column;justify-content: flex-end;}
    .recommend-container {display: flex; justify-content: space-between;flex-wrap: wrap;}
    .recommend-item{ margin-bottom: 24px; width: calc((100vw - 6% - 10px)/2)}
    .recommend-item .imgs{ background-size: cover;background-repeat: no-repeat;background-position: center center;padding-bottom: 100%;}
    .recommend-item .infos{margin-top: 10px; display: flex; justify-content: space-between;font-size: 10px;color: #fff;}
    .recommend-item .infos a{ display: block; font-size: 16px; letter-spacing: 1.5px; margin-bottom: 10px; color: #fff; overflow:hidden;}
    .recommend-item .infos .detail{ font-size: 10px; letter-spacing: 1.5px; line-height: 1.8; margin-bottom: 90px; overflow:hidden;}
    .recommend-item .infos .time{display: flex; justify-content: space-between; padding-top: 10px; color: #fff; font-size: 10px;}
    .recommend-item .infos .time span{ margin-right: 10px;}

    .welcome{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 1100; display: flex; justify-content: center; align-items: center;}
    .welcome img{ width: 30%;}
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
</style>
<!--static/mobile_v1/static/-->
<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="swiper-frame" style="margin-left: 0;">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in bannerList" class="swiper-item" :style="{'backgroundImage':'url('+mainUrl+item.banner_cover +')'}">
                        <div><router-link :to="'/works/detail/'+item.id"></router-link></div>
                            <div class="infos item-mask">
                                <div class="title">{{item.title}}</div>
                                <h4>{{item.title_ext}}</h4>
                            </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="recommend-container">
                <work-item v-for="item in recommendList"
                           :data="item"
                           :mainUrl="mainUrl"
                           :cover="item.recomm_cover"
                           :key="item.id"></work-item>
            </div>
        </body-frame>

        <transition name="slide-fade">
        <div class="welcome" v-if="isGuide"><img src="../assets/images/loading.gif"> </div>
        </transition>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    import WorkItem from '@/components/WorkItem.vue'
    export default{
        name: 'App',
        components:{TopNav,BodyFrame,WorkItem},
        computed:{
            isGuide(){
                return this.$store.state.isGuide
            },
            mainUrl(){
                return this.$store.state.indexData.domain_url
            },
            bannerList(){
                try{
                    return this.$store.state.indexData.banner.list
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
            }
        },
        data(){
            let self = this;
            return{
                swiperOption: {
                    width: window.innerWidth*0.94,
                    spaceBetween:15,
                    on: {
                        slideChangeTransitionStart: function(){
                            self.activeIndex = this.activeIndex;
                        }
                    }
                },
                swiper:null,
                activeIndex:0
            }
        },
        mounted(){
            this.swiper = this.$refs.mySwiper.swiper;
            this.activeIndex = this.swiper.activeIndex;

            if(this.isGuide){
                setTimeout(()=>{
                    this.$store.commit('doPassGuide');
                },2000);

            }
            this.$store.dispatch('doGetIndex');
        }
    }

</script>

