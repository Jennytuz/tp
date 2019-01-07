<template>
  <div id="map">
    <div id="allmap"></div>
  </div>
</template>
<script>
  export default{
    name:'map',
    mounted(){
　　　this.baiduMap();
    },
    methods:{
      baiduMap: function(){
        var map = new BMap.Map('allmap');
        var point = new BMap.Point(22.5511344137,113.9550486789);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        map.centerAndZoom(point,15);
          
        map.enableScrollWheelZoom();
        map.enableContinuousZoom();
      }
    }
　}
</script>