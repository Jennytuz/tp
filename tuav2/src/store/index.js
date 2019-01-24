import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cateList:[
            {
                id:0,
                cname:'音樂',
                code:'MUSIC',
                child:[
                    {
                        id:1,
                        cname:'海報'
                    }
                ]
            }
        ],
        cateID:[0,0],
        idList:[],
        isGuide:true,
        audio:{},
        aboutData:{},
        indexData:{},
        navActiveIndex:-4
    },
    mutations: {
        doPassGuide (state) {
            state.isGuide = false
        },
        setAudio(state,data){
            state.audio = data;
        },
        setIdList(state,data){
            state.idList = data;
        },
        setCateID(state,data){
            state.cateID = data;
        },
        setNavActiveIndex(state,data){
            state.navActiveIndex = data;
        }
    },
    actions: {
        doGetAbout (context) {
            axios.get('api/ajax_about').then((res)=>{
                let data = res.data;
                context.state.aboutData = data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetCate (context) {
            axios.get('admin/api_v2/cate_list').then((res)=>{
                let data = res.data;
                context.state.cateList = data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetIndex (context) {
            axios.get('admin/api_v2/ajax_home').then((res)=>{
                let data = res.data;
                context.state.indexData = data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        doGetAbout (context) {
            axios.get('admin/api_v2/ajax_about').then((res)=>{
                let data = res.data;
                context.state.aboutData = data;
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});
export default store
