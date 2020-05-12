import Vue from 'vue'
import VueRouter from 'vue-router'
import {reqUserInfo} from "@/api";

const category = ()=> import('../pages/category/category')
const home = ()=> import('../pages/home/home')
const cart = ()=> import('../pages/cart/cart')
const discover = ()=> import('../pages/discover/discover')
const user = ()=> import('../pages/user/user')
const detail = ()=> import('../pages/detail/detail')
const login = ()=> import('../pages/login/login')
const address = ()=> import('../pages/address/address')
const addressEdit = ()=> import('../pages/address/addressEdit/addressEdit')
const addressList = ()=> import('../pages/address/addressList/addressList')
const comment = ()=> import('../pages/comment/comment')
const commentEdit = ()=> import('../pages/comment/edit/edit')
const commentList = ()=> import('../pages/comment/list/list')
const commentView = ()=> import('../pages/comment/view/view')
const orderList = ()=> import('../pages/order/list/list')
const orderView = ()=> import('../pages/order/view/view')
const order = ()=> import('../pages/order/order')
const orderCheckout = ()=> import('../pages/order/checkout/checkout')
const pay = ()=>  import('../pages/order/pay/pay')
const paySucceed = ()=> import('../pages/order/pay/pay-succeed')
const set = ()=> import('../pages/user/set/set')
const userMain = ()=> import('../pages/user/main/main')
const search = ()=> import('../pages/search/search')
const searchList = ()=> import('../pages/search/list/list')
const searchMain = ()=> import('../pages/search/main/main')


export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/home'
            ,component: home,
            meta: {
                showFooter: true,
                keep: true
            }
        },
        {
            path: '/search'
            ,component: search
            ,children: [
                {
                    path: ''
                    ,component: searchMain
                },
                {
                    path: 'list/:key'
                    ,component: searchList
                }
            ]
        },
        {
            path: '/cart'
            ,component: cart,
            meta: {
                title: '购物车'
            }
        },
        {
            path: '/category'
            ,component: category,
            meta: {
                showFooter: true,
                title: '分类',
                keep: true
            }
        },
        {
            path: '/user'
            ,component: user,
            children:[
                {
                    path: ''
                    ,component: userMain,
                    meta: {
                        showFooter: true,
                        id: 'user'
                    },
                },
                {
                    path: 'set'
                    ,component: set,
                    meta: {
                        title: '个人中心'
                    }
                    ,beforeEnter:(to,from,next)=> {
                        reqUserInfo().then((res)=> {
                            if(res) {
                                next()
                            } else {
                                next('/login')
                            }
                        })
                    }
                },
                {
                    path: ''
                    ,redirect: ''
                }
            ]
        },
        {
            path: '/discover'
            ,component: discover,
            meta: {
                showFooter: true,
                keep: true
            }
        },
        {
            path: '/detail/:id'
            ,component: detail,
        },
        {
            path: '/login'
            ,component: login
        },
        {
            path:'/address'
            ,component: address
            ,beforeEnter:(to,from,next)=> {
                reqUserInfo().then((res)=> {
                    if(res) {
                        next()
                    } else {
                        next('/login')
                    }
                })

            }
            ,children: [
                {
                    path: 'list'
                    ,component: addressList
                   , meta: {
                        title: '收货地址',
                        rightNone: true
                    }
                },
                {
                    path: 'edit/:id'
                    ,component: addressEdit
                    , meta: {
                        title: '新增地址',
                        rightNone: true
                    }
                },
                {
                    path: ''
                    ,redirect: 'list'
                }
            ]
        },
        {
            path: '/order'
            ,component: order
            ,beforeEnter:(to,from,next)=> {
                reqUserInfo().then((res)=> {
                    if(res) {
                        next()
                    } else {
                        next('/login')
                    }
                })
            }
            ,children:[
                {
                    path: 'list/:type'
                    ,component: orderList
                    ,meta: {
                        showFooter: true,
                        id: 'user'
                    }
                },
                {
                    path: 'view/:id'
                    ,component: orderView
                    ,meta: {
                        title: '订单详情'
                    }
                },
                {
                    path: 'checkout'
                    ,component: orderCheckout
                    , meta: {
                        title: '用户结算',
                        rightNone: true
                    }
                },
                {
                    path: 'pay/:id'
                    ,component: pay
                },
                {
                    path: 'paySucceed'
                    ,component: paySucceed
                }
            ]
        },
        {
            path: '/comment'
            ,component: comment
            ,children:[
                {
                    path: 'list/:id'
                    ,component: commentList
                    ,meta: {
                        title: '商品评论'
                    }
                },
                {
                    path: 'view/:id'
                    ,component: commentView
                    ,meta: {
                        title: '评论详情'
                    }
                },
                {
                    path: 'edit/:id'
                    ,component: commentEdit
                }
            ]
        },
        {
            path: ''
            ,redirect: '/home'
        }
    ]
})



Vue.use(VueRouter)
