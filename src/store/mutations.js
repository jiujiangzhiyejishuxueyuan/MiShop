import {EXIT_LOGIN, RECEIVE_ADDRESS, RECEIVE_CART, RECEIVE_USERINFO, UPDARE_COMMODITYS} from "./mutation-types";

export default {
    [RECEIVE_USERINFO](state,{info}) {
        state.userInfo = info
    },
    [RECEIVE_ADDRESS](state,{address}) {
        state.address = address
    },
    [RECEIVE_CART](state,{cart}) {
        state.cart = cart
    },
    [UPDARE_COMMODITYS](state,{commoditys}) {
        state.commoditys = commoditys
    },
    [EXIT_LOGIN](state) {
        state.userInfo = {}
        state.commoditys = []
        state.cart = []
        state.address = []
    }
}
