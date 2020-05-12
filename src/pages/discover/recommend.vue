<template>
    <div class="discover-recommend-view">
        <div class="circle-container top-circle-block">
            <div class="top-circle-all">
                <div class="left">兴趣圈</div>
                <a class="right">
                    <div class="join-num">2.3万人已加入</div>
                    <div class="animation-user-icon-wrap">
                        <img class="animation-user-icon"
                             src="//cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01ZBAAMSbRr/bdwKtLUq34bCbq.jpg?thumb=150x150"
                        >
                    </div>
                    <img src="../../static/imgs/right.png" class="inner-icon">
                </a>
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(circle,index) in circles" :key="index">
                        <a class="circle-unit">
                            <div class="icon-wrap">
                                <img class="circle-icon" :src="circle.img">
                            </div>
                            <div class="circle-name">{{circle.name}}</div>
                            <div class="circle-desc">{{circle.desc}}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-container">
            <a class="nav-unit-wrap" v-for="(img,index) in navImgs" :key="index">
                <img class="nav-unit" :src="img">
            </a>
        </div>
        <div class="list-container">
            <div class="wterfall-wrap">
                <div class="left">
                    <div class="recomended-item" v-for="(item,index) in leftData" :key="index">
                        <a class="log-block">
                        <div class="item-block">
                            <div class="img-container img-container-size br1">
                                <img class="img" v-lazy="item.img" style="width: 100%;">
                            </div>
                            <div class="recommend-info-container">
                                <div class="relative-tag">
                                    <div class="content-tag-text">#</div>
                                    <span class="tag-name">{{item.tagName}} </span>
                                </div>
                                <div class="item-title">{{item.title}}</div>
                                <div class="recommend-relative-topic">
                                    <div class="left-type-1">
                                        <img class="recommend-user-icon" v-lazy="item.avatar" >
                                        <div class="topic-info">{{item.name}}</div>
                                    </div>
                                    <div class="partice-user-block right-type-1"><img
                                            src="../../static/imgs/white-eye.png"
                                            class="recommend-eye">
                                        <span class="recommend-view-num">{{item.viewNum}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>
                <div class="right">
                    <div class="recomended-item" v-for="(item,index) in rightData" :key="index">
                        <a class="log-block">
                            <div class="item-block">
                                <div class="img-container img-container-size br1">
                                    <img class="img" v-lazy="item.img" style="width: 100%;">
                                </div>
                                <div class="recommend-info-container">
                                    <div class="relative-tag">
                                        <div class="content-tag-text">#</div>
                                        <span class="tag-name">{{item.tagName}} </span>
                                    </div>
                                    <div class="item-title">{{item.title}}</div>
                                    <div class="recommend-relative-topic">
                                        <div class="left-type-1">
                                            <img class="recommend-user-icon" v-lazy="item.avatar" >
                                            <div class="topic-info">{{item.name}}</div>
                                        </div>
                                        <div class="partice-user-block right-type-1"><img
                                                src="../../static/imgs/white-eye.png"
                                                class="recommend-eye">
                                            <span class="recommend-view-num">{{item.viewNum}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'

    export default {
        props:{
            leftData: Array,
            rightData: Array
        },
        data() {
            return {
                circles: [
                    {
                        name: '米10青春版'
                        , desc: '轻薄5G手机'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/33c46a92898cca7b5bd61140b9f4bdb0.png'
                    },
                    {
                        name: '有奖征集'
                        , desc: '智能乐活方案'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0b424b02528c1673d0b693980a3b7b92.png'
                    },
                    {
                        name: '5月摄影大赛'
                        , desc: '探索新视界'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a4cfc4428fb7c583544737038033d275.jpg'
                    },
                    {
                        name: '居家男人'
                        , desc: '打造智慧家庭'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7a5d114c52b59b6054e63fb63d43ceaa.jpg'
                    },
                    {
                        name: '把世界看清'
                        , desc: 'K30 Pro'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bc46bc484e797e9d0601a97623b88137.jpg'
                    },
                    {
                        name: '小米10'
                        , desc: '小米10讨论圈'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e2fe1915ff45295c595ef06c39c9eb15.jpg'
                    },
                    {
                        name: '极客少女'
                        , desc: '嘿，终于等到你'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9133cdaf368100bbcd8d7bde65dba817.jpg'
                    },
                    {
                        name: '意见反馈'
                        , desc: '收集您的建议'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/117f6c6f05e57440dc52c29082437e55.jpg'
                    },
                    {
                        name: '萌宝俱乐部'
                        , desc: '育儿伊甸园'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4b31cb0d7316fdeee965c8130304dae5.jpg'
                    },
                    {
                        name: '车行天下'
                        , desc: '享受出发'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ccdbce7d5c702b5874db1bd493c9844a.jpg'
                    },
                    {
                        name: 'K30'
                        , desc: 'K30讨论圈'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b6feebed920b66dfc4da9885c73fe0a5.jpg'
                    },
                    {
                        name: '游戏玩家'
                        , desc: '集结游戏党'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b25a30c3ea9c391e881c33f56268240f.jpg'
                    },
                    {
                        name: 'MIUI11'
                        , desc: '升级刷机一点通'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d5e2e00f58b72b98ca0af3336c275fe7.jpg'
                    },
                    {
                        name: '商城直播'
                        , desc: '小姐姐来了'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b9e60943edb0a05e9780a3d111aa17dc.jpg'
                    },
                    {
                        name: '耳机发烧友'
                        , desc: '听·见不同'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0eccaea6eb3a680593538307f6e5a2b4.jpg'
                    }, {
                        name: '学生部落'
                        , desc: '年轻就这样'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3016c4904afaa71fc4868ce85bf4f78b.jpg'
                    }, {
                        name: '王一博'
                        , desc: '王一博粉丝集合'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0a215ef9cbbd066dd026f2a494ff6e89.jpg'
                    }, {
                        name: '小米人的日常'
                        , desc: '走近小米员工'
                        , img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5f208e755beb26e082db949acfd10892.jpg'
                    },
                ],
                navImgs: [
                    '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5eab4a41a42d2e1546a74d68a890b352.png?w=750&amp;h=600'
                    , '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a7a6168b52e66b55329abc096e136ca5.png?w=750'
                    , '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/2cc6f8f92801c4f5e48586fb588c971d.png?w=750'
                    , '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d19570964d49bd390c7a7043412fa9fb.png?w=750'
                ]
            }
        },
        mounted() {
            new Swiper('.swiper-container', {
                freeMode: true,
                slidesPerView: 'auto',
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .discover-recommend-view
        .circle-container
            margin: auto;
            width: 100%
            background-color: #fff;

            .circle-unit
                padding-top: 11px
                width: 105px
                text-align: center;
                display: inline-block;

            .icon-wrap
                position: relative;
                width: 62px
                height: 62px
                margin: auto;
                margin-bottom: 6px

                .circle-icon
                    display block
                    width 100%
                    height 100%
                    border-radius 222px

            .circle-name
                font-size: 14px
                font-weight: 700;
                color: #000;
                line-height: 17px
                margin-bottom: 2px

            .circle-desc
                color: rgba(0, 0, 0, .5);
                font-size: 12px
                line-height: 14px

            .swiper-slide
                width: 105px;

            /*设为固定值*/

            .top-circle-all
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                font-size: 14px
                font-weight: 700;
                color: #000;
                line-height: 18px
                margin-bottom: 19px

                .left
                    margin-left: 14px
                    font-size: 16px
                    margin-right 10px

                .right
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: end;
                    -ms-flex-pack: end;
                    justify-content: flex-end;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -ms-flex-wrap: nowrap;
                    flex-wrap: nowrap;

                .join-num
                    margin-right: 9px
                    font-size: 14px

                .animation-user-icon-wrap
                    width: 20px
                    height: 20px
                    -webkit-box-flex: 1;
                    -ms-flex: 1 0 0px;
                    flex: 1 0 0;
                    margin-right: 9px
                    position: relative;

                    .animation-user-icon
                        border-radius: 277px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 100%;
                        -webkit-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);
                        opacity: 1;
                        border: 1px solid #ffd157;
                        -webkit-box-sizing: border-box

                .inner-icon
                    display: block;
                    width: 5px
                    height: 8px

        .top-circle-block
            padding-top: 20px
            padding-bottom: 14px
            border-radius: 0 0 9px 9px;

        .nav-container
            width: 100%
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin: auto;

            .nav-unit-wrap
                display: block;
                margin-top: 11px
                margin-bottom: 11px

            .nav-unit
                width: 86px
                height: 86px
                -webkit-box-flex: 0;
                -ms-flex: none;
                flex: none;
                border-radius: 9px
                margin 0 !important
        .wterfall-wrap
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
            margin: auto;
            width 100%
            .left,.right
                width 49%
            .recomended-item
                -webkit-column-break-inside: avoid;
                break-inside: avoid;
                margin-bottom: 9px
                background-color: #fff;
                border-radius: 9px
                overflow: hidden;
            a.log-block
                display block
            .item-block
                position relative
            .br1
                border-radius: .1rem .1rem 0 0;
            .img-container-size
                height: 180px
                position: relative;
                overflow: hidden;
            .recommend-info-container
                padding: 0 0 13px
                width: 95%
                margin: 0 auto;
                text-align: left;
            .relative-tag
                font-size: 12px
                font-family: MI-LANTING_GB-OUTSIDE;
                font-weight: 400;
                color: rgba(0,0,0,.5);
                line-height: 14px
                text-align: left;
                margin-top: 9px
            .content-tag-text
                margin-right: 4px
                display: inline-block;
            .item-title
                font-size: 16px
                width: 100%;
                font-family: MI-LANTING_GB-OUTSIDE;
                font-weight: 400;
                color: #333;
                line-height: 22px
                text-align: left;
                margin-bottom: 9px
                margin-top: 9px
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            .recommend-relative-topic
                position: relative;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                border-radius: 25px
            .left-type-1,.right-type-1
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
            .left-type-1
                max-width: 96px
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
            .right-type-1
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
            .recommend-user-icon
                display: block;
                width: 25px
                height: 25px
                border-radius: 555px
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                flex-basis: 25px
            .topic-info
                max-width: 70px
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 150px;
                font-size: 12px
                font-family: MI-LANTING_GB-OUTSIDE;
                font-weight: 400;
                color: rgba(0,0,0,.5);
            .recommend-eye
                width 14px
            .recommend-view-num
                font-size: 12px
                font-family: FZLTZHUNHK--GBK1;
                font-weight: 400;
                color: rgba(0,0,0,.5);
                line-height: 13px
</style>
