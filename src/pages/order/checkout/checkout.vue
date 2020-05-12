<template>
    <div class="checkout-view">
        <addressCard :address="defaultAddress" v-if="defaultAddress"/>
        <div class="ui-line"></div>
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell :title="item" v-for="(item,index) in list" :key="index" @click="radio = `${index}`">
                    <template #right-icon>
                        <van-radio :name="`${index}`"/>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <div class="ui-line"></div>
        <van-collapse v-model="activeNames">
            <van-cell title="运费" :value="yf"/>
            <van-collapse-item :title="yf" name="1" :value="ddList[ddNum]">
                <div class="dd-part">
                    <div class="dd-title">配送方式</div>
                    <ul class="ui-radio-button shipment">
                        <li>{{yf}}</li>
                    </ul>
                </div>
                <div class="gap-line"></div>
                <div class="dd-part">
                    <div class="dd-title">送货时间</div>
                    <ul class="ui-radio-button">
                        <li v-for="(dd,index) in ddList"
                            :key="index"
                            @click="ddNum = index"
                            :class="{on: ddNum===index}">
                            {{dd}}
                        </li>
                    </ul>
                </div>
            </van-collapse-item>
            <van-collapse-item title="电子普通发票" name="2" :value="fpList[fpNum]">
                <div class="dd-part">
                    <div class="dd-title">发票类型</div>
                    <ul class="ui-radio-button">
                        <li class="on">电子普通发票</li>
                    </ul>
                    <p>提示：该订单商品只提供电子发票</p>
                    <p>电子发票是税务局认可的有效凭证，其法律效力、基本用途 及使用规定同纸质发票。推荐使用电子发票，不怕丢失，更方便、环保。</p>
                </div>
                <div class="gap-line"></div>
                <div class="invoice-part">
                    <div class="dd-title">选择发票抬头</div>
                    <ul class="ui-radio-button mb20">
                        <li v-for="(item,index) in fpList"
                            :key="index"
                            @click="fpNum = index"
                            :class="{on: fpNum===index}">
                            {{item}}
                        </li>
                    </ul>
                    <p>提示：电视和会员年卡同时购买只提供电子发票</p></div>
            </van-collapse-item>
            <van-collapse-item title="优惠券" name="3" value="已优惠 0元">
                <div class="dd-unfold">
                    <div class="dd-part">
                        <div class="dd-title">使用优惠券码</div>
                        <div class="ui-flex">
                            <div class="ui-box-flex">
                                <div class="ui-input">
                                    <input type="text" placeholder="请输入优惠券码"></div>
                            </div>
                            <a href="javascript:;" class="ui-input-btn">确定</a></div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
        <div class="ui-line"></div>
        <div class="commodity">
            <div class="b8w" v-for="(commodity,index) in commoditys.items" :key="index">
                <div class="b81">
                    <img :src="commodity.color.imgUrl">
                </div>
                <div class="b82">
                    <div class="name"><p><span>{{`${commodity.goodsName} ${commodity.option} ${commodity.color.title}`}}</span>
                    </p></div>
                </div>
                <div class="b83">
                    <div class="item-price">
                        <span v-if="commodity.num>1">{{commodity.num}} x </span>
                        <strong>{{commodity.price}}.00</strong>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui-line"></div>
        <div class="cost">
            <p><strong>商品价格：</strong><span>{{commoditys.price}}.00</span></p>
            <p><strong>优惠：</strong><span>-0.00</span></p>
            <p><strong>配送费用：</strong><span>{{this.commoditys.price>99 ? '0' : yfPrice}}.00</span></p>
        </div>
        <div class="ui-line"></div>
        <div class="bottom">
            <div class="info-tips" v-if="defaultAddress">
                <p>配送至：{{`${defaultAddress.province} ${defaultAddress.city} ${defaultAddress.county} ${defaultAddress.addressDetail}` || ''}}</p>
            </div>
            <div class="ui-flex">
                <div class="b71 ui-box-flex">
                    <span >共{{commoditys.num}}件 合计: </span>
                    <strong>{{commoditys.price}}.00</strong>
                </div>
                <div class="b72 ui-box-flex">
                    <a class="btn" @click="submitOrder"><span>去付款</span></a>
                </div>
            </div>
            <div class="safe-area-inset"></div>
        </div>
    </div>
</template>

