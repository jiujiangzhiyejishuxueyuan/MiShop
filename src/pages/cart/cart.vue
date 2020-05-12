<template>
    <div class="cart-view">
        <div class="page-warp">
            <div class="cart-list" v-if="userInfo.name&&cart.length">
                <ul>
                    <li class="item" v-for="(item,index) in cart" :key="index">
                        <div class="ui-flex align-center justify-center">
                            <div class="choose unchecked" :class="{checked:item.isSelected}" @click="pitch(item)"></div>
                            <router-link :to="`/detail/${item.goodsId}`" class="imgProduct">
                                <img v-lazy="item.color.imgUrl">
                            </router-link>
                            <div class="info">
                                <div class="item-text ui-flex align-start">
                                    <div class="name">{{`${item.goodsName} ${item.option} ${item.color.title}`}}</div>
                                </div>
                                <div class="price-without">
                                    <span>售价：</span>
                                    <span class="mr-10">{{item.price}}元</span>
                                </div>
                                <div class="num">
                                    <van-stepper
                                            v-model="item.num"
                                            button-size="33px"
                                            :disable-input="true"
                                            @plus="change(1,item)"
                                            @minus="change(0,item)"
                                    />
                                    <div class="delete" @click="deleteCommodity(index)">
                                        <i class="image-icons icon-delete"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ui-line"></div>
                    </li>
                </ul>
                <div class="point-box">
                    <div class="point"><p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p></div>
                </div>
                <div class="ui-line"></div>
            </div>
            <van-cell title="登录后享受更多优惠" is-link to="/login" value="去登陆" v-if="!userInfo.name"/>
            <div class="noitems" v-if="!cart.length">
                <router-link to="/home">
                    <span>购物车还是空的</span>
                    <em >去逛逛</em>
                </router-link>
            </div>
            <recommend/>
        </div>
        <div class="bottom-submit" v-if="userInfo.name&&cart.length">
            <div class="box-flex">
                <div class="price-box flex">
                    <span>共{{commoditys.num}}件 金额：</span><br>
                    <strong>{{commoditys.price}}</strong>
                    <span>元</span>
                </div>
                <a href="#/category" class="btn disable black flex">继续购物</a>
                <a class="btn flex" @click="go">去结算</a>
            </div>
            <div class="safe-area-inset"></div>
        </div>
        <Footer v-else/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Footer from "@/components/Footer/Footer";
    import recommend from "@/components/recommend/recommend";

    export default {
        name: 'cart',
        components: {
            Footer,
            recommend
        },
        data() {
            return {
                title: '购物车',
                value: 1,
            }
        },
        methods: {
            pitch(item) {
                item.isSelected = !item.isSelected
                this.updateCart()
            },
            change(num, item) {
                if (num) {
                    item.num++
                } else {
                    item.num--
                }
                this.updateCart()
            },
            go() {
                if (this.commoditys.items.length) {
                    this.$router.push('/order/checkout')
                } else {
                    this.$dialog({message: '请勾选需要结算的商品'});
                }
            },
            deleteCommodity(index) {
                this.cart.splice(index,1)
                this.updateCart()
            },
            updateCart() {
                this.$store.dispatch('updateCart', this.cart)
            }
        },
        computed: {
            ...mapState(['cart','userInfo']),
            commoditys() {
                const {cart} = this
                const obj = {
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
                this.$store.dispatch('updateCommoditys', obj)
                return obj
            }
        },
        created() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

    .page-warp
        padding-top 50px
        height 100%
        overflow-x hidden
        overflow-y auto
        .noitems
            background: #ebebeb;
            padding: 12px;
            a
                height: 66px;
                font-size: 14px;
                text-decoration: none;
                text-align: center;
                span
                    display: inline-block;
                    line-height: 48px;
                    background: url(../../static/imgs/cartnull.png) no-repeat 0;
                    background-size: auto 100%;
                    padding: 0 8px 0 52px;
                    color: rgba(0,0,0,.27);
                em
                    display: inline-block;
                    border: 1px solid rgba(0,0,0,.15);
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 13px;
                    color: rgba(0,0,0,.87);
                    font-style: normal;
        .van-cell
            padding 16px 0

            .van-cell__title
                font-size 17px

        .cart-list
            background-color #fff

            .point-box
                background-color #fff

                .point
                    width 100%
                    height 38px
                    font-size 12px
                    color #999999
                    padding 12px 16px
                    text-align left

            .item
                border-bottom 1px solid #f6f6f6
                line-height 0

                .info
                    width 100%
                    text-align left

                    .delete
                        float right
                        margin-right 12px
                        display block

                        .icon-delete
                            width 34px
                            height 34px
                            background-image url("../../static/imgs/delete.png")

                    .price-without
                        padding 8px 0
                        font-size 14px
                        color #999
                        margin-bottom 8px

                    .num
                        .van-stepper
                            display inline-block

                            input
                                border-bottom solid 1px #f4f4f4
                                background-color #fff
                                border-top solid 1px #f4f4f4
                                font-size 18px

                    .item-text
                        font-size 16px
                        line-height 18px
                        color #666
                        margin-bottom 8px
                        margin-right 18px
                        padding 0


                .imgProduct
                    display block
                    position relative
                    width 100px
                    height 100px
                    margin-right 12px
                    border 1px solid #eee
                    border-radius 2px

                    img
                        width auto
                        height 100%

            .ui-flex
                padding 15px 0

                .unchecked
                    background url("../../static/imgs/check-normal.png") 50% 50% no-repeat

                .checked
                    background url("../../static/imgs/check-press.png") 50% 50% no-repeat

                .choose
                    background-size 24px 24px
                    width 34px
                    padding 0 12px
                    height 100px


    .bottom-submit
        position fixed
        bottom 0
        left 0
        right 0
        background #fff
        z-index 99
        -webkit-box-shadow 0 3px 14px 2px rgba(0, 0, 0, .12)
        box-shadow 0 3px 14px 2px rgba(0, 0, 0, .12)

        .black
            color #333

        .disable
            background #f4f4f4
            border 1px solid #f4f4f4

        .price-box
            font-size 15px
            color #999
            width 100%
            text-align center
            padding-top 8px

            strong
                font-size 24px
                color #ff5722
                margin-right 12px

            .btn
                display block
                width 100%
</style>
