<template>
<div class="qrcode">
  <qrcode-vue :value="link" :size="size" level="H"></qrcode-vue>
</div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
 
export default {
    props:['link'],
    data() {
        return {
        size: 119,
        value:'',
        background:'#444'
        }
    },
    components: {
        QrcodeVue
    }
}
</script> 