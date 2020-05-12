<template>
    <div class="page-pay" v-if="commoditys.price">
        <div class="ui-order-details">
            <div class="ui-order-info">
                <h1>交易金额(元)</h1>
                <div><h2>{{commoditys.price}}.00</h2></div>
            </div>
            <van-divider/>
            <div class="order-desc">
                {{`小米商城 | ${commoditys.items[0].goodsName}
                ${commoditys.items[0].option}
                ${commoditys.items[0].color.title}`}}
                {{commoditys.items.length>1 ? '等多件' : ''}}
            </div>
        </div>
        <div class="ui-line"></div>
        <div class="ui-form-container pay-form-container">
            <div class="ui-form-hint">选择支付方式</div>
            <van-divider/>
            <div class="ui-channel-item current">
                <i class="ui-selected-arrow"></i>
                <span class="icon-balance"></span>
                <div class="cont-channel-list-text" :class="{bz:userInfo.money<=commoditys.price}">
                    <span>余额 {{userInfo.money}} 元</span>
                    <span class="activity-info">{{userInfo.money>=commoditys.price ? '可用余额充足' : '余额不足'}}</span>
                </div>
            </div>
        </div>
        <div class="ui-form-confirm-button-contaier h5-oneLineBefore h5-oneLineAfter">
            <van-divider/>
            <button class="ui-form-confirm-button" @click="isShow">下一步</button>
        </div>
        <van-overlay :show="show">
            <div class="wrapper">
                <div class="pwd">
                    <div class="ui-dialog-header  van-hairline--bottom">
                        <h1>请输入小米钱包支付密码</h1>
                        <i class="close" @click="close"></i>
                    </div>
                    <van-password-input
                            :value="value"
                            :focused="showKeyboard"
                            @focus="showKeyboard = true"
                    />
                </div>
                <van-number-keyboard
                        :show="showKeyboard"
                        @input="onInput"
                        @delete="onDelete"
                        @blur="showKeyboard = false"
                />
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import {changeOrderState, reqOrderView} from '@/api'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                value: '',
                show: false,
                showKeyboard:false,
                commoditys: ''
            }
        },
        methods: {
            //密码输入
            onInput(key) {
                this.value = (this.value + key).slice(0, 6)
                if(this.value.length === 6) {
                    this.show = false
                    this.submitPay()
                }
            },
            //密码输入框退格
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
            //打开密码输入框
            isShow() {
                this.show = true
                this.showKeyboard = true
            },
            //关闭密码输入框
            close() {
                this.show = false
                this.value = ''
            },
            //提交支付状态
            async submitPay() {
                const id = this.$route.params.id
                const result = await changeOrderState({id,step:1})
                if(result) {
                    this.$router.replace({path:'/order/paySucceed',query:{order:{price:this.commoditys.price,id:result}}})
                } else {
                    this.$dialog.alert({message:'提交订单失败'})
                }
            }
        },
        computed:{
            ...mapState(['userInfo']),
        },
        async created() {
            const id = this.$route.params.id
            if(!id || id.length!=24) {
                this.$dialog.alert({
                    message:'支付错误'
                }).then(()=> {
                    this.$router.go(-1)
                })
            } else {
                this.commoditys = await reqOrderView(id)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .page-pay
        .ui-line
            height 8px

        .van-divider
            margin 0

        .ui-order-details
            position: relative;
            padding-left 30px
            text-align left

            .order-desc
                padding: 11px 0;
                font-size: 13px;
                color: #9b9b9b;

            .ui-order-info
                padding 25px 0
                position relative

                h1
                    font-size: 15px;
                    color: #9b9b9b;

                h2
                    font-size 30px
                    display: inline-block;
                    color: #4a4a4a;
                    margin-top: 13px;
                    line-height: 20px;
                    font-weight normal

        .pay-form-container
            text-align left
            padding-left 30px

            .ui-form-hint
                padding 12px 0
                width 100%
                display: inline-block;
                color: #9b9b9b;
                font-size: 13px;

            .ui-channel-item
                position: relative;
                padding: 24px 0;
                color: #666;
                font-size: 16px;
                color #2ea5e5

                .ui-selected-arrow
                    width: 8px
                    height: 8px
                    display block
                    border-color #2ea5e5
                    border-bottom solid 1px
                    border-right solid 1px
                    transform rotate(-45deg) translateY(-50%)
                    position absolute
                    left -20px
                    top 50%

                .icon-balance
                    display: inline-block;
                    width: 22px
                    height: 22px
                    background-size: 100%
                    background-image url("../../../static/imgs/balance.png")

                .cont-channel-list-text
                    width: 100%;
                    left: 0;
                    font-size: 16px;
                    padding-left: 30px;
                    box-sizing: border-box;
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    -moz-transform: translateY(-50%);
                    -o-transform: translateY(-50%);
                    transform: translateY(-50%);

                    span
                        display block

                    .activity-info
                        font-size 14px

                .bz
                    span
                        color #666666
                        opacity .6

                        &.activity-info
                            color #ec2700

        .ui-form-confirm-button-contaier
            position: fixed;
            bottom: 0;
            height: 60px;
            left: 50%;
            width: 100%;
            background: #fff;
            padding: 18px 22px;
            box-sizing: border-box;
            z-index: 1;
            margin-left: -50%;

            .van-divider
                position: absolute;
                top -5px
                width 100%
                transform scale(2)

            button
                background-color: #09f;
                color: #fff;
                height: 40px;
                cursor: pointer;
                border: none;
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                -moz-transform: translate(-50%, -50%);
                -o-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                width: 92%;
                border-radius: 6px;
                font-size: 14px
                line-height: 1.2;

        .wrapper
            height: 100%;
            position relative

            .van-password-input
                padding 20px 0

            .pwd
                background-color: #fff;
                border-radius: 5px;
                width: 90%;
                position: absolute;
                top: 25%;
                left: 50%;
                transform translate(-50%,0)
                .ui-dialog-header
                    position: relative;
                    padding: 20px 0;
                    .close
                        width 25px
                        height 25px
                        display block
                        background-position center
                        background-image  url("../../../static/imgs/x.png")
                        background-size 90%
                        position absolute
                        top: 50%;
                        left 10px
                        transform translate(0,-50%)

                    h1
                        font-weight normal
                        max-width: 70%;
                        margin: 0 auto;
                        color: #000;
                        font-size: 16px;
                        text-align: center;


</style>
