<style>
    .swiper-frame{ width:1045px;position: relative;}
    .swiper-container {width: 1040px;position: static;margin: 0 auto;}
    .swiper-frame .arrow{ width: 50px;position: absolute; top: 45%; z-index: 100; display: block;}
    .swiper-frame .arrow a{ width: 40px; height: 100%; display: block;}
    .swiper-frame:hover .arrow a{ display: block;}
    .swiper-frame .arrow a:after,.swiper-frame .arrow a:before {border: solid transparent;content: ' ';height: 0;left: 100%;position: absolute;width: 0;}
    .swiper-frame .arrow a:after {border-width: 9px;border-left-color: #000;top: 15px;}
    .swiper-frame .arrow a:before {border-width: 14px;border-left-color: #fff;top: 10px;}
    .swiper-frame .left{ left: -70px;  transition: all 0.2s linear;}
    .swiper-frame .right{ right: -40px;  transition: all 0.2s linear;}
    .swiper-slide {height: 708px;background-size: contain;background-repeat: no-repeat;background-position: top center;}
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
    .detail-infos .author-list li span{ }

    .audio-frame{ position: absolute;bottom: 0;margin: 20px;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <second-nav></second-nav>
        <body-frame class="flex">
            <div class="detail-infos">
                <h3>{{detailData.title}}</h3>
                <div class="sub-title f20">{{detailData.title_ext}}</div>
                
                <div>
                    <p class="hkLight" v-html="detailData.goods_desc"></p>
                </div>
                <div class="f14 author-title">制作名单 :</div>
                <ul class="author-list">
                    <li class="hkLight" v-for="item in detailData.author">
                        <span>{{item.cname}} : {{item.name}}</span>
                    </li>
                </ul>
                <div class="time hkLight">
                    <span v-if="detailData.cate2 == ''">{{detailData.catename}}</span>
                    <span v-if="detailData.cate2 != ''">{{detailData.catename}} / {{detailData.catename2}}</span>
                    <div style="margin-top:8px">{{new Date(parseInt(detailData.ctime)).format('MM/yyyy')}}</div>
                </div>
            </div>
            <div class="swiper-frame"  v-if="!showVideo">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in bannerList" :key="index" :style="{backgroundImage:'url('+domain_url+item+')'}" :class="{'audio':detailData.audio_link != ''}">
                    <div class="audio-frame" v-if="detailData.audio_link != ''">
                        <audio-view
                            v-if="detailData.audio_link != ''"
                            :src="domain_url+detailData.audio_link"
                            :title="detailData.audio_name">
                        </audio-view>
                    </div>
                    </swiper-slide>
                </swiper>
                 <div class="arrow left">
                        <a href="javascript:;"
                        @click="bannerPrev"
                        v-if="activeIndex != 0">
                        </a>
                    </div>
                    <div class="arrow right">
                        <a href="javascript:;"
                        @click="bannerNext"
                        v-if="activeIndex != bannerList.length - 1">
                        </a>
                    </div>
            </div>
            <video-view  v-if="showVideo"
                         :vid="vid"
                         :postImg="vPostImg"></video-view>
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
    export default{
        name: 'App',
        components:{TopNav,SecondNav,BottomNav,WorkItem,BodyFrame,AudioView,VideoView},
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

