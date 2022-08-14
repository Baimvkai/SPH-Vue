import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,value){
        state.searchList = value
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList(context,params={}){
        // 当前这个函数（reqGetSearchInfo）在调用获取服务器数据时，至少传递一个参数（空对象）
        // params形参：是当用户派发action时，第二个参数传递过来的
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            context.commit('GETSEARCHLIST',result.data)
        }
    }
}
// 计算属性
// 项目当中getters主要作用时：简化仓库中的数据
const getters = {
    // 当前形参时当前仓库的state
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
// 对外暴露
export default{
    state,
    mutations,
    actions,
    getters
}
