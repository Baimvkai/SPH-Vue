// 二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
// 路由配置信息
export default[
    {
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{
            show:true
        }
    },
    {
        path:'/search/:keyword?',
        component:()=>import('@/pages/Search'),
        name:'search',
        meta:{
            show:true
        }
    },
    {
        path:'/login',
        component:()=>import('@/pages/Login'),
    },
    {
        path:'/register',
        component:()=>import('@/pages/Register'),
    },
    {
        path:'/detail/:skuid',
        component:()=>import('@/pages/Detail')
    },
    {
        path:'/AddCartSuccess',
        name:'AddCartSuccess',
        component:()=>import('@/pages/AddCartSuccess')
    },
    {
        path:'/shopcart',
        name:'Shopcart',
        component:()=>import('@/pages/ShopCart'),
    },
    {
        path:'/trade',
        component:()=>import('@/pages/Trade'),
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须从购物车来
            if(from.path=='/shopcart'){
                next()       
            }else{
                // 其他页面停留在当前
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:()=>import('@/pages/Pay'),
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:()=>import('@/pages/PaySuccess'),
    },
    {
        path:'/center',
        component:()=>import('@/pages/Center'),
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向，在项目跑起来的时候，访问/，立马定位在首页
    {
        path:'*',
        redirect:'/home'
    }
]