import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块uuid
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息
    async getGoodInfo(context,value){
        let result = await reqGoodsInfo(value)
        if(result.code==200){
            context.commit('GETGOODINFO',result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart(context,{skuId,skuNum}){
        // 没有返回数据，不用提交给mutation
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        console.log(result);
        // 代表加入购物车成功
        if(result.code==200){
            return 'ok'
          }else{
            // 代表加入购物车失败
            return Promise.reject(new Error(result.message))
          }
    }
}
const getters = {
    // 路径导航
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default{
    state,
    mutations,
    actions,
    getters 
}