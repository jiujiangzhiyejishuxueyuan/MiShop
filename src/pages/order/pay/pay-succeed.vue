<template>
    <div class="wrapper result-page">
        <div class="result_container">
            <i class="iconimage result-success-icon"></i>
            <div>
                <p class="text"><span>{{price}}.00</span></p>
                <div class="sub-info">
                    <div class="block">
                        <span class="title">订单金额</span>
                        <span class="price">{{price}}.00元</span></div>
                    <div class="block">
                        <span class="title">优惠</span>
                        <span class="price"><span class="subtract">0元</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="result-footer">
            <div class="button-block"></div>
            <div class="ui-form-confirm-button-contaierv2">
                <button class="ui-form-confirm-button buttonv2" @click="$router.replace(`/order/view/${id}`)">确定</button>
            </div>
        </div></div>
</template>

<script>
    export default {
        data() {
          return {
              price: '',
              id: ''
          }
        },
        created() {
            if (this.$route.query.order.price) {
                this.price = this.$route.query.order.price
                this.id = this.$route.query.order.id
            } else {
                this.$router.replace('/order/list/1')
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .wrapper
        padding-top: 80px
        text-align: center;
        color: #000;
        font-size: 16px
        .text
            margin-top 10px
        .result-success-icon
            width: 68px
            height: 68px
            display inline-block
            background url("../../../static/imgs/succeed.png")
            background-size: contain;
        .sub-info
            max-width: 600px;
            margin: 0 auto;
            padding: 21px
            font-size: 15px
            color: #717783;
            .block
                padding: 5px 0;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
        .result-footer
            position: fixed;
            bottom: 10px;
            left: 5%;
            right: 5%;
            .button-block
                height 45px
            .ui-form-confirm-button-contaierv2
                position: fixed;
                left: 20px
                right: 20px
                bottom: 0;
                padding-bottom: 20px
                z-index: 9;
                background-color: #fff;
                .buttonv2
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    font-size: 17px;
                    border-radius: 2.5rem;
                    height: auto;
                    line-height: normal;
                    padding: .625rem 0;
                    background-color: #09f;
                    color: #fff;
                    border none


</style>
