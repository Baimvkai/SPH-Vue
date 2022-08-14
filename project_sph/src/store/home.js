import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api"
// home模块的小仓库
const state = {
    // state中的初始数据
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    // floor数据
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,value){
        state.categoryList = value
    },
    GETBANNERLIST(state,value){
        state.bannerList = value
    },
    GETFLOORLIST(state,value){
        state.floorList = value
    }
}
const actions = {
    // 通过API的接口函数调用，向服务器发请求
    async getCategoryList(context){
        let result = await reqCategoryList();
        // console.log(result);
        if(result.code == 200){
            let data = result.data.filter(item=>{
                return item.categoryName != "图书、音像、电子书刊"
            })
            // console.log(data);
            context.commit('CATEGORYLIST',data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList(context){
        let result = await reqGetBannerList();
        if(result.code==200){
            context.commit('GETBANNERLIST',result.data)
        }
    },
    // 获取floor数据
    async getFloorList(context){
        let result = await reqFloorList()
        if(result.code == 200){
            context.commit('GETFLOORLIST',result.data)
        }
    }
}
const getters = {}
// 对外暴露
export default{
    state,
    mutations,
    actions,
    getters
}
