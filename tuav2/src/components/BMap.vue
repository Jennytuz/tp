<style>
    #BMap {height: 243px;width:100%}
    @media screen and (max-width:1920px) { 
        #BMap {height: 192px}
    }
</style>
<template>
  <div id="BMap">
    <div id="allmap" style="height:100%;"></div>
  </div>
</template>
<script>
  export default{
    name:'app',
    mounted(){
　　　this.baiduMap();
    },
    methods:{
      baiduMap: function(){
        var map = new BMap.Map('allmap');
        var point = new BMap.Point(113.9550486789,22.5511344137);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        map.centerAndZoom(point,15);
        map.setCurrentCity("深圳");  
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
      }
    }
　}
</script>