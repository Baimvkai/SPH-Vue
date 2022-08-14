import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 先把VueRouter原型对象的push|replace，先保存一份
let originPush = VueRouter.prototype.push

let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call|apply区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

router.beforeEach(async(to,from,next)=>{
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 用户登陆了
    if(token){
        // 想去登录与注册--不行
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            // 访问的是非登录与注册
            if(name){
                next()
            }else{
                // 登陆了没有用户信息
                // 在跳转前获取用户信息
                try {
                    await store.dispatch('getUserInfo'),
                    next()
                } catch (error) {
                    // token失效重新登录
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录不能去支付相关、个人中心、交易相关等界面，跳到登录
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            // 把未登录时候没有去成的信息存储在地址栏中
            next('/login?redirect='+toPath)
        }
        else{
            // 不是上方路由，放行
            next()
        }
        
    }
    
})

export default router