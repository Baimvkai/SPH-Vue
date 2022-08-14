import { reqCartList,reqDeleteCartbyId,reqUpdateCheckedById } from "@/api"

const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions={
    // 获取购物车列表数据
    async getCartList(context){
        let result = await reqCartList()
        if(result.code==200){
            context.commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBuSkuId(context,skuId){
        let result = await reqDeleteCartbyId(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品选中状态
    async updateCheckedById(context,{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的商品
    deleteAllCheckedCart({dispatch,getters}){
        // 获取购物车中全部产品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBuSkuId',item.skuId):''
            // 将每一次返回的promise添加到数组中
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{
                skuId:item.skuId,
                isChecked
            })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters={
    cartList(){
        return state.cartList[0] || {}
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}