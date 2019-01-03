<style>
    .img {background-size: contain; background-position: top right;background-repeat: no-repeat; width: 1260px;height: 710px}
    section {color: #fff;}
    .about-tag{ display: flex; align-items: center; z-index: 500;color: #fff;}
    .about-tag li{ width: 150px; height: 30px; display: flex; justify-content: center; align-items: center; font-size: 14px; cursor: pointer;}
    .about-tag li.active{ border-bottom: 1px solid #FF7200;}
    .about-tag li:hover{ background-color: #000; color: #fff;}

    .profile,.contact,.team{ margin-top: 68px; width: 480px}
    .profile .hkLight{ font-size: 14px; line-height: 1.8; letter-spacing: 3px;}
    .about-title p{ font-size: 14px; margin-bottom: 25px; font-weight: bold; letter-spacing: 3px;}
    .about-title h3{ font-size: 40px; letter-spacing: 3px;}
    .about-title h3 span{ font-size: 12px; display: block; transform: scale(0.7,0.7); transform-origin: 0 0; letter-spacing: 3px;}

    .contact .infos li{ font-size: 14px; margin-bottom: 25px; display: flex;}
    .contact .infos li p:first-child{ width: 225px;}
    .contact .infos li p{ line-height: 1.8;}
    .contact .wechat{ margin-top: 58px;}
    .contact .wechat p{ margin-top: 30px; font-size: 14px; line-height: 1.5;}
    .contact .wechat p span{ color: #c29832; display: block;}
    .contact .qrcode{ position: absolute; bottom: 0; left: 230px;}

    .team .content{ width: 500px; font-size: 14px; line-height: 1.8; margin-bottom: 40px; letter-spacing: 3px;}

    .member-item{ position: relative; float: left; margin: 0 14px 28px 14px; font-size: 0;}
    .member-item div{ width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); font-size: 30px; display: flex; justify-content: center; align-items: center; position: absolute; top: 0; left: 0; color: #fff; opacity: 0;}
    .member-item:hover div{ opacity: 1;}

    .services{ border-bottom: none; margin-bottom: 0;}
    .pro-tag-list{ overflow: hidden; margin: 0 -100px;}
    .pro-tag-list li{ width: 25%; float: left; display: flex; justify-content: center;}
    /*.pro-tag-list li:nth-child(4n+2){ justify-content: center;}*/
    /*.pro-tag-list li:nth-child(4n+3){ justify-content: center;}*/
    /*.pro-tag-list li:nth-child(4n+4){ justify-content: flex-end;}*/
    .pro-tag-list li a{ display: flex; align-items: flex-end;}
    .pro-tag-list li h3{ color: #fff; font-size: 200px; -webkit-text-stroke:2px #9ea09f;}
    .pro-tag-list li div{ color: #000; font-size: 32px; margin-bottom: 40px; margin-left: -20px;}
    .pro-tag-list li a:hover h3{-webkit-text-stroke:2px #be9833; color: #be9833;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame class="flex_sb">
            <section>
                <ul class="about-tag" ref="aboutTag">
                    <li :class="activeIndex == 1 ? 'active':''" @click="setTop(710)">公司簡介</li>
                    <li :class="activeIndex == 2 ? 'active':''" @click="setTop(1075)">聯繫方式</li>
                    <li :class="activeIndex == 3 ? 'active':''" @click="setTop(1685)">團隊成員</li>
                    <li :class="activeIndex == 4 ? 'active':''" @click="setTop(2150)">業務範圍</li>
                </ul>

                <section class="profile">
                    <div class="about-title">
                        <h3>公司簡介</h3>
                    </div>
                    <div class="hkLight" v-html="aboutData.intro"></div>
                    <div class="hkLight" v-html="aboutData.idea"></div>
                </section>

                <section class="contact none">
                    <div class="about-title">
                        <h3>聯繫方式</h3>
                    </div>
                    <img :src="aboutData.domain_url+aboutData.mapimg" width="500" height="450">
                    <div style="width: 625px; position: relative;">
                        <ul class="infos hkLight">
                            <li>
                                <p>The contact<br>聯繫人</p>
                                <p>{{aboutData.contact}}</p>
                            </li>
                            <li>
                                <p>E-mail<br>電子郵箱</p>
                                <p>{{aboutData.email}}</p>
                            </li>
                            <li>
                                <p>Phone<br>手機</p>
                                <p>{{aboutData.mobile}}<br>{{aboutData.time_slot}}</p>
                            </li>
                            <li>
                                <p>Address<br>地址</p>
                                <p>{{aboutData.address}}</p>
                            </li>
                        </ul>
                        <div class="wechat">
                            <img src="../assets/images/icon-wechat.png">
                            <p><span>TAU</span>头牌文化传播</p>
                        </div>
                        <div class="qrcode"><img :src="aboutData.domain_url+aboutData.ewm_url" width="100" height="100"> </div>
                    </div>
                </section>

                <section class="team none">
                    <div class="about-title">
                        <h3>團隊成員</h3>
                    </div>
                    <div style=" width: 1280px;">
                        <div class="content">{{aboutData.team}}</div>
                        <ul class="item-list clearfix">
                            <li class="member-item" v-for="(item,index) in teamList" :key="index">
                                <img :src="aboutData.domain_url+item.cover" width="265" height="210">
                                <div>{{item.name}}</div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="team services none">
                    <div class="about-title">
                        <h3>業務範圍</h3>
                    </div>
                    <div style=" width: 1280px;">
                        <div class="content">{{aboutData.range}}</div>
                        <ul class="pro-tag-list">
                            <li v-for="(item,index) in cateList">
                                <a href="javascript:;" @click="getList(index,item.id,0)">
                                    <h3>{{index+1}}</h3>
                                    <div>{{item.cname}}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
            <section class="img" :style="{backgroundImage:'url('+aboutData.domain_url+aboutData.cover+')'}"></section>
        </body-frame>
        <bottom-nav @clickWechat="backContact"></bottom-nav>
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
            // this.tCheck = setInterval(this.intervalCheck,60);
            let top = this.$route.params.top || 0;
            document.body.scrollTop = top;
            document.documentElement.scrollTop = top;

            this.$store.dispatch('doGetCate');
            this.$store.dispatch('doGetAbout');
        },
        data(){
            return{
                activeIndex:0,
                tCheck:0
            }
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            },
            aboutData(){
                return this.$store.state.aboutData;
            },
            teamList(){
                try{
                    return this.$store.state.aboutData.teams.list;
                }catch(err){
                    return []
                }
            }
        },
        methods:{
            intervalCheck(){
                var st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if(st >= 710){
                    this.$refs.aboutTag.style.position = 'fixed';
                    this.$refs.aboutTag.style.top = '80px';
                    if(st >= 710 && st < 1075){
                        this.activeIndex = 1;
                    }else if(st >= 1075 && st < 1685){
                        this.activeIndex = 2;
                    }else if(st >= 1685 && st < 2150){
                        this.activeIndex = 3;
                    }else if(st >= 2150){
                        this.activeIndex = 4;
                    }
                }else{
                    this.$refs.aboutTag.style.position = 'absolute';
                    this.$refs.aboutTag.style.top = '665px';
                }
            },
            setTop(pos){
                document.body.scrollTop = pos;
                document.documentElement.scrollTop = pos;
            },
            getList(index,id,id2){
                this.$store.commit('setNavActiveIndex',index);
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
            },
            backContact(){
                this.setTop(1075)
            }
        },
        beforeRouteLeave (to, from, next){
            clearInterval(this.tCheck);
            next();
        }
    }

</script>

