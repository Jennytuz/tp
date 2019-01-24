<style scoped>
    .about-tag{ width: 94%; height: 60px;  left: 3%; display: flex; justify-content: space-around; align-items: center; color: #fff; z-index: 500;}
    .about-tag li{ width: 80px; height: 20px; display: flex; justify-content: center; align-items: center; font-size: 14px; cursor: pointer;}
    .about-tag li.active{ border-bottom: 1px solid #ff7200;}

    .about-list{ margin-top: 48px;}
    .about-list:not(:first-child){display: none;}
    .profile,.contact,.team{  padding-bottom: 40px; margin-bottom: 40px; padding-left: 3%; padding-right: 3%;}
    .profile .hkLight { font-size: 11px;color:#969696; line-height: 1.8;letter-spacing: 1.5px;}

    .about-title{ margin-bottom: 20px;}
    .about-title p{ font-size: 20px; margin-bottom: 15px;}
    .about-title h3{ font-size:21px; font-weight: bold; letter-spacing: 1.5px;}

    .contact{ padding-bottom: 0;}
    .contact .infos li{ font-size: 13px; margin-bottom: 20px;display: flex}
    .contact .infos li p:first-child{ margin-bottom: 15px;width: 48%;}
    .contact .infos li p{ line-height: 1.8;}
    .contact .infos li p a{ color: #fff; margin-bottom: 5px; display: inline-block;}

    .team .content{font-size: 14px; line-height: 1.8; margin-bottom: 20px; letter-spacing: 1.5px;}

    .member-item{ margin-bottom: 30px;}
    .member-item div{ color: #fff; font-size: 12px; margin-top: 8px;margin-bottom: 16px;}
    .member-item .title {font-size:14px;display: flex;justify-content: space-between;align-items: center;}
    .member-item p {font-size: 13px;color: #969696;line-height: 1.5;}
    .services{ border-bottom: none; margin-bottom: 0;}
    .pro-tag-list{ display: flex; flex-wrap: wrap;margin-top:63px;}
    .pro-tag-list li{ width:45%;margin-bottom: 4%;}
    .pro-tag-list li a{ display: flex; align-items: flex-end;}
    .pro-tag-list li div{ color: #fff; font-size: 34px; margin-left: 13px;}
    .pro-tag-list li a:hover h3{-webkit-text-stroke:2px #be9833; color: #be9833;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <section style="font-size: 0; margin: 0 -3%;" ref="banner">
                <img :src="aboutData.domain_url+aboutData.cover" width="100%">
            </section>
            <ul class="about-tag" ref="aboutTag">
                <li :class="activeIndex == 1 ? 'active':''" @click="setList(0)">公司简介</li>
                <li :class="activeIndex == 2 ? 'active':''" @click="setList(1)">业务范围</li>
                <li :class="activeIndex == 3 ? 'active':''" @click="setList(2)">我们的团队</li>
                <li :class="activeIndex == 4 ? 'active':''" @click="setList(3)">联系方式</li>
            </ul>

            <section class="about-list profile">
                <div class="about-title">
                    <h3 class="main-title">公司简介</h3>
                </div>
                <div class="hkLight" v-html="aboutData.intro"></div>
                <div class="hkLight" v-html="aboutData.idea"></div>
            </section>
            <section class="about-list team services">
                <div class="about-title">
                    <h3 class="main-title">业务范围</h3>
                </div>
                <div>
                    <ul class="pro-tag-list">
                        <li v-for="(item,index) in cateList">
                            <a href="javascript:;"  @click="getList(index,item.id,0)">
                                <img :src="aboutData.domain_url+item.icon" width="50" height="50">
                                <div>{{item.cname}}</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="about-list team" ref="team">
                <div class="about-title">
                    <h3 class="main-title">我们的团队</h3>
                </div>
                <div>
                    <!-- <div class="content">{{aboutData.team}}</div> -->
                    <ul class="">
                        <li class="member-item" v-for="(item,index) in teamList" :key="index">
                            <img :src="aboutData.domain_url+item.cover" width="100%">
                            <div class="title">
                                <span>{{item.title}}</span>
                                <span>{{item.name}}</span>
                            </div>
                            <p>{{item.intro}}</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="about-list contact">
                <div class="about-title">
                    <h3 class="main-title">联系我们</h3>
                </div>
                <div style=" position: relative;">
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
                            <p><a :href="'tel:'+getPhone(aboutData.mobile)" class="btn">{{aboutData.mobile}}</a> <br>{{aboutData.time_slot}}</p>
                        </li>
                        <li>
                            <p>Address<br>地址</p>
                            <p>{{aboutData.address}}</p>
                        </li>
                    </ul>
                    <b-map></b-map>
                </div>
            </section>
        </body-frame>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    import BMap from '@/components/BMap.vue'
    export default{
        name: 'App',
        components:{TopNav,BodyFrame,BMap},
        mounted(){
            this.$store.dispatch('doGetAbout');
            this.setList(0)
        },
        data(){
            return{
                activeIndex:1,
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
            getPhone(phone){
                return phone.replace(/\s/g,'').replace(/-/g,'');
            },
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
            }
        },
        beforeRouteLeave (to, from, next){
            clearInterval(this.tCheck);
            next();
        }
    }

</script>

