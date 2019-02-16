<style scoped>
    .tool-container {height: 45px; display: flex;justify-content: space-between;position: relative;}
    .tool-container .next-btn{right: 3%;position: absolute;}
    .tool-container .prev-btn{right: 17%;position: absolute;}

    .image-container img{width: 100%;margin-bottom: 3%;margin-top: 20px;}
    .audio_container {width:100%;position: relative;padding-bottom: 100%;background-position: center center;background-size: cover;}
    .detail-infos{ margin-top: 25px;color:#fff;position:relative;}
    .detail-infos h3{ font-size: 25px;  margin-bottom: 5px;}
    .detail-infos h4 {font-size: 12px;font-weight: 500;}
    .detail-infos p{ font-size: 11px; letter-spacing: 1.5px; line-height: 1.8; margin-top: 20px;color: #969696;}
    .detail-infos #desc {line-height: 1.3;}
    .detail-infos .time{ padding-top: 15px; color: #fff; position: relative; font-size: 10px; margin-bottom: 15px;}
    .detail-infos .time span{ margin-right: 30px;}
    .detail-infos .author-list{ width: 100%; margin:32px 0;}
    .detail-infos .author-list h5{font-size: 12px;font-weight: normal;margin-bottom: 20px;}
    .detail-infos .author-list li{ width: 50%; font-size: 12px; color: rgb(158,159,159); margin-bottom: 8px; display: flex;}
    .detail-infos .author-list li span{font-size: 11px;}

    .audio-frame{position: absolute;bottom:12px; left: 24px; right: 24px;}

    .btn-link{padding:0 12px;height: 24px;line-height: 24px; font-size: 9px; text-align: center; display: inline-block; background-color: #fff;border-radius: 25px; color: #000; margin-top: 25px;    position: absolute;bottom: 0;right: 20px;}
    .btn-link span{transform: scale(.9,.9);display: inline-block;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="tool-container">
                <div class="back-btn" @click="backHistory">
                    <img src="../assets/images/arrow-left.png" width="25">
                </div>
                <div class="">
                    <img class="prev-btn" src="../assets/images/prev.png" width="25" v-show="showPrev" @click="goToPrev">
                    <img class="next-btn" src="../assets/images/next.png" width="25" v-show="showNext" @click="goToNext">
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
            <div style="margin: 0 -3%">
                <video-view  v-if="showVideo"
                             :vid="vid"
                             :postImg="vPostImg"></video-view>
            </div>
            <div class="detail-infos">
                <h3 class="main-title">{{detailData.title}} </h3>
                <h4>{{detailData.title_ext}}</h4>
                <div>
                    <p class="hkLight" id="desc" v-html="detailData.goods_desc"></p>
                </div>
                
                <ul class="author-list" v-if="detailData.author != ''">
                    <h5>制作名单 :</h5>
                    <li class="hkLight" v-for="item in detailData.author">
                        <span>{{item.cname}} : {{item.name}}</span>
                    </li>
                </ul>
                <div class="time hkLight">
                    {{detailData.catename}}<br/>
                    {{new Date(parseInt(detailData.ctime * 1000)).format('MM/yyyy')}}
                </div>
                <a :href="detailData.h5_link"
                   v-if="detailData.h5_link != ''"
                   class="btn-link">
                   <span>观看完整案例</span>
                   </a>
            </div>
            <div class="image-container" v-if="!showVideo && !detailData.audio_link">
                <img v-for="(item,index) in bannerList" :src="domain_url+item" />
            </div>
        </body-frame>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    import AudioView from '@/components/AudioView.vue'
    import VideoView from '@/components/VideoView.vue'
    export default{
        name: 'App',
        components:{TopNav,BodyFrame,AudioView,VideoView},
        data(){
            return{
                bannerList:[],
                activeIndex:0,
                idList:[],
                vid:'',//k0015trfczz
                vPostImg:'',
                detailData:{},
                domain_url:'',
                showVideo:false,
                showPrev:false,
                showNext:false
            }
        },
        mounted(){
            let id = this.$route.params.id,
                self = this;
            this.getData(id);
            this.$store.dispatch('doGetIndex');
            this.idList = this.$store.state.idList;
            this.initPageBtn();
        },
        methods: {
            getData(id){
                let self = this;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                self.$ajax.get('/index.php/admin/api_v2/product_info',{
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
            },
            backHistory(){
                window.history.back();
            },
            initPageBtn(){
                var id = this.$route.params.id;
                if(this.idList){
                    this.idList.indexOf(id) == 0 ? this.showPrev = false: this.showPrev =true;
                    this.idList.indexOf(id) == this.idList.length - 1? this.showNext = false: this.showNext =true;
                }
            },
            goToPrev(){
                var index = this.idList.indexOf(this.$route.params.id),
                    target_id = this.idList[index-1];

                this.loadPage(target_id);
            },
            goToNext(){
                var index = this.idList.indexOf(this.$route.params.id),
                    target_id = this.idList[index+1];
                
                this.loadPage(target_id);
            },
            loadPage(target_id){
                this.$router.push({ name: 'workdetail', params: { id: target_id }})
                this.getData(target_id)
                this.initPageBtn()
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

