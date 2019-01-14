<style>
.container {width: 1800px;height:650px;overflow: hidden}
.item-list {display: flex;flex-wrap: wrap;}
.container-vertical > .wrapper {flex-direction: row;flex-wrap: wrap;}
.button-prev,.button-next {position:absolute; bottom: 70px;}
.button-prev{ left: 49%;}  
.button-next{ left: 51%;}  
</style>

<template>
    <div>
        <top-nav @getID="getListData"></top-nav>
        <second-nav @getID="getListData"></second-nav>
        <body-frame>
            <div style="height:750px;position:relative">
                <section class="container">
                    <div class="item-list">
                        <work-item v-for="item in proList"
                                :data="item"
                                :mainUrl="domain_url"
                                :key="item.id" class="slide"></work-item>
                    </div>
                </section>
                <div class="button-prev">
                    <img src="../assets/images/arrow-up.png" width="30" alt="">
                </div>
                <div class="button-next">
                    <img src="../assets/images/arrow-down.png" width="30" alt="">
                </div>
            </div>
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
                pageSize:24,
                domain_url:"",
                proList:[],
                isListEnd:false,
                isLoading:false,
                // swiperOption:{
                //     // notNextTick: true,
                //     slidesPerView:'auto',
                //     slidesPerColumn:1,
                //     slidesPerGroup:2,
                //     height:650,
                //     direction: 'vertical',
                //     navigation: {
                //         nextEl: '.button-next',
                //         prevEl: '.button-prev'
                //     },
                //     on: {
                //         slideNextTransitionEnd: function() {
                //             if(this.slides.length < )
                //             that.imgIndex = this.realIndex + 1;
                //         }
                //     }
                // },
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
            },
            initBtn(){
                
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

