<style>
    .vframe{ width:100%; position: relative; height: 210px;}
    .mod_player,.tenvideo_player{ width: 100%; height: 100%;}
    .postImg{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-repeat: no-repeat; background-position: center center; background-size: cover;}
    .postImg a{ width: 30px; position: absolute; top: 50%; left: 50%;transform: translate(-50%,-50%);}
    .postImg .cover{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5);}
</style>

<template>
    <div class="vframe">
        <div id="mod_player" class="mod_player">
            <div id="mod_player_skin">&nbsp;</div>
        </div>
        <div class="postImg" :style="{'background-image':'url('+postImg+')'}" v-if="!isPlay">
            <div class="cover"></div>
            <a href="javascript:;" @click="doPlay"><img src="../assets/images/music-play.png" width="30" height="30"></a>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'HelloWorld',
        data () {
            return {
                video:{},
                player:{},
                isPlay:false,
                postHeight:173
            }
        },
        props:['vid','postImg'],
        mounted(){
            //this.init2();
        },
        methods:{
            imgLoad(e){
                this.postHeight = this.$refs.postImg.height;
            },
            init2(){
                let self = this;
                self.video = new tvp.VideoInfo();
                self.video.setVid(this.vid);
                let player = new tvp.Player();
                player.create({
                    width  : '100%',
                    height : '100%',
                    video  : self.video,
                    playerType: 'html5',
                    modId  : "mod_player",
                    autoplay: true
                });
            },
            doPlay(){
                this.init2();
                this.isPlay = true;
            }
        }
    }
</script>

