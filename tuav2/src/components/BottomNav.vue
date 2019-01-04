<style>
    .bottom-nav{ max-width: 1800px; padding:30px 60px; overflow: hidden;}
    .bottom-nav section{ width: 1800px; position: relative;display: flex;}
    .bottom-nav .infos{ width:100%;display: flex; margin-top: 40px;}
    .bottom-nav .infos li{  position: relative; display: flex;}
    .bottom-nav .infos li p{ font-size: 14px; line-height: 1.5; color: #707070;}
    .bottom-nav .infos li p:first-child{ margin-right: 40px;}
    .bottom-nav .copyright{ transform: scale(0.7,0.7); transform-origin:0 0; color: rgba(255,255,255,0.5); }
    .bottom-nav .icon-wechat{ position: absolute; top: 90px; right: 0; cursor: pointer;}
</style>

<template>
    <footer class="bottom-nav">
        <section>
            <!-- <div class="logo"><img src="../assets/images/logo-bottom.png" width="115"> </div> -->
            <ul class="infos flex_sb">
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
                <li>
                    <div class="copyright">Shenzhen TAUPAI Culture Communication Co.&copy;</div>
                </li>
            </ul>
        </section>
    </footer>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{

            }
        },
        computed:{
            aboutData(){
                return this.$store.state.aboutData;
            }
        },
        mounted(){
            this.$store.dispatch('doGetAbout');
        },
        methods:{
            gotoAbout(){
                if(this.$route.name == 'about'){
                    this.$emit('clickWechat')
                }else{
                    this.$router.push({ name: 'about', params: { top: 1075 }})
                }
            }
        }
    }

</script>

