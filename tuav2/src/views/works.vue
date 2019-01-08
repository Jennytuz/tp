<style>
.item-list {width: 1800px;height:650px}
.swiper-container-vertical > .swiper-wrapper {flex-direction: row;flex-wrap: wrap;}
.swiper-button-prev,.swiper-button-next {background-image: none;}
.swiper-button-prev.arrow.left{  bottom: 10px;left: 48%;transform: rotate(-90deg);}  
.swiper-button-next.arrow.right{  bottom: 10px;left: 52%;transform: rotate(90deg);}  
</style>

<template>
    <div>
        <top-nav @getID="getListData"></top-nav>
        <second-nav @getID="getListData"></second-nav>
        <body-frame>
                <swiper :options="swiperOption" class="item-list">
                    <work-item v-for="item in proList"
                            :data="item"
                            :mainUrl="domain_url"
                            :key="item.id" class="swiper-slide"></work-item>
                <div class="swiper-button-prev arrow left" slot="button-prev"></div>
                <div class="swiper-button-next arrow right" slot="button-next"></div>
                </swiper>
        </body-frame>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import SecondNav from '@/components/SecondNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import WorkItem from '@/components/WorkItem.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,SecondNav,BottomNav,WorkItem,BodyFrame},
        mounted(){
            this.getListData(this.$store.state.cateID);
        },
        data(){
            return{
                cateID:[0,0],
                pageNo:1,
                pageSize:20,
                domain_url:"",
                proList:[],
                isListEnd:false,
                isLoading:false,
                swiperOption:{
                    // notNextTick: true,
                    slidesPerView:2,
                    slidesPerGroup:2,
                    direction: 'vertical',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    } 
                },
                activeIndex2: -4//首页-1，全部-2，关于页-3
            }
        },
        methods:{
            getListData(id){
                this.cateID = id;
                this.pageNo = 1;
                this.isListEnd = false;
                this.doGetProList('refresh');
            },
            getList(index,id,id2){
                this.$store.commit('setNavActiveIndex',index);
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
            },
            doGetProList(load){
                let self = this;
                if(self.isListEnd) return;
                self.isLoading = true;
                self.$ajax.get('admin/api_v2/product_list',{
                    params: {
                        page: self.pageNo,
                        pageSize:10,
                        cate: self.cateID[0],
                        cate2: self.cateID[1]
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.domain_url = data.domain_url;
                    if(load == 'refresh'){
                        self.proList = data.data.list;
                    }else if(load == 'loadmore'){
                        if(data.data.list.length >0){
                            data.data.list.map((item)=>{
                                self.proList.push(item)
                            })
                        }
                    }
                    if(self.proList.length == data.data.nums){
                        self.isListEnd = true;
                    }
                    self.isLoading = false;
                }).catch((error)=>{
                    console.log(error);
                })
            },
            loadMore(){
                if(this.isListEnd) return;
                this.pageNo ++;
                this.doGetProList('loadmore');
            }
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

