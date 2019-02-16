<style>
.works-nav {display: flex;justify-content: center; color: #fff;margin: 100px 0 0px}
.works-nav li{width: 90px; }
.works-nav li.active {border-bottom: 1px solid #FF7200}
.works-nav li a{color: #fff;}
.works-nav li a div {text-align-last: justify;width:40px;margin: 0 auto;}
.works-nav li a span {transform: scale(0.7,0.7);transform-origin: center center;display: block;}
</style>

<template>
    <ul class="works-nav tc f12">
        <li :class="activeIndex == -2 ? 'active' : ''">
            <a href="javascript:;"
                @click="getList(-2,0,0)">
                <div>全部</div>
                <span class="f12">ALL</span>
            </a>
        </li>
        <li v-for="(item,index) in cateList"
            :class="activeIndex == index ? 'active' : ''" :key="">
            <a href="javascript:;"
                @click="getList(index,item.id,0)">
                    <div>{{item.cname}}</div>
                    <span class="f12">{{item.code}}</span>
            </a>
        </li>
    </ul>
</template>
<script type="es6">
    export default{
        name: 'App',
        data(){
            return{
                activeIndex2:-4//首页-1，全部-2，关于页-3
            }
        },
        methods:{
            getList(index,id,id2){
                this.$store.commit('setNavActiveIndex',index);
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
                this.$emit('goFirstPage', '')
            },
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            },
            activeIndex(){
                return this.$store.state.navActiveIndex
            }
        }
    }
</script>