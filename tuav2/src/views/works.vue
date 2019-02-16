<style>
.container {width: 1800px;height:677px;overflow: hidden}
.list {display: flex;flex-wrap: wrap;justify-content: space-between;}
.list:after {content: "";flex: auto;}
.button-prev,.button-next {position: absolute;margin: 5px}
.button-prev{left: 47%; }  
.button-next{left: 50%; }  
.works-contain {height:800px;position:relative}
@media screen and (max-width:1910px) {
    .container{width: 1370px;height: 531px;}
    .works-contain {height:531px; }
}
</style>

<template>
    <div>
        <top-nav @getID="getListData"></top-nav>
        <second-nav @getID="getListData" @goFirstPage="goFirstPage"></second-nav>
        <body-frame>
            <div class="works-contain">
                <section class="container" id="workContain">
                    <div id="list" class="list">
                        <work-item v-for="item in proList"
                                :data="item"
                                :mainUrl="domain_url"
                                :key="item.id" class="slide"></work-item>
                    </div>
                </section>
                <div class="flex_v_c" style="justify-content:center;position:relative;margin:40px 0 20px;">
                    <div class="button-prev" v-show="showPrev" @click="prevPage">
                        <img src="../assets/images/arrow-up.png" width="30" alt="">
                    </div>
                    <div class="button-next" v-show="showNext" @click="nextPage">
                        <img src="../assets/images/arrow-down.png" width="30" alt="">
                    </div>
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
                currentPage:1,
                showPrev:false,
                showNext:true,
                // container: ,
                domain_url:"",
                proList:[],
                idList:[],
                isListEnd:false,
                isLoading:false,
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
                self.$ajax.get('index.php/admin/api_v2/product_list',{
                    params: {
                        page: self.pageNo,
                        pageSize:12,
                        cate: self.cateID[0],
                        cate2: self.cateID[1]
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.domain_url = data.domain_url;
                    if(load == 'refresh'){
                        self.proList = data.data.list;
                        self.idList = data.data.list.map(function(val){return val.id;});
                        self.$store.commit('setIdList',self.idList);
                    }else if(load == 'loadmore'){
                        if(data.data.list.length >0){
                            data.data.list.map((item)=>{
                                self.proList.push(item);
                                self.idList.push(item.id);
                            })
                        }
                        self.$store.commit('setIdList',self.idList);
                    }
                    if(self.proList.length == data.data.nums){
                        self.isListEnd = true;
                    }
                        self.initBtn()
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
                if(this.currentPage == 1){
                    this.showPrev = false;
                }
                if(this.isListEnd && this.proList.length /12 < this.currentPage){
                    this.showNext = false
                }
                else {
                    this.showNext = true
                }
            },
            goFirstPage(){
                this.currentPage = 1;
                var el = document.getElementById('list');
                el.style.cssText = 'transform: translate3d(0, 0px, 0px); transition-duration: 500ms;';
                this.initBtn()
            },
            prevPage(){
                var el = document.getElementById('list');
                var h = document.getElementById('workContain').offsetHeight;
                el.style.cssText = 'transform: translate3d(0, -'+ h * (this.currentPage - 2) +'px, 0px); transition-duration: 500ms;';
                this.currentPage --;
                this.initBtn()
            },
            nextPage(){
                this.currentPage ++;
                this.loadMore()
                this.showPrev = true;
                var el = document.getElementById('list')
                var h = document.getElementById('workContain').offsetHeight;
                el.style.cssText = 'transform: translate3d(0, -'+ h * (this.currentPage - 1 ) +'px, 0px); transition-duration: 500ms;';
                this.initBtn()
            },
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            },
            activeIndex(){
                return this.$store.state.navActiveIndex
            },
            idList(){
                return this.$store.state.idList
            }
        }

    }

</script>

