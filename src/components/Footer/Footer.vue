<template>
        <footer>
            <div class="box-flex align-center">
                <router-link class="flex" to="/home">
                    <i class="image-icons app-bottom-icon" :class="$route.path== '/home' ? 'icon-home-selected': 'icon-home'" ></i>
                    <span>首页</span>
                </router-link>
                <router-link class="flex" to="/category">
                    <i class="image-icons app-bottom-icon " :class="$route.path== '/category' ? 'icon-category-selected': 'icon-category'"></i>
                    <span>分类</span>
                </router-link>
                <router-link class="flex" to="/discover">
                    <i class="image-icons app-bottom-icon" :class="$route.path== '/discover' ? 'icon-star-selected': 'icon-star'"></i>
                    <span>星球</span>
                </router-link>
                <router-link class="flex" to="/cart">
                    <i class="image-icons app-bottom-icon" :class="$route.path== '/cart' ? 'icon-cart-selected': 'icon-cart'"></i>
                    <span>购物车</span>
                    <em class="bubble" v-if="cartNum">{{ cartNum }}</em>
                </router-link>
                <router-link class="flex" to="/user">
                    <i class="image-icons app-bottom-icon icon-user" :class="$route.meta.id== 'user' ? 'icon-user-selected': 'icon-user'"></i>
                    <span>我的</span>
                </router-link>
            </div>
            <div class="safe-area-inset"></div>
        </footer>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'Footer',
        computed: {
            ...mapState(['cart']),
            cartNum() {
                return this.cart.reduce((toast,item)=> {
                    return toast + item.num
                },0)
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    footer
        position: fixed
        z-index: 9999
        bottom: 0
        left: 0
        right: 0
        box-shadow: 0 3px 14px 2px rgba(0,0,0,.12)
        font-size 12px
        background #fff
        .box-flex
            height 52px
            .flex
                display: block
                color: #999
                position: relative
                .bubble
                    position: absolute;
                    min-width: 16px;
                    height: 16px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 0 3px;
                    font-size: 10px;
                    overflow: hidden;
                    text-align: center;
                    border-radius: 14px;
                    background: #ed4d41;
                    color: #fff;
                    top: 0;
                    left: 50%;
                    -webkit-transform: translate3d(6px,-20%,0);
                    transform: translate3d(.1rem,-20%,0);
                    font-style: normal;
                .app-bottom-icon
                    display: block;
                    width: 1.4rem
                    height: 1.4rem
                    margin: 0 auto .1rem
                .icon-cart
                    background-image url("../../static/imgs/icon-cart.png")
                .icon-category
                    background-image url("../../static/imgs/icon-category.png")
                .icon-home
                    background-image url("../../static/imgs/icon-home.png")
                .icon-star
                    background-image url("../../static/imgs/icon-star.png")
                .icon-user
                    background-image url("../../static/imgs/icon-user.png")
                .icon-cart-selected
                    background-image url("../../static/imgs/icon-cart-selected.png")
                .icon-category-selected
                    background-image url("../../static/imgs/icon-category-selected.png")
                .icon-home-selected
                    background-image url("../../static/imgs/icon-home-selected.png")
                .icon-star-selected
                    background-image url("../../static/imgs/icon-star-selected.png")
                .icon-user-selected
                    background-image url("../../static/imgs/icon-user-selected.png")

</style>
