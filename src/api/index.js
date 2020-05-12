import ajax from './ajax'

export const reqCategoryList = () =>ajax('/api/api/categorylist')  //获取分类列表
export const reqCategortProducts = () =>ajax('/api/api/category')  //获取分类所有产品
export const reqdetail = (id) =>ajax(`/api/api/detail?id=${id}`)  //获取商品信息
export const searchProduct = (key) =>ajax(`/api/api/search?key=${key}`) //搜索产品
export const reqBasicInfo = (id) =>ajax(`/api/api/user?id=${id}`) //获取其他用户基本信息
export const reqHome = () =>ajax('/api/api/home') //获取主页数据
export const reqDiscoverRecommend = (start,end) =>ajax(`/api/api/discover/recommend`,{start,end},'POST') //获取星球页推荐数据


export const reqPwdLogin = ({name,pwd}) =>ajax('/api/login/login_pwd',{name,pwd},'POST') //登陆
export const exitLogin = () =>ajax('/api/login/exitlogin') //退出登陆

export const reqUserInfo = () =>ajax('/api/users/info') //获取用户信息
export const reqAddress = () =>ajax('/api/users/address') //获取用户地址簿
export const reqUpdateAdderss = (address) =>ajax('/api/users/updateAddress',{address},'POST') //更新用户地址簿
export const reqCart = () =>ajax('/api/users/cart') //获取购物车
export const reqUpdateCart = (cart) =>ajax('/api/users/updateCart',{cart},'POST') //更新购物车
export const submitOrder = (order) =>ajax('/api/users/submitOrder',{order},'POST') //提交订单
export const reqOrderList = () =>ajax('/api/users/orderList') //获取订单列表
export const reqOrderView = (id) =>ajax(`/api/users/orderView?id=${id}`) //获取订单详情
export const changeOrderState = ({id,step}) =>ajax('/api/users/changeOrderState',{id,step},'POST') //更改订单状态
export const deleteOrder = (id) =>ajax(`/api/users/orderDelete?id=${id}`) //删除订单


export const submitComment = (comment) =>ajax('/api/comment/submit',{comment},'POST') //提交评论
export const reqCommentList = (id) =>ajax(`/api/comment/list?id=${id}`) //获取评论列表
export const reqCommentView = (id) =>ajax(`/api/comment/view?id=${id}`) //获取评论详情

