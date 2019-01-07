<template>
  <div id="BMap" style="width:100%;height:243px">
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