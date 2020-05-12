<template>
    <div class="app-view-wrapper">
        <div class="content">
            <div class="header">
                <router-link :to="userInfo.name ? '/user' : '/login'">
                    <div class="user ui-flex align-center">
                        <div class="img"><img src="../../../static/imgs/avatar.png">
                        </div>
                        <div class="name">{{userInfo.name || '登录/注册'}}</div>
                    </div>
                </router-link>
            </div>
            <div class="b1 ui-flex align-center justify-space-between">
                <div class="cite">我的订单</div>
                <div class="span ui-flex align-center">
                    <router-link to="/order/list/1">
                        全部订单
                    </router-link>
                </div>
            </div>
            <ul class="b2 ui-flex align-center justify-space-between">
                <li class="dfk">
                    <a href="/order/list/2">
                        <div class="icon"></div>
                        <span>待付款</span>
                    </a>
                </li>
                <li class="dah">
                    <a href="/order/list/3">
                        <div class="icon"></div>
                        <span>待收货</span>
                    </a>
                </li>
                <li class="thx">
                    <a >
                        <div class="icon"></div>
                        <span>退换修</span>
                    </a>
                </li>
            </ul>
            <div class="ui-line"></div>
            <ul class="items">
                <li class="i-member">
                    <a>
                        <span>会员中心</span>
                    </a>
                </li>
                <li class="i-wallet">
                    <a>
                        <span>我的优惠</span>
                    </a>
                </li>
            </ul>
            <div class="ui-line"></div>
            <ul class="items">
                <li class="i-service">
                    <a>
                        <span>服务中心</span>
                    </a>
                </li>
                <li class="i-mihome">
                    <a>
                        <span>小米之家</span>
                    </a>
                </li>
            </ul>
            <div class="ui-line"></div>
            <ul class="items">
                <li class="i-fcode">
                    <a>
                        <span>我的F码</span>
                    </a>
                </li>
                <li class="i-gift">
                    <a>
                        <span>礼物码兑换</span>
                    </a>
                </li>
            </ul>
            <div class="ui-line"></div>
            <ul class="items">
                <li class="i-setting">
                    <a @click="$router.push('/user/set')">
                        <span>设置</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'user',
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .content
        background: #f5f5f5
        padding-bottom 100px

    .ui-line
        height: 12px;
        background: #f5f5f5;
        overflow: hidden;
        clear: both;

    .header
        background url("../../../static/imgs/user-bg.png") center 0 #f37d0f
        background-size: auto 100%;
        padding: 18px 0;

        .img
            margin: 0 12px 0 18px;
            width: 55px;
            height: 55px;
            overflow: hidden;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 100%;
            border: 3px solid hsla(0, 0%, 100%, .4);
            text-align: center;

            img
                width: auto;
                height: 100%;
                margin: 0 auto;

        .name
            color: #fff;
            font-size: 14px;
            text-align: left;

    .b1
        background-color: #fff;
        height: 48px;
        border-bottom: 1px solid rgba(0, 0, 0, .15);
        color: rgba(0, 0, 0, .54);
        position: relative;
        padding-right: 35px;

        &:after
            content: "";
            position: absolute;
            right: 20px;
            top: 50%;
            width: 10px;
            height: 10px;
            border-left: 1px solid currentColor;
            border-top: 1px solid currentColor;
            transform: translate3d(0, -50%, 0) rotate(135deg);
            -webkit-transform: translate3d(0, -50%, 0) rotate(135deg);

        .cite
            font-size: 15px;
            padding: 0 0 0 20px;
            color: rgba(0, 0, 0, .87);

        a
            font-size: 13px;
            color: rgba(0, 0, 0, .87);

    .b2
        padding: 0 48px;
        background-color: #fff;

        li
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-line-pack: justify;
            align-content: space-between;
            position: relative;
            padding: 20px 0;

            .icon
                width: 28px;
                height: 28px;
                margin: 0 auto 10px;
                background: url('../../../static/imgs/wait-buy.png') no-repeat center 0;
                background-size: 100% auto

            span
                color: rgba(0, 0, 0, .87);
                font-size 12px

            &.dah .icon
                background-image url("../../../static/imgs/wait-goods.png")

            &.thx .icon
                background-image url("../../../static/imgs/service.png")

    .items
        background #fff
        li
            position: relative;
            color: rgba(0,0,0,.54);
            background:  no-repeat 20px;
            background-size: 24px auto;
            border-bottom: 1px solid rgba(0,0,0,.15);
            line-height: 0;
            list-style: none;
            &:last-child
                border-bottom-color #fff
            &:after
                content: "";
                position: absolute;
                right: 20px;
                top: 50%;
                width: 12px;
                height: 12px;
                border-left: 1px solid currentColor;
                border-top: 1px solid currentColor;
                transform: translate3d(0,-50%,0) rotate(135deg);
                -webkit-transform: translate3d(0,-50%,0) rotate(135deg);
            &>a
                display: block;
                padding-right: 30px;
                padding-left: 66px;
                height: 60px;
                display: box;
                display: -webkit-box;
                box-align: center;
                -webkit-box-align: center;
                box-pack: justify;
                -webkit-box-pack: justify;
                color: currentColor;

                span
                    color rgba(0,0,0,.87);
            &.i-member
                background-image url("../../../static/imgs/vip.png")
            &.i-wallet
                background-image url("../../../static/imgs/discounts.png")
            &.i-service
                background-image url("../../../static/imgs/service.png")
            &.i-mihome
                background-image url("../../../static/imgs/mihome.png")
            &.i-fcode
                background-image url("../../../static/imgs/Fcode.png")
            &.i-gift
                background-image url("../../../static/imgs/gift.png")
            &.i-setting
                background-image url("../../../static/imgs/setting.png")
</style>