<script>
    import addressCard from "@/components/addressCard/addressCard";
    import {mapState} from 'vuex'
    import {submitOrder} from "@/api";

    export default {
        data() {
            return {
                radio: '1',
                list: [
                    '支付宝', '小米钱包', '微信支付', '银联支付', '翼支付', '信用卡分期'
                ],
                ddList: [
                    '不限送货时间', '工作日送货', '双休日、假日送货'
                ],
                ddNum: 0,
                activeNames: [''],
                fpList: [
                    '个 人', '单 位'
                ],
                fpNum: 0,
                yfPrice: 10,

            }
        },
        computed:{
            ...mapState(['address','commoditys','cart']),
            defaultAddress() {
                const {address} = this
                return address.find(item=> {
                    return item.isDefault === true
                }) || address[0]
            },
            yf() {
                return this.commoditys.price>99 ? '包邮' : `快递配送（运费 ${this.yfPrice} 元）`
            }
        },
        methods:{
            async submitOrder() {
                let {commoditys,defaultAddress,cart} = this
                commoditys.address = {
                    content: `${defaultAddress.province}${defaultAddress.city}${defaultAddress.county}${defaultAddress.addressDetail}`,
                    name: defaultAddress.name,
                    tel: defaultAddress.tel

                }
                commoditys.param = {
                    yf: this.commoditys.price>99 ? 0 : this.yfPrice,
                    by: this.ddList[this.ddNum],
                    fp: this.fpList[this.fpNum]
                }
                commoditys.step = 2
                const result = await submitOrder(this.commoditys)
                if(result) {
                    cart = cart.filter((item)=> {
                        for (let i=0; i<commoditys.items.length; i++) {
                            if(item.goodsId === commoditys.items[i].goodsId) {
                                if (item.color.title === commoditys.items[i].color.title&&item.option === commoditys.items[i].option) {
                                    return false
                                }
                            }
                        }
                        return true
                    })
                    this.$store.dispatch('updateCart',cart)
                    this.$router.replace(`/order/pay/${result}`)
                }
            }
        },
        components: {
            addressCard
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    b, strong
        font-weight: inherit;
        font-weight: bolder;

    .checkout-view
        padding 50px 0 90px

        .van-radio-group
            .van-cell
                height 50px
                text-align left
                padding-left 40px
                margin-left 15px
                background-size: 30px 30px;
                background-position 0 50%
                background-repeat no-repeat
                width: 92%;
                padding-right: 0;

                .van-radio__icon--checked
                    .van-icon-success
                        background-color: #ff6700;
                        border-color: #ff6700;

                &:after
                    transform: scaleY(1);

                &:nth-child(1)
                    background-image url('../../../static/imgs/pay_zfb.png')

                &:nth-child(2)
                    background-image url('../../../static/imgs/pay-mi.png')

                &:nth-child(3)
                    background-image url('../../../static/imgs/pay_wx.png')

                &:nth-child(4)
                    background-image url('../../../static/imgs/pay_yl.png')

                &:nth-child(5)
                    background-image url('../../../static/imgs/pay_yzf.png')

                &:nth-child(6)
                    background-image url('../../../static/imgs/pay_xyk.png')

        .van-collapse
            text-align left

            .van-cell__title
                color #3c3c3c
                font-weight: bolder

            .van-cell__value
                color #bdbdbd

            .van-collapse-item__content
                background: #f5f5f5;
                padding: 0 24px;
                -webkit-transition: max-height .3s ease-in-out;
                transition: max-height .3s ease-in-out;
                overflow: hidden;

                p
                    color: #bdbdbd;
                    font-size: 10px;
                    margin-top: 5px;

                .dd-title
                    color: #6a6a6a;
                    line-height: 48px;

                .ui-radio-button
                    li
                        display: inline-block;
                        border: 1px solid #e0e0e0;
                        padding: 6px 12px;
                        margin-right: 6px;
                        background: #fff;
                        color #3c3c3c

                        &.on
                            border-color #f60

                .dd-part
                    padding-bottom: 18px;

                    .ui-input
                        border: 1px solid #e0e0e0;
                        font-size: 14px;
                        position: relative;

                        input
                            padding: 8px 18px;
                            width: 100%;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            border: 0;
                            outline none

                    .ui-input-btn
                        border: 1px solid #e0e0e0;
                        background: #fff;
                        text-align: center;
                        padding: 0 18px;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        align-items: center;
                        font-size: 14px;
                        margin-left: 6px;
                        color #3c3c3c

                    .shipment
                        li
                            background: transparent;
                            padding: 0;
                            border: none;
                            color: #333;

                .gap-line
                    background: #eee;
                    height: 1px;
                    padding-bottom: 0;

        .commodity
            background #FFFFFF

            .b8w
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                -ms-flex-direction: row;
                flex-direction: row;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                line-height: 18px;
                margin: 0 24px;
                padding: 8px 0;
                font-size 13px
                border-bottom: 1px solid #eee;

                .b81
                    margin-right: 12px;
                    width: 48px;
                    height: 48px;

                    img
                        width 100%
                        height 100%

                .b82
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin-right: 36px;
                    text-align left

        .cost
            padding: 14px 24px;
            background: #fff;
            font-size 13px
            text-align left

            p
                line-height 26px
        .bottom
            transform: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            border-top: 1px solid #e0e0e0;
            .info-tips
                background: #fbf3c4;
                color: #b57842;
                padding: 6px 12px;
                opacity: .7;
                p
                    line-height: 18px
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #b57842;
                    font-size 13px
            .ui-flex
                align-items: center;
            .b71
                font-size: 18px;
                color: #ff4d14;
                width: 100%;
                text-align: center;
            .b72
                width 100%
            .btn
                background #ff5722
</style>
