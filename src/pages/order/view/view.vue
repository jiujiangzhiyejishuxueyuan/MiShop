<template>
    <div class="view-container">
        <div class="page-wrap" v-if="orderContent">
            <div class="order-view-section">
                <div class="order-view-block order-view-num">
                    <div class="ui-flex align-start justify-space-between">
                        <div class="order-view-info-text"><p>
                            订单编号：{{orderContent._id}}</p>
                            <p>订单状态：{{orderState.stateText}}</p></div>
                    </div>
                </div>
            </div>
            <div class="order-view-block order-view-status">
                <ul>
                    <li class="done">
                        <span class="status">下单</span>
                        <span class="time">{{orderContent.createTime | dataFormat }}</span>
                    </li>
                    <li :class="{done:orderContent.step!=2}">
                        <span class="status">付款</span>
                        <span class="time" v-if="orderContent.payTime">{{orderContent.payTime | dataFormat}}</span>
                    </li>
                    <li :class="{done:orderContent.step!=2}">
                        <span class="status">配货</span>
                        <span class="time" v-if="orderContent.payTime">{{orderContent.payTime | dataFormat}}</span>
                    </li>
                    <li :class="{done:orderContent.step!=2}">
                        <span class="status">出库</span>
                        <span class="time" v-if="orderContent.payTime">{{orderContent.payTime | dataFormat}}</span>
                    </li>
                    <li :class="{done:orderContent.step===3||orderContent.step===5}">
                        <span class="status">交易成功</span>
                        <span class="time" v-if="orderContent.successTime">{{orderContent.successTime | dataFormat}}</span>
                    </li>
                </ul>
            </div>
            <div class="order-view-product">
                <ul>
                    <li class="product-block-warp"
                        v-for="(product,index) in orderContent.items"
                        :key="index"
                        @click="$router.push(`/detail/${product.goodsId}`)"
                    >
                        <div class="product-block ui-flex align-start justify-space-between">
                            <img v-lazy="product.color.imgUrl">
                            <div class="infor flex">
                                <div class="ui-flex align-start">
                                    <div class="product-name">
                                        <p>{{product.goodsName+' '+ (product.option==product.color.title ? product.option :product.option+product.color.title)}}</p></div>
                                    <div class="product-price">
                                        <p class="price-wrap">
                                            <span class="price-unit">¥</span>
                                            <span class="prixce-num"> {{product.price}}</span>
                                        </p>
                                        <p class="product-num">x {{product.num}}</p></div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="order-view-block order-view-text order-view-orderInfo">
                <p>商品价格：{{orderContent.price}} 元</p>
                <p>配送费用：{{orderContent.param.yf}} 元</p>
                <p>实付金额：{{orderContent.price}} 元</p>
            </div>
            <div class="order-view-block order-view-text order-view-orderInfo">
                <p>下单日期：{{orderContent.createTime | dataFormat}}</p>
                <p class="address">收货地址：<span>{{orderContent.address.content}}</span></p>
                <p>收货人名：{{`${orderContent.address.name} ${orderContent.address.tel}`}}</p>
                <p>收货时间：{{orderContent.param.by}}</p>
                <p>发票类型：电子普通发票</p>
                <p>发票抬头：{{orderContent.param.fp}}</p>
            </div>
            <div class="order-view-block order-view-download">
                <div class="title">如果您想查看电子发票或修改订单信息，请下载小米商城App</div>
                <a href="//m.mi.com/p?fallback=http%3A%2F%2Fs1.mi.com%2Fm%2Fappdownload%2F%3Fmfull_ad"
                   class="btn-download">下载小米商城App</a>
            </div>
            <div class="order-view-action btn-wrap">
                <a class="btn-line btn-left">联系客服</a>
                <a class="btn-line btn-left" v-if="orderContent.step===2">取消订单</a>
                <a @click="controlOrder" class="btn-line"
                   :class="{'btn-primary':orderContent.step!=5}"
                   v-if="orderState.controlText">
                    {{orderState.controlText}}
                </a>
                <a class="btn-line" v-if="orderState.isDelete" @click="deleted">删除订单</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {changeOrderState, deleteOrder, reqOrderView} from '@/api'

    export default {
        data() {
            return {
                orderContent: '', //订单内容
                orderState: '', //订单状态
            }
        },
        methods:{
            controlOrder() {
                const order = this.orderContent
                if(order.step===1) {
                    //确认收货
                    this.$dialog.confirm({message:'确定要确认收货吗?'}).then(async ()=> {
                        //确定
                        const id = await changeOrderState({id:this.orderContent._id,step:3})
                        if(id) {
                            this.$toast('确认收货成功')
                            this.$router.go(0)
                        }
                    }).catch(()=> {
                        //取消
                        this.$toast('取消')
                    })
                } else if(order.step===2) {
                    //跳转支付界面
                    this.$router.push(`/order/pay/${this.orderContent._id}`)
                } else if(order.step===3) {
                    //跳转评价界面
                    this.$router.push(`/comment/edit/${this.orderContent._id}`)
                } else if(order.step===4) {
                    //删除订单
                    console.log('删除订单')
                } else {
                    //申请售后
                    this.$dialog.alert({message:'申请售后成功'})
                }
            },
            deleted() {
                this.$dialog.confirm({message:'确定要删除订单吗?'}).then(()=> {
                    deleteOrder(this.orderContent._id).then(res => {
                        console.log(res)
                        this.$toast('删除订单成功')
                        this.$router.go(-1)
                    })
                }).catch(()=> {
                    //取消
                    this.$toast('取消')
                })
            }
        },
        async created() {
            const id = this.$route.params.id
            const result = await reqOrderView(id)
            if(result === 0) {
                this.$router.push('/login')
            } else if(result===2) {
                this.$dialog.alert({
                    message:'该订单不存在'
                }).then(()=> {
                    this.$router.replace('/order/list/1')
                })
            } else {
                if(result.step!=5) {
                    const isStep =  result.items.every(item => {
                        return item.isComment
                    })
                    if (isStep) {
                        changeOrderState({id:result._id,step:5})
                        result.step = 5
                    }
                }
                this.orderContent = result
                switch (result.step) {
                    case 1 :
                        this.orderState = {stateText:'待收货',controlText:'确认收货'}
                        break
                    case 2 :
                        this.orderState = {stateText:'等待付款',controlText:'立即付款'}
                        break
                    case 3 :
                        this.orderState = {stateText:'已收货',controlText:'评价商品'}
                        break
                    case 4 :
                        this.orderState = {stateText:'已退款',controlText:'',isDelete:true}
                        break
                    case 5 :
                        this.orderState = {stateText:'已收货',controlText:'申请售后',isDelete:true}
                        break
                    default:
                        this.orderState = {stateText:'订单异常',controlText:''}
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .view-container
        padding-top 50px

        .page-wrap
            padding-bottom 56px
            text-align: left;
            background: #f5f5f5;
            font-size: 13px
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;

            .page-order-view .order-view-num .order-view-info-text
                line-height: 20px;
                width: 220px

            .order-view-num
                position relative

            .order-view-block
                padding: 14px 20px;
                margin-bottom: 10px;
                background: #fff;

            .order-view-status
                border-bottom: 1px solid #f6f6f6;
                margin-bottom: 0;

                ul
                    display: box;
                    display: -webkit-box;

                    li
                        -webkit-box-flex: 1;
                        margin-right: 2px;
                        width: 100%;
                        list-style: none;

                        span
                            display block
                            text-align center
                            font-size 12px

                        .status
                            background: #ccc;
                            color: #fff;
                            padding: 6px 0;
                            margin-bottom: 14px;

                        &.done
                            .status
                                background: #0c6;

            .order-view-product
                background: #fff;
                margin-bottom: 10px

                li
                    margin-bottom: .2rem;
                    border-bottom: 1px solid #e7e7e7;

                    &:last-child
                        margin-bottom: 0;

                    .product-block
                        z-index 2
                        padding: 14px 20px
                        position: relative;

                    img
                        margin-right: 12px
                        width: 66px
                        height: 66px

                    .infor
                        .product-name
                            width: 75%
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            -webkit-box-orient: vertical;

                        .product-price
                            width: 25%
                            text-align: right;

                            .price-unit
                                font-size: 12px
                                display: inline-block;
                                vertical-align: 3px;

                            .prixce-num
                                font-size: 16px
                                text-align: left;

                        .product-num
                            padding-top: 11px
                            color: rgba(0, 0, 0, .26);

            .order-view-text
                p
                    line-height 24px

                    &.address
                        display -webkit-box

                        span
                            -webkit-box-flex: 1;
                            width: 100%;
                            display: block;

            .order-view-download
                padding: 11px
                background: #f5f5f5;
                text-align: center;
                padding-top: 0;

                .title
                    padding: 12px 0;
                    color: rgba(0, 0, 0, .6);

                .btn-download
                    display: block;
                    font-size: 14px
                    background: #fff;
                    border: 1px solid #eee;
                    width: 222px
                    height: 33px
                    line-height: 33px
                    margin: 0 auto;
                    color: #333;

            .order-view-action
                background: #fff;
                position: fixed;
                bottom: 0;
                right: 0;
                left: 0;
                padding-bottom 10px
                margin-bottom: 0;
                z-index: 99;
                -webkit-box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
                box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
                .btn-line
                    float right
                    margin: 12px 6px 0;
                    border: 1px solid #ccc;
                    padding: 0 18px
                    height: 33px
                    line-height: 33px
                    color: #333;
                    &.btn-left
                        float left
                .btn-primary
                    background #f95B07
                    color #fff
                    border none
</style>
