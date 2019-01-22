<style>
    .works-item{ margin-bottom: 18px; width: calc((100vw - 6% - 10px)/2)}
    .works-item .imgs{ background-size: cover;background-repeat: no-repeat;background-position: center center;padding-bottom: 100%;}
    .works-item .infos{margin-top: 10px; display: flex; justify-content: space-between;font-size: 10px;color: #fff;}
    .works-item .infos span{ max-width: 50%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .works-item .infos span:last-child{display:inline-block;transform: scale(.8,.8); transform-origin: top right;}
    .works-item .infos a{ display: block; font-size: 16px; letter-spacing: 1.5px; margin-bottom: 10px; color: #fff; overflow:hidden;}
    .works-item .infos .detail{ font-size: 10px; letter-spacing: 1.5px; line-height: 1.8; margin-bottom: 90px; overflow:hidden;}
    .works-item .time {display: flex; justify-content: space-between; padding-top: 6px; color: #fff; font-size: 10px;}
    .works-item .time span {font-size: 10px; display:inline-block;transform: scale(.6,.6);transform-origin: top left;}
    .works-item .time span:last-child {transform-origin: top right; }
</style>

<template>
    <a href="javascript:;" class="works-item" @click="toDetail(data.id)">
        <div class="imgs" :style="{'backgroundImage':'url('+mainUrl+cover +')'}"></div>
        <div class="infos">
            <span>{{data.title}}</span> <span> {{data.title_ext}}</span>
        </div>
        <div class="time hkLight">
            <span>TIME : {{new Date(parseInt(data.ctime)).format('MM/dd')}}</span>
            <span>{{data.catename}}</span>
        </div>
    </a>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['data','mainUrl','cover','idList',],
        data(){
            return{

            }
        },
        methods:{
            toDetail(id){
                this.$emit('refresh',id);
                // this.$emit('getIdList',this.idList)
                this.$router.push({ name: 'workdetail', params: { id: id }})
            }
        }
    }

</script>

