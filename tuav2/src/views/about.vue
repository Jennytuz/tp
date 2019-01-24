<style>
    .body-frame {padding-top: 57px;}
    .about_img {background-size: contain; background-position: top right;background-repeat: no-repeat; width: 1260px;height: 710px}
    section {color: #fff;}
    .about-tag{ display: flex; align-items: center; z-index: 500;color: #fff;}
    .about-tag li{ margin-right: 70px; font-size: 12px; cursor: pointer;}
    .about-tag li.active{ border-bottom: 1px solid #FF7200;}
    .about-tag li:hover{ background-color: #000; color: #fff;}

    .about-content {max-height:500px;overflow: scroll;}
    .profile,.contact,.team{ margin-top: 68px; width: 480px}
    .profile .hkLight{ font-size: 14px; line-height: 1.5; letter-spacing: 3px;color:#969696;}
    .about-title p{ font-size: 14px; margin-bottom: 25px; font-weight: bold; letter-spacing: 3px;}
    .about-title h3{ font-size: 40px; letter-spacing: 3px;margin-bottom: 68px;}
    .about-title h3 span{ font-size: 12px; display: block; transform: scale(0.7,0.7); transform-origin: 0 0; letter-spacing: 3px;}

    .contact .infos li{ font-size: 12px; margin-bottom: 20px; display: flex;}
    .contact .infos li p:first-child{ width: 225px;color:#fff;}
    .contact .infos li p{ line-height: 1.8;color: #969696;}
    .contact .wechat{ margin-top: 58px;}
    .contact .wechat p{ margin-top: 30px; font-size: 14px; line-height: 1.5;}
    .contact .wechat p span{ color: #c29832; display: block;}
    .contact .qrcode{ position: absolute; bottom: 0; left: 230px;}

    .team .content{ font-size: 14px; line-height: 1.8; margin-bottom: 40px; letter-spacing: 3px;}

    .member-item{ width: 194px; margin: 0 30px 28px 0px; font-size: 0;}
    /* .member-item:nth-child(2n){margin-right: 0px} */
    .member-item div{margin-top: 20px; color:#fff;}
    .member-item p{ color:#969696;font-size: 10px;margin-top: 17px;line-height: 1.5;}
    .member-item img {width: 194px;height: 194px;}
    .item-list {display: flex;flex-wrap: wrap;max-height: 500px;overflow-y: scroll}
    .services{ border-bottom: none; margin-bottom: 0;}
    .pro-tag-list{ }
    .pro-tag-list li{ }
    /*.pro-tag-list li:nth-child(4n+2){ justify-content: center;}*/
    /*.pro-tag-list li:nth-child(4n+3){ justify-content: center;}*/
    /*.pro-tag-list li:nth-child(4n+4){ justify-content: flex-end;}*/
    .pro-tag-list li a{ display: flex; align-items: flex-end;margin-bottom: 40px}
    .pro-tag-list li div{ color: #fff; font-size: 32px; margin-left: 40px;}
    @media screen and (max-width:1910px) { 
        .about_img {width: 946px;height: 533px;}
        .profile,.contact,.team {width: 370px}
        .about-tag li {margin-right: 50px}
        .member-item{ width: 153px; }
        .member-item img {width: 153px;height: 153px;}
        .contact .infos li p:first-child{ width: 145px;}
        .about-title h3{ font-size: 30px;}
    }
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame class="flex_sb">
            <section>
                <ul class="about-tag" ref="aboutTag">
                    <li :class="activeIndex == 1 ? 'active':''" @click="setList(0)">公司簡介</li>
                    <li :class="activeIndex == 2 ? 'active':''" @click="setList(1)">聯繫方式</li>
                    <li :class="activeIndex == 3 ? 'active':''" @click="setList(2)">團隊成員</li>
                    <li :class="activeIndex == 4 ? 'active':''" @click="setList(3)">業務範圍</li>
                </ul>

                <section class="about-list profile">
                    <div class="about-title">
                        <h3 class="main-title">公司簡介</h3>
                    </div>
                    <div class="about-content">
                        <div class="hkLight" v-html="aboutData.intro"></div>
                        <div class="hkLight" v-html="aboutData.idea"></div>
                    </div>
                </section>

                <section class="about-list contact none">
                    <div class="about-title">
                        <h3 class="main-title">聯繫方式</h3>
                    </div>
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
                        <!-- <div class="wechat">
                            <img src="../assets/images/icon-wechat.png">
                            <p><span>TAU</span>头牌文化传播</p>
                        </div>
                        <div class="qrcode"><img :src="aboutData.domain_url+aboutData.ewm_url" width="100" height="100"> </div> -->
                    </div>
                    <b-map></b-map>
                </section>

                <section class="about-list team none">
                    <div class="about-title">
                        <h3 style="margin-bottom:24px;" class="main-title">團隊成員</h3>
                    </div>
                    <div style="width: 480px;">
                        <!-- <div class="content">{{aboutData.team}}</div> -->
                        <ul class="item-list">
                            <li class="member-item" v-for="(item,index) in teamList" :key="index">
                                <img :src="aboutData.domain_url+item.cover">
                                <div class="f14 flex_sb flex_v_c"><span>{{item.title}}</span><span>{{item.name}}</span></div>
                                <p>{{item.intro}}</p>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="about-list team services none">
                    <div class="about-title">
                        <h3 class="main-title">業務範圍</h3>
                    </div>
                    <div style=" width: 480px;">
                        <ul class="pro-tag-list">
                            <li v-for="(item,index) in cateList">
                                <a href="javascript:;" class="flex_v_c" @click="getList(index,item.id,0)">
                                    <img :src="aboutData.domain_url+item.icon" width="75"> <div>{{item.cname}}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
            <section class="about_img" :style="{backgroundImage:'url('+aboutData.domain_url+aboutData.cover+')'}"></section>
        </body-frame>
        <bottom-nav @clickWechat="backContact"></bottom-nav>
    </div>
</template>
<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    import BMap from '@/components/BMap.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,BodyFrame,BMap},
        mounted(){
            this.setList(0)
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
            setList(index){
                var el = document.getElementsByClassName('about-list');
                for(var i = 0; i < el.length; i++){
                    if(i == index){
                        el[i].style.display = 'block';
                        this.activeIndex = i+1;
                    }
                    else {
                        el[i].style.display = 'none';
                    }
                }
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
                
            }
        },
        beforeRouteLeave (to, from, next){
            clearInterval(this.tCheck);
            next();
        }
    }

</script>

