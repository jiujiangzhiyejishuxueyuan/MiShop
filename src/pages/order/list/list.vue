<template>
    <div class="order-list-page">
        <Header :title="activeName"/>
        <van-tabs v-model="activeName" :animated="true">
                <van-tab :title="item.title" :name="item.name" v-for="(item,index) in orderClass" :key="index">
                    <div class="container" v-if="item.orderList.length">
                        <div class="order-list">
                            <ul>
                                <li v-for="(order,index) in item.orderList" :key="index">
                                    <div class="order-item" @click="$router.push(`/order/view/${order._id}`)">
                                        <div class="item-box-top">
                                            <div class="top-left"><p class="order-data">
                                                <strong>订单日期：</strong>
                                                <span >{{order.createTime | dataFormat}}</span>
                                            </p>
                                                <p class="order-num">
                                                    <strong>订单编号：</strong>
                                                    <span >{{order._id}}</span>
                                                </p>
                                            </div>
                                            <div class="top-right">{{orderState(order.step)}}</div>
                                        </div>
                                        <div class="item-box-center ui-flex align-center " v-for="(commodity,index) in order.items" :key="index">
                                            <img v-lazy="commodity.color.imgUrl" v-if="commodity.color">
                                            <div class="pro-info">
                                                <p class="pro-name">{{`${commodity.goodsName} ${commodity.option}`}}</p>
                                            </div>
                                        </div>
                                        <div class="item-box-bottom">
                                            <span>共{{order.num}}件商品</span>
                                            <span >实付金额：</span>
                                            <strong>{{order.price}}元</strong>
                                        </div>
                                    </div>
                                    <div class="item-box-btn"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="order-null" v-else>
                        <van-empty
                                class="custom-image"
                                image="https://s1.mi.com/m/images/m/empty.png"
                                :description="`您还没有 ${item.title} 订单`"
                        />
                        <recommend/>
                    </div>
                </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {reqOrderList} from "@/api";
    import recommend from '@/components/recommend/recommend'
    import Header from '@/components/Header/Header'

    export default {
        components: {
            Header,
            recommend
        },
        data() {
            return {
                orderClass: [
                    {
                        name:'商品订单',
                        title: '全部',
                        orderList: []
                    },
                    {
                        name:'待付款订单',
                        title: '待付款',
                        orderList: []
                    },
                    {
                        name:'待收货订单',
                        title: '待收货',
                        orderList: []
                    },
                ],
                activeName: '商品订单',
                orderList: '',

            }
        },
        methods: {
            //判断订单状态
            orderState(step) {
                switch (step) {
                    case 1 :return '待收货'
                    case 2 :return '等待付款'
                    case 3 :return '已收货'
                    case 4 :return '已退款'
                    case 5 :return '已收货'
                    default:return '订单异常'
                }
            }
        },
        beforeRouteEnter(to,from,next) {
            const {type} = to.params
            reqOrderList().then((res)=> {
                next(vm => {
                    if(type!=1) {
                        vm.activeName = (type == 2 ? '待付款订单' : '待收货订单')
                    }
                    vm.orderClass[0].orderList = res
                    vm.orderClass[1].orderList = res.filter(item=> {
                        return item.step === 2
                    })
                    vm.orderClass[2].orderList = res.filter(item=> {
                        return item.step === 1
                    })
                })
            })
        },


    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .van-tabs__line
        background-color #ff6700
        height 1px
    .order-list-page
        padding-top 50px
        padding-bottom 52px
        height 100%
        .van-tabs
            height 100%
        .van-tabs__content--animated
            height 100%
        .van-tab__pane-wrapper
            overflow auto
        .van-tab--active
            color #ff6700

        .container
            margin-right: auto;
            margin-left: auto;
            flex-basis: 100%;
            color: rgba(60, 60, 60, .87);
            strong
                font-weight 400
            .order-list
                padding-bottom 100px
                ul
                    overflow hidden
                    li
                        border-top: 11px solid #ececec;
                        padding: 0 18px
                        font-size: 13px
                        display: block;
                        .item-box-top
                            border-bottom: 1px solid #ececec;
                            display: -webkit-box;
                            padding: 18px 0 12px;
                            .top-left
                                -webkit-box-flex: 1;
                                width: 100%;
                                text-align: left;
                                .order-data
                                    font-size: 16px
                                    margin-bottom: 1.6px
                                .order-num
                                    color: #999;
                            .top-right
                                color: #ff5722;
                                font-size: 16px
                        .item-box-center
                            padding: 12px 6px;
                            text-align: left;
                            border-bottom: 1px solid #ececec;
                            img
                                width 55px
                                height 55px
                                margin-right: 12px
                                display: block;
                            .pro-info
                                width 100%
                                p
                                    display: block;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    line-height: 24px
                        .item-box-bottom
                            padding: 12px 0;
                            text-align: right;
                            border-top: 1px solid #ececec;
                            span
                                margin-left 12px
                            strong
                                font-size 16px

</style>
