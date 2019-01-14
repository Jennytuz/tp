<style>
    .works-item{ width: 270px; height:324px;margin: 0 30px 28px 0px;display: block; box-sizing: border-box;  overflow: hidden; position: relative;cursor: pointer;}
    .works-item:nth-child(12n-1),.works-item:nth-child(12n-2),.works-item:nth-child(12n-3),.works-item:nth-child(12n-4),.works-item:nth-child(12n-5),.works-item:nth-child(12n){margin-bottom: 5px;}
    .works-item:nth-child(6n){margin-right: 0;}
    .works-item .img{width: 270px;height: 270px;background-size: cover; background-position: center center;}
    .works-item .img:hover:after{ content: ''; width: 270px; height: 270px; position: absolute; top: 0; left: 0; background-color: rgba(0,0,0,0.5);}
    .works-item .item-title {color: #fff;margin-top: 9px}
    .works-item h3{ font-size: 15px;max-width:50%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .works-item p{max-width:50%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .works-item .time{ padding-top: 10px; color: #fff;position: relative; font-size: 8px;}
    .works-item .time span{ display: block; margin-bottom: 4px;}
</style>

<template>
    <div class="works-item" @click="toDetail(data.id)">
        <div class="img" :style="{backgroundImage:'url('+mainUrl+data.cover+')'}"></div>
        <div class="item-title flex_sb">
            <h3 class="">{{data.title}}</h3>
            <p class="f10">{{data.title_ext}}</p>
        </div>
        <div class="time hkLight flex_sb">
            <span>TIME&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{new Date(parseInt(data.ctime)).format('MM/yyyy')}}</span>
            <div>
            <span v-if="data.cate2 != ''">{{data.catename}}</span>
            </div>
        </div>
    </div>
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

