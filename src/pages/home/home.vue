<template>
    <div class="app-view-wrapper home-wrap">
        <div class="home-header-wrapper">
            <div class="app-header-left">
                <div class="app-header-item logo">
                    <img src="../../static/imgs/icon-mi.png" alt="">
                </div>
            </div>
            <div class="app-header-middle" @click="$router.push('/search')">
                <div class="app-header-title">
                    <i class="image-icons app-header-icon icon-search"></i>搜索商品名称
                </div>
            </div>
            <div class="app-header-right" @click="$router.push('/user')">
                <div class="app-header-item"><i class="image-icons app-header-icon icon-user"></i>
                </div>
            </div>
        </div>
        <van-tabs v-model="active" sticky animated>
            <van-tab :title="item.title" v-for="(item,index) in contentList" :key="index">
                <van-swipe class="my-swipe" indicator-color="white">
                    <van-swipe-item v-for="(img,index) in item.swipe" :key="index">
                        <img :src="img" alt="">
                    </van-swipe-item>
                </van-swipe>
                <div class="col-box" v-if="item.col">
                    <a class="exposure items" v-for="(col,index) in item.col.slice(0,5)" :key="index">
                        <img :src="col">
                    </a>
                </div>
                <div v-else>{{item.title}}内容</div>
                <div class="col-box" v-if="item.col">
                    <a class="exposure items" v-for="(col,index) in item.col.slice(5)" :key="index">
                        <img :src="col">
                    </a>
                </div>
                <div class="line"></div>
                <div class="cells_auto_fill multi_cell" v-if="item.col2">
                    <a class="exposure items item-left">
                        <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d692a30ee3d586c4274575eec255d3c5.jpg?thumb=1&amp;w=358&amp;h=508">
                        <!----></a>
                    <a class="exposure items">
                        <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/827a686678f39b1bbdc99c6e6b6a13c8.jpg?thumb=1&amp;w=358&amp;h=252"></a>
                    <a class="exposure items item-buttom">
                        <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/267e988a99b5cf4e960747e8aa5fa831.jpg?thumb=1&amp;w=358&amp;h=252"></a>
                </div>
                <div class="line"></div>
                <div class="cells_auto_fill" v-if="item.col2" style="height: 155px">
                    <a class="exposure items2">
                        <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/489121f41279038693dbff01cbc03a1d.jpg?thumb=1&amp;w=720&amp;h=280">
                    </a>
                </div>
                <div class="content-list">
                    <div class="content-box" :class="{big: listIndex>2}" v-for="(goodsList,listIndex) in item.goods" :key="listIndex">
                        <div class="post">
                            <img v-lazy="goodsList.post.img">
                        </div>
                        <div class="layout row wrap align-center align-content-start justify-space-between J_linksign-customize"
                             :class="listIndex===4?'wocao-main-list':'content-main-list'"
                        >
                            <div class="goods-item" v-for="(goods,index) in goodsList.items" :key="index">
                                <a class="exposure">
                                    <div class="goods-img-box">
                                        <img v-lazy="goods.img">
                                    </div>
                                    <div class="info bgw align-center">
                                        <div class="name">{{goods.name}}</div>
                                        <div class="brief">{{goods.brief}}</div>
                                        <div class="price" :class="{p1:goods.oldprice}">
                                            {{goods.price}}
                                            <span class="price old" v-if="goods.oldprice"><s>{{goods.oldprice}}</s></span>
                                        </div>
                                        <div class="buybtn mauto" v-if="listIndex<3"> 立即购买</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                            <div class="ti">
                                更多{{goodsList.class}}产品 >
                            </div>
                    </div>
                    <div class="line"></div>
                    <div class="category">
                        <div class="goods-list layout row wrap align-center align-content-start justify-space-between J_linksign-customize">
                            <div class="goods-item" v-for="(img,index) in item.category" :key="index">
                                <img v-lazy="img">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-img" v-if="item.bottom">
                    <img v-lazy="item.bottom[0]">
                </div>
                <div class="bottom-img" v-if="item.bottom" style="height: 58px">
                    <img v-lazy="item.bottom[1]">
                </div>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
    import {reqHome} from '@/api'

    export default {
        name: 'home',
        data() {
            return {
                active: 0,
                contentList: [
                    {
                        title: '推荐',
                        swipe: [
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/ad51504cee3e877ea3ac4cb31d39a48c.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/ff3e608e7f4587b5bf62ea59efaf26e9.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/bd7349fbb622ef89d3837327be4b3682.jpg?thumb=1&w=720&h=360'
                        ],
                        col: [
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/cb65daec7ef7b52cc785f88f78efba37.png?thumb=1&w=144&h=152',
                            '//i8.mifile.cn/v1/a1/eb5024fe-dfe3-6e53-3e18-675bef5fa06e.webp',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/220c90a0ac6446757913ae6ab39cf3c6.gif',
                            '//i8.mifile.cn/v1/a1/e8bc849a-0a3b-21a0-6810-7da3a3903dee.webp',
                            '//i8.mifile.cn/v1/a1/7dbcbf87-6a58-adb6-2f3f-bb3dae3e9c80.webp',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/64f3988b6216e4c1ab62a7f50df3e816.png?thumb=1&w=144&h=152',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ea68dee2bfa0e55a82236b0d968e975.png?thumb=1&w=144&h=152',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/96c780016ea196743905dc93f9249c39.png?thumb=1&w=144&h=152',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/9425031cdd7af22d9a23a5ae16d1f57c.jpg?thumb=1&w=144&h=152',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/f11f9df6b0b0b428f8c8fc3267131830.png?thumb=1&w=144&h=152',
                        ],
                        col2: true,
                        goods:[],
                        category:[],
                        bottom:[]
                    },
                    {
                        title: '手机',
                        swipe: [
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a0f5b1e18953b0d62a3670045f130b75.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5cdf9277bb658c41116e75d49bf30271.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/940c0e057307cc2078995e5b74fcb7d6.jpg?thumb=1&w=720&h=360'
                        ]
                    },
                    {
                        title: '智能',
                        swipe: [
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0b2bb13c396cc6205dd91da3a91a275a.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/06c3673da15324a2409ad05e6ea6efd4.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/2e1cd7b440cfe32558d65e699d438ce3.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/1202a6786bda58920ef073fac0b1a74d.jpg?thumb=1&w=720&h=360',
                            '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0468b2883822b14bf5e934b53bfe22e9.jpg?thumb=1&w=720&h=360',
                        ]
                    },
                    {
                        title: '电视'
                    },
                    {
                        title: '笔记本'
                    },
                    {
                        title: '家电'
                    },
                    {
                        title: '生活周边'
                    }
                ]
            }
        },
        beforeRouteEnter(to,from,next) {

            reqHome().then(res=> {
                const goods = res.slice(0,-2)
                next(vm=> {
                    vm.contentList[0].goods = goods
                    vm.contentList[0].category = res[5].imgs
                    vm.contentList[0].bottom = res[6].imgs
                    document.body.scrollTop = 0
                    document.documentElement.scrollTop = 0
                })
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .home-header-wrapper > div,
    .home-header-wrapper
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

    .home-header-wrapper
        position: fixed;
        top: -1px;
        left: 0;
        right: 0;
        z-index: 99;
        -webkit-box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2);
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2);
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 46px
        background: #f2f2f2;
        color: #666;
        padding: 0;

        .logo img
            width 80%

        .app-header-item
            display: block;
            width: 34px
            margin: 0 12px

            .app-header-icon
                line-height: 36px

        .app-header-title
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border: 1px solid #e5e5e5;
            text-align: left;
            width: 100%;
            color: rgba(0, 0, 0, .3);
            background-color: #fff;
            border-radius: 3px

        .app-header-icon
            display: block;
            width: 36px
            height: 36px

            &.icon-search
                background-image url("../../static/imgs/icon-search.png")
                background-size: 22px 22px

            &.icon-user
                background-image url("../../static/imgs/icon-user.png")
                background-size: 22px 22px

    .app-header-middle
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 16px

    .home-wrap
        padding 77px 0 52px
        .bottom-img
            width 100%
            height 155px
            img
                width 100%
                height 100%
        .category
            margin-bottom 10px
            .goods-list
                .goods-item
                    flex: 0 1 49.7%;
                    margin-top 2px
                    overflow: hidden;
                    height 266px
                    img
                        width 100%
                        height 100%
        .info
            padding 10px 14px 12px
            .buybtn
                width: 110px
                background: #ea625b;
                border-radius: 3px
                text-align: center;
                color: #fff;
                font-size: 13px
                padding: 9px 0;
                font-weight: 700;
            .mauto
                margin 0 auto
            .name,.brief
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            .name
                font-size: 16px
                color: rgba(0,0,0,.87);
            .brief
                margin-top: 3px
                font-size: 12px
                line-height: 16px
                color: rgba(0,0,0,.54);
            .price
                font-size: 16px
                color: #ea625b;
                height: 23px
                padding-left 7px
                line-height: 23px
                position: relative;
                display: inline-block;
                &:before
                    content: "\A5";
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-size: .76em;
                    text-decoration: none;
                span
                    display: inline-block;
                    margin-left: 2px
                    font-size: 12px
                .old
                    display: inline-block;
                    margin: 0 5.5px
                    font-size: 12px
                    color: rgba(0,0,0,.54);

        .content-box
            .ti
                text-align center
                background: #fff;
                height: 55px
                line-height: 55px
                font-size: 16px
                width 100%
                text-align: center;
                color: rgba(0,0,0,.6);
            .post
                width 100%
                height 240px

                img
                    width 100%
                    height 100%

            .content-main-list
                padding 0 6px

                .goods-item
                    flex 0 1 49.5%
                    overflow hidden

                    a
                        display block

                        .goods-img-box
                            position relative
                            background #EFEFED

                            img
                                display block
                                width 100%
                                height 155px


            .wocao-main-list
                padding 0
                .goods-item
                    overflow hidden
                    .exposure
                        display flex
                        .info
                            padding 35px 7px 0 17px
                            .price
                                margin-top 11px
                            .p1:before
                                content: "\A5";
                                position: absolute;
                                left: 0;
                                top: 11px;
                                font-size: 0.76em;
                                text-decoration: none;


        .big
            .goods-img-box img
                height 200px !important
            .info
                text-align left !important
        .cells_auto_fill
            height 280px
            position relative

            .exposure
                img
                    height 100%
                    width 100%

            .items2
                width 100%
                height 155px

            .items
                position absolute
                width 50%


            .item-left
                height 100%
                left 0

            .item-buttom
                top 50%

        .col-box
            position relative
            width 100%
            height 85px
            display flex

            .items
                width 25%
                height 100%

                img
                    display: block;
                    width: 100%;
                    height 100%

        .line
            height 10px
            width: 100%;
            margin 0 auto
            background-color: rgb(245, 245, 245)

        .van-sticky
            position: fixed;
            top: 45px;
            right: 0;
            left: 0;
            z-index: 99;

        .van-tab--active
            color #ED5B00

        .van-tabs__line
            background-color #ED5B00
            height 2px

        .van-tabs--line .van-tabs__wrap
            height 32px

        .van-tabs__nav
            background #f2f2f2

        .van-tab
            max-width 57px
            line-height 32px

        div:nth-last-of-type(2)
            padding 0

        .van-swipe-item img
            height 200px
            width 100%
</style>
