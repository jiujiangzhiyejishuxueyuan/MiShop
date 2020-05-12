import {exitLogin, reqAddress, reqCart, reqUpdateAdderss, reqUpdateCart, reqUserInfo} from '../api'
import {EXIT_LOGIN, RECEIVE_ADDRESS, RECEIVE_CART, RECEIVE_USERINFO, UPDARE_COMMODITYS} from './mutation-types'

export default {
  //获取用户信息
  async getUserInfo({commit}) {
    let info = await reqUserInfo()
    if(info===0) {
      info={}
    }
    commit(RECEIVE_USERINFO,{info})
  },
  //获取地址簿
  async getAddress({commit}) {
    let address = await reqAddress()
    if(address===0) {
      address=[]
    }
    commit(RECEIVE_ADDRESS,{address})
  },
  //更新地址簿
  async updateAddress({commit},address) {
    await reqUpdateAdderss(address)
    commit(RECEIVE_ADDRESS,{address})
  },
  //获取购物车
  async getCart({dispatch,commit}) {
    let cart = await reqCart()
    if(cart==0) {
      cart=[]
    }
    dispatch('payCommoditys',cart)
    commit(RECEIVE_CART,{cart})
  },
  //更新购物车
  async updateCart({commit},cart) {
    await reqUpdateCart(cart)
    commit(RECEIVE_CART,{cart})
  },
  //更新已选择商品
  updateCommoditys({commit},commoditys) {
    commit(UPDARE_COMMODITYS,{commoditys})
  },
  //退出登陆
  async exitLogin({commit}) {
    await exitLogin()
    commit(EXIT_LOGIN)
  },
  //计算已选择商品
  payCommoditys({commit},cart) {
    const commoditys = {
      items: cart.filter(item => {
        return item.isSelected === true
      }),
      num: cart.reduce((toast, item) => {
        return toast + (item.isSelected ? item.num : 0)
      }, 0),
      price: cart.reduce((toast, item) => {
        return toast + (item.isSelected ? item.price * item.num : 0)
      }, 0)
    }
    commit(UPDARE_COMMODITYS,{commoditys})
  }
}
