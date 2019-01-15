<style>
    .swiper-frame{ width:1045px;position: relative;}
    .swiper-container {width: 1040px;position: static;margin: 0 auto;}
    .swiper-button-next,.swiper-button-prev {background-image: none}
    /* .arrow.left:after {border-width: 9px;border-left:none;border-right-color: #000;top: 15px;} */
    /* .arrow.left:before {border-width: 14px;border-left:none;border-right-color: #fff;top: 10px;} */
    .swiper-button-prev{ left: -70px; }
    .swiper-button-next{ right: -70px; }
    .swiper-slide {height: 708px;background-size: contain;background-repeat: no-repeat;background-position: center center;}
    .swiper-slide.audio {width: 614px;height: 614px;background-size: cover}
    .detail-infos{ width: 700px;color:white;}
    .detail-infos h3{ font-size: 40px; letter-spacing: 1.3px;}
    .detail-infos .sub-title {margin-bottom: 20px;}
    .detail-infos p{ font-size: 12px;  line-height: 1.8;color:#969696; width:465px;margin-bottom: 25px;padding-right: 12px;margin-right: 60px;max-height: 152px;overflow: scroll;}
    .detail-infos .time{ padding-top: 15px; position: relative; font-size: 14px; margin-bottom: 25px;}
    .detail-infos .time span{ margin-right: 30px;}
    .detail-infos .author-title {margin-top: 60px}
    .detail-infos .author-list{ width: 500px;margin: 10px 0 60px;color:#969696;}
    .detail-infos .author-list li{ font-size: 14px; margin-bottom: 8px; line-height: 1.5}
    .audio_container {width: 614px;height: 614px;position: relative;background-size: cover;background-repeat: no-repeat;background-position: center center;margin-left: 200px;}
    .audio-frame{ position: absolute;bottom: 0;margin: 20px;}
    .qrcode_container {text-align: center; width:121px;height:140px;position: absolute;bottom: 120px;left: 400px;}
    .qrcode_container .qrcode {width: 121px;height: 121px;border: 1px solid #606060;}
    .qrcode_container .f12 {color:#969696;}
    .back_btn {position: absolute;top: -10px;left: 0;}
    @keyframes scaleAnim {
        0% {
        transform: translate(100%,0px)
        }
        100% {
        transform: translate(0,0)
        }
    }
    .animation-box {display:inline-block;width:auto;overflow:hidden}
    .animation-box span {display:inline-block;animation: scaleAnim 1s linear;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <second-nav></second-nav>
        <body-frame class="flex" style="padding:0 60px">
            <div class="detail-infos">
                <div>
                <h3 class="animation-box"><span>{{detailData.title}}</span></h3>
                </div>
                <div class="animation-box sub-title f20"><span>{{detailData.title_ext}}</span></div>
                
                <div>
                    <p class="hkLight" v-html="detailData.goods_desc"></p>
                </div>

                <div class="f14 author-title" v-if="detailData.author != ''">制作名单 :</div>
                <ul class="author-list">
                    <li class="hkLight" v-for="item in detailData.author">
                        <span>{{item.cname}} : {{item.name}}</span>
                    </li>
                </ul>
                <div class="time hkLight">
                    <span v-if="detailData.cate !== ''">{{detailData.catename}}</span>
                    <div style="margin-top:8px">{{new Date(parseInt(detailData.ctime)).format('MM/yyyy')}}</div>
                </div>
                <div class="qrcode_container tr" v-if='detailData.h5_link'>
                    <qrcode :link='detailData.h5_link'></qrcode>
                    <div class="mt10 f12">扫码查看案例</div>
                </div>
            </div>
            <div class="swiper-frame"  v-if="!showVideo && !detailData.audio_link">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in bannerList" :key="index" :style="{backgroundImage:'url('+domain_url+item+')'}">
                   
                    </swiper-slide>
                </swiper>
                <div class="swiper-button-prev" slot="button-prev" @click="bannerPrev" v-if="activeIndex != 0">
                    <img src="../assets/images/arrow-left.png" width="30" alt="">
                </div>
                <div class="swiper-button-next" slot="button-next" @click="bannerNext" v-if="activeIndex != bannerList.length - 1">
                    <img src="../assets/images/arrow-right.png" width="30" alt="">
                </div>
            </div>
            <div class="audio_container" v-if="detailData.audio_link != ''" :style="{backgroundImage:'url('+domain_url+bannerList[0]+')'}">
                <div class="audio-frame">
                    <audio-view
                        v-if="detailData.audio_link != ''"
                        :src="domain_url+detailData.audio_link"
                        :title="detailData.audio_name">
                    </audio-view>
                </div>
            </div>
             
            <video-view  v-if="showVideo"
                         :vid="vid"
                         :postImg="vPostImg"></video-view>

            <div class="back_btn">
                <i class="arrow left" @click='backHistory'></i>
            </div>
        
        </body-frame>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import SecondNav from '@/components/SecondNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import WorkItem from '@/components/WorkItem.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    import AudioView from '@/components/AudioView.vue'
    import VideoView from '@/components/VideoView.vue'
    import Qrcode from '@/components/Qrcode.vue'
    export default{
        name: 'App',
        components:{TopNav,SecondNav,BottomNav,WorkItem,BodyFrame,AudioView,VideoView,Qrcode},
        data(){
            let self = this;
            return{
                swiperOption:{
                    simulateTouch : false,
                    on: {
                        slideChangeTransitionStart: function(){
                            self.activeIndex = this.activeIndex;
                        }
                    }
                },
                bannerList:[],
                swiper:null,
                activeIndex:0,
                vid:'',//k0015trfczz
                vPostImg:'',
                detailData:{},
                domain_url:'',
                showVideo:false
            }
        },
        mounted(){
            this.swiper = this.$refs.mySwiper.swiper;
            this.activeIndex = this.swiper.activeIndex;
            let id = this.$route.params.id;
            this.getData(id);
            this.$store.dispatch('doGetIndex');
        },
        methods: {
            bannerPrev(){
                this.swiper.slidePrev();
            },
            bannerNext(){
                this.swiper.slideNext();
            },
            backHistory(){
                window.history.back();
            },
            getData(id){
                let self = this;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                self.$ajax.get('admin/api_v2/product_info',{
                    params: {
                        id: id
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.detailData = data.data;
                    self.domain_url = data.domain_url;
                    self.bannerList = data.data.goods_img;
                    self.showVideo = data.data.video_link != '';
                    self.vid = data.data.video_link;
                    self.vPostImg = self.domain_url + data.data.video_cover;

                }).catch((error)=>{
                    console.log(error);
                })
            },
            refresh(id){
                console.log(id);
                this.getData(id);
            }
        },
        computed:{
            media(){
                return this.$store.state.audio;
            },
            recommendList(){
                try{
                    return this.$store.state.indexData.recommend.list
                }catch(err){
                    return []
                }
            }
        },
        beforeRouteLeave (to, from, next){
            if(typeof this.media.pause == 'function'){
                this.media.pause();
            }
            next();
        }
    }

</script>

