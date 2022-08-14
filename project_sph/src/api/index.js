// 当前这个模块：API进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList = ()=>{
    // 发请求
    return requests({
        url:'/product/getBaseCategoryList',
        method:'GET'
    })
}

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = ()=>mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () =>mockRequests.get('/floor')

// 获取搜索模块数据
export const reqGetSearchInfo = (params)=>requests({
    url:'/list',
    method:'POST',
    data:params
})

// 获取商品详情数据
export const reqGoodsInfo = (skuId)=>requests({
    url:`/item/${skuId}`,
    method:'GET'
})

// 将产品添加到购物车中（或更新产品个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'POST'
})

// 获取购物车数据
export const reqCartList = ()=>requests({
    url:'/cart/cartList',
    method:'GET'
}) 

// 删除购物车数据
export const reqDeleteCartbyId = (skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'DELETE'
})

// 修改商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'GET'
})

// 获取验证码
export const reqGetCode = (phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'GET'
})

//注册
export const reqUserRegister = (data)=>requests({
    url:'/user/passport/register',
    method:"POST",
    data
}) 

// 登录
export const reqUserLogin = (data) =>requests({
    url:'/user/passport/login',
    method:"POST",
    data
})

// 获取用户信息(带用户的token)
export const reqUserInfo=()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'GET'
})

// 退出登录
export const reqLogout = ()=>requests({
    url:'/user/passport/logout',
    method:'GET'
})

// 获取用户地址信息
export const reqAddressInfo = ()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'GET'
})

// 获取商品清单
export const reqOrderInfo = ()=>requests({
    url:'/order/auth/trade',
    method:'GET'
})

// 提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'POST',
    data
})

// 获取支付信息
export const reqPayInfo = (orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'GET'
})

// 获取支付订单状态
export const reqPayStatus = (orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'GET'
})

// 获取我的订单列表
export const reqOrderList = (page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'GET'
})