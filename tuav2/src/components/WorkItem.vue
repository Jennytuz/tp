<style>
    .works-item{ width: 270px; margin: 0 34px 28px 0px;display: block; box-sizing: border-box;  overflow: hidden; position: relative;}
    .works-item .img{width: 270px;height: 270px;background-size: cover; background-position: center center;}
    .works-item .img:hover:after{ content: ''; width: 270px; height: 270px; position: absolute; top: 0; left: 0; background-color: rgba(0,0,0,0.5);}
    .works-item .item-title {color: #fff;margin-top: 9px}
    .works-item h3{ font-size: 18px;max-width:126px;word-break: break-all;text-overflow: ellipsis; overflow: hidden; display: -webkit-box;}
    .works-item h3:hover{ color: #7f7f7f;}
    .works-item .time{ padding: 10px 8px 8px 8px; color: #fff;position: relative; font-size: 12px;}
    .works-item .time span{ display: block; margin-bottom: 4px;}
</style>

<template>
    <a href="javascript:;" class="works-item" @click="toDetail(data.id)">
        <div class="img" :style="{backgroundImage:'url('+mainUrl+data.cover+')'}"></div>
        <div class="item-title flex_sb">
            <h3 class="">{{data.title}}</h3>
            <p class="f14">{{data.title_ext}}</p>
        </div>
        <div class="time hkLight flex_sb">
            <span>TIME&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{new Date(parseInt(data.ctime)).format('MM/yyyy')}}</span>
            <div>
            <span v-if="data.cate2 == ''"><a href="javascript:;" @click="getList(data.cate,0)"> {{data.catename}}</a></span>
            <span v-if="data.cate2 != ''"><a href="javascript:;" @click="getList(data.cate,0)"> {{data.catename}}</a> / <a href="javascript:;"  @click="getList(data.cate,data.cate2)"> {{data.catename2}}</a></span>
            </div>
        </div>
    </a>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['data','mainUrl'],
        data(){
            return{

            }
        },
        computed:{

        },
        methods:{
            toDetail(id){
                this.$emit('refresh',id);
                this.$router.push({ name: 'workdetail', params: { id: id }})
            }
        }
    }

</script>

