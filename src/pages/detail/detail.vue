<template>
    <div class="app-view">
        <header>
            <div class="fill-height layout align-center">
                <a class="header-btn" @click="$router.go(-1)">
                    <i class="image-icons header-icon icon-back"></i>
                </a>
                <div class="placeholder"></div>
                <a class="header-btn share-btn" @click="showShare = !showShare">
                    <i class="image-icons header-icon icon-share"></i>
                    <van-share-sheet
                            v-model="showShare"
                            title="分享"
                            :options="options"
                            :close-on-click-overlay="false"
                            @cancel="showShare = !showShare"
                    />
                </a>
            </div>
        </header>
        <!--        轮播图-->
        <div class="swiper-container">
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide v-for="(url,index) in product.gallery" :key="index">
                    <img v-lazy="url" >
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <!--        产品名-->
        <div class="section">
            <div class="product-name">
                <div class="overview overview-goods-name">
                    <div class="goods-name ui-flex align-center justify-start fz-xl">
                        {{product.goods_name}}
                    </div>
                </div>
            </div>
        </div>
        <!--        产品简介-->
        <div class="seciton">
            <div class="product-desc">
                <div class="overview overview-goods-brief">
                    <div class="goods-brief fz-xs" v-html="product.desc"></div>
                </div>
            </div>
        </div>
        <!--        产品价格-->
        <div class="section">
            <div class="product-price">
                <div class="overview overview-product-price">
                    <div class="goods-price layout align-end justify-start">
                        <div class="price cur-price" v-if="product.option">¥{{parseInt(product.option[0].price ||
                            1999)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--        产品关键参数-->
        <div class="section">
            <div class="product-class-parmeters" @click="parmeterShow = !parmeterShow">
                <div class="classic-param ui-flex align-center justify-start J_linksign-customize">
                    <div v-for="(param,index) in product.key_parameters" :key="index">
                        <div class="classic-param-item bd-left-1px" v-if="param.is_page_show">
                            <img :src="param.icon">
                            <div class="classic-param-item-name fz-xs">{{param.top_title}}</div>
                            <div class="classic-param-item-value fz-xxs">{{param.bottom_title}}</div>
                        </div>
                    </div>

                </div>
            </div>
            <van-action-sheet v-model="parmeterShow" title="关键参数" class="parmeter" duration="0.2" cancel-text="完成">
                <div class="content">
                    <div class="parameters-table">
                        <div class="parameters-table-row ui-flex align-center"
                             v-for="(param,index) in product.key_parameters" :key="index">
                            <div class="parameters-table-name fz-s">{{param.name}}</div>
                            <div class="parameters-table-value flex fz-s">{{param.value}}</div>
                        </div>
                    </div>
                </div>
            </van-action-sheet>
        </div>
        <!--        产品配置和地址选择-->
        <div class="section">
            <div class="product-version">
                <div class="border-1px card-box">
                    <!--                    配置选择-->
                    <div class="product-section more border-bottom-1px">
                        <div class="ui-flex align-center justify-start J_linksign-customize"
                             @click="showSku = !showSku">
                            <div class="title fz-xs">
                                已选
                            </div>
                            <div class="flex fz-xs">
                                <div class="info" v-if="$refs.sku">
                                    {{`${product.goods_name} ${$refs.sku.selectedText.replace('已选','')} x
                                    ${$refs.sku.selectedNum}`}}
                                </div>
                                <div class="info" v-else>
                                    未选
                                </div>
                            </div>
                        </div>
                        <van-sku
                                v-model="showSku"
                                :sku="sku"
                                :goods="goods"
                                :initialSku="initialSku"
                                ref="sku"
                                :show-add-cart-btn="false"
                                buy-text="加入购物车"
                                @buy-clicked="addCart"
                        />
                    </div>
                    <!--                    地址选择-->
                    <div class="product-section more border-bottom-1px">
                        <div class="ui-flex align-center justify-start J_linksign-customize" @click="cutAddress">
                            <div class="title fz-xs">
                                送至
                            </div>
                            <div class="flex fz-xs">
                                <div class="info">
                                    <span class="mr1x">
                                        {{ nowAddress.city ? `${nowAddress.city} ${nowAddress.county}` :'北京市 东城区'}}
                                    </span>
                                    <span class="on">
                                        有现货
                                    </span>
                                </div>
                            </div>
                        </div>
                        <van-action-sheet
                                v-model="showAddress"
                                title="收货地址"
                                class="address"
                                duration="0.2"
                        >
                            <div class="content">
                                <div class="border-bottom-1px address-item"
                                     v-for="(item,index) in address" :key="index"
                                     @click="selectAddress(item)"
                                     :class="{addressActive:nowAddress.id == item.id}">
                                    <div class="address-item-line1 layout align-center justify-start">
                                        <i class="image-icons icon-location"></i>
                                        <div class="address-item-name">{{item.name}}</div>
                                        <div class="address-item-province">{{item.province}}</div>
                                    </div>
                                    <div class="address-item-line2">{{item.addressDetail}}</div>
                                </div>
                            </div>
                            <div class="btn-bottom">
                                <div class="action-box flex">
                                    <a @click="$router.push('/address/edit/a')" class="btn buy-btn">选择新地址</a>
                                </div>
                            </div>
                        </van-action-sheet>
                    </div>
                    <!--                    服务说明-->
                    <div class="product-section more padding-8-15 border-bottom-1px">
                        <div class="ui-flex align-center justify-start J_linksign-customize service-policy-list"
                             @click="showService=!showService">
                            <div v-for="(item,index) in product.service" :key="index">
                                <div class="flex service-policy-item" v-if="item.show">
                                    <img src="../../static/imgs/icon-ok.png" class="mr1x img-icon">
                                    <span class="fsc1">{{item.title}}</span>
                                </div>
                            </div>
                        </div>
                        <van-action-sheet v-model="showService" title="服务说明" class="service" duration="0.2">
                            <div class="content">
                                <div class="service-item layout" v-for="(item,index) in product.service" :key="index">
                                    <img src="../../static/imgs/icon-ok.png" class="service-icon icon-size-xs">
                                    <div class="service-text flex">
                                        <div class="service-title fz-s">{{item.title}}</div>
                                        <div class="service-desc fz-xs" v-if="item.desc">{{item.desc}}</div>
                                    </div>
                                </div>
                            </div>
                        </van-action-sheet>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="section">
            <div class="imgBox">
                <img v-lazy="'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/ddd2b2e138b9957b267c797a99b1daec.jpg?f=webp&amp;w=1080&amp;h=420&amp;bg=DFF5F3'"
                     >
            </div>
        </div>
        <div class="line"></div>
        <div class="section">
            <div class="imgBox">
                <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/fe18b415bef233b3fe370e85ef3ecf01.png?f=webp&w=1080&h=420&bg=1'"
                     >
            </div>
        </div>
        <!--        评论-->
        <div class="section">
            <div class="comment">
                <swiper ref="mySwiper" :options="swiperOptions">
                    <swiper-slide v-for="(comment,index) in product.comments" :key="index">
                        <div class="swiper-box border-1px card-box">
                            <div class="comment-header layout align-center">
                                <div class="avatar-img-box">
                                    <img v-lazy="comment.user_avatar" >
                                </div>
                                <div class="user-info flex">
                                    <p class="name fz-xs"></p>
                                    <p class="comment-date fz-xxs">{{comment.add_time}}</p></div>
                                <div class="like"><span>{{comment.up_num}}</span></div>
                            </div>
                            <div class="comment-content">
                                <div class="text fz-xs">几年了一直都非常喜欢全面屏，华为这方面有点让我失望，于是转为了米粉，娱乐大...
                                </div>
                                <div class="photos">
                                    <div class="img">
                                        <img v-lazy="'//i1.mifile.cn/a2/1587357951_6600495_s1488_1984wh!540x5400.jpg'"
                                             >
                                    </div>
                                    <div class="img">
                                        <img v-lazy="'//i1.mifile.cn/a2/1587357949_1434803_s1728_2304wh!540x5400.jpg'"
                                             >
                                    </div>
                                    <div class="img">
                                        <img v-lazy="'//i1.mifile.cn/a2/1587357947_1278025_s1488_1984wh!540x5400.jpg'"
                                             >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <router-link :to="`/comment/list/${product._id}`" class="more-comments">
                    <span>更多评论</span>
                </router-link>
            </div>
        </div>
        <div class="section view-bottom">
            <div class="image_w_1080 offset-top-1px" v-for="(img,index) in product.imgs" :key="index">
                <img v-lazy="img" >
            </div>
        </div>
        <footer>
            <div class="fill-height layout align-center bgw">
                <a class="footer-btn" href="/home">
                    <i class="image-icons footer-icon icon-home"></i>
                    <span>首页</span>
                </a>
                <a class="footer-btn">
                    <i class="image-icons footer-icon icon-service"></i>
                    <span>客服</span>
                </a>
                <a class="footer-btn" @click="$router.push('/cart')">
                    <i class="image-icons footer-icon icon-cart"></i>
                    <span>购物车</span>
                    <em class="bubble" v-if="cartNum">{{ cartNum }}</em>
                </a>
                <div class="action-box flex">
                    <a class="btn buy-btn" @click="showSku = !showSku">加入购物车</a>
                </div>
            </div>
            <div class="safe-area-inset"></div>
        </footer>
    </div>
</template>

<script>
    import {reqdetail} from '../../api'
    import {mapState} from 'vuex'
    import NProgress from "nprogress";

    export default {
        name: 'detail',
        data() {
            return {
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                product: {},
                parmeterShow: false,
                showSku: false,
                showShare: false,
                showService: false,
                showAddress: false,
                nowAddress: {},
                options: [
                    {name: '微信', icon: 'wechat'},
                    {name: '微博', icon: 'weibo'},
                    {name: '复制链接', icon: 'link'},
                    {name: '分享海报', icon: 'poster'},
                    {name: '二维码', icon: 'qrcode'},
                ],
                goods: {
                    // 默认商品 sku 缩略图
                    picture: ''
                },
                sku: {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '30349', // skuValueId：规格值 id
                                    name: '月幕白', // skuValueName：规格值名称
                                    imgUrl: '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1584945817.94965157.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                                },
                                {
                                    id: '1215',
                                    name: '星环紫',
                                    imgUrl: '//cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1584945834.15143539.jpg'
                                }
                            ],
                            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        },
                        {
                            k: '版本', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: 1111, // skuValueId：规格值 id
                                    name: '月幕白', // skuValueName：规格值名称
                                    previewImgUrl: 'https://img.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
                                },
                                {
                                    id: '2222',
                                    name: '星环紫',
                                    previewImgUrl: 'https://img.yzcdn.cn/2p.jpg',
                                }
                            ],
                            k_s: 's2' // skuKeyStr：sku 组合列表（
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: 2259, // skuId，下单时后端需要
                            price: 33300, // 价格（单位分）
                            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: 1111, // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 110 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 2258, // skuId，下单时后端需要
                            price: 44400, // 价格（单位分）
                            s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: 1111, // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 110 // 当前 sku 组合对应的库存
                        },
                    ],
                    price: '1999', // 默认价格（单位元）
                    stock_num: 999, // 商品总库存
                    collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                    none_sku: false, // 是否无规格商品
                    hide_stock: true // 是否隐藏剩余库存
                },
                initialSku: {
                    s1: '0',
                    s2: '0',
                    selectedNum: 1,
                    selectedProp: {
                        123: [1222]
                    }
                }
            }
        },
        methods: {
            addCart(skuData) {
                if(this.$store.state.userInfo._id) {
                    const cart = this.cart || []
                    const {product} = this
                    const colorId = parseInt(skuData.selectedSkuComb.s1)
                    const optionId = parseInt(skuData.selectedSkuComb.s2)
                    const commodity = {
                        goodsId: product._id,
                        goodsName: product.goods_name,
                        num: skuData.selectedNum,
                        color: product.color[colorId],
                        option: product.option[optionId].title,
                        price: skuData.selectedSkuComb.price/100,
                        path: product.path,
                        isSelected: true,
                        isComment: false
                    }
                    //判断购物车是否已存在该商品
                    const index = cart.findIndex((item)=> {
                        return item.goodsId===commodity.goodsId && item.color.title===commodity.color.title && item.option===commodity.option
                    })
                    if(index!=-1) {
                        cart[index].num += skuData.selectedNum
                    } else {
                        cart.push(commodity)
                    }
                    this.$store.dispatch('updateCart',cart)
                    this.$toast.success('成功加入购物车')
                } else {
                    this.$router.push('/login')
                }
            },
            cutAddress() {
                if (this.userInfo.name) {
                    this.showAddress = true
                } else {
                    this.$router.push('/login')
                }
            },
            selectAddress(address) {
                this.nowAddress = address
                this.showAddress = false
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            },
            cartNum() {
                return this.cart.reduce((toast,item)=> {
                   return toast + item.num
                },0)
            },
            ...mapState(['userInfo', 'address','cart']),
        },
        beforeRouteEnter(to,from,next) {
            reqdetail(to.params.id).then((result)=> {
                if(result===2||!result.imgs.length||!result.option.length) {
                    next(false)
                    NProgress.done()
                } else {
                    next(vm => {
                        const value = result
                        const tree = []
                        const list = []
                        vm.product = value
                        vm.$nextTick(() => {
                            vm.swiper.slideTo(0, 0, false)
                        })
                        {
                            const obj = {
                                k: '颜色',
                                v: [],
                                k_s: 's1'
                            }
                            value.color.forEach((item, i) => {
                                const li = {
                                    id: i.toString(),
                                    name: item.title,
                                    imgUrl: item.imgUrl
                                }
                                obj.v.push(li)
                            })
                            tree.push(obj)
                        }
                        {
                            const obj = {
                                k: '版本',
                                v: [],
                                k_s: 's2'
                            }
                            value.option.forEach((item, i) => {
                                const li = {
                                    id: i.toString(),
                                    name: item.title
                                }
                                obj.v.push(li)
                            })
                            tree.push(obj)
                        }
                        const v1length = tree[0].v.length
                        const v2length = tree[1].v.length
                        for (let i = 0; i < v1length; i++)
                            for (let o = 0; o < v2length; o++) {
                                const obj1 = tree[0].v[i]
                                const obj2 = tree[1].v[o]

                                const li = {
                                    id: obj1.id + obj2.id,
                                    price: parseInt(value.option[o].price) * 100 || 1999 * 100,
                                    s1: obj1.id,
                                    s2: obj2.id,
                                    stock_num: 999
                                }
                                list.push(li)
                            }
                        vm.initialSku = {
                            s1: list[0].s1,
                            s2: list[0].s2,
                            selectedNum: 1,
                            selectedProp: {
                                123: [1222]
                            }
                        }
                        vm.sku.tree = tree
                        vm.sku.list = list
                        vm.sku.price = value.option[0].price || 1999
                        vm.goods.picture = value.color[0].imgUrl
                    })
                }

            })

        },
        created() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .line
        height 10px

    .app-view
        margin 0 auto

        header
            .placeholder
                flex 1

            .header-btn
                display block
                width 36px
                height 36px
                margin 12px
                color #ddd
                background rgba(0, 0, 0, .6)
                border-radius 50%

                button
                    color #000

            .header-icon
                width 36px
                height 36px
                -webkit-transform scale(.6)
                transform scale(.6)

                &.icon-back
                    background-image url("../../static/imgs/icon-back-white.png")

                &.icon-share
                    background-image url("../../static/imgs/icon-share.png")

        .swiper-container
            height 455px

            .swiper-pagination-bullet
                width 6px
                height 6px

            .swiper-pagination-bullet-active
                background #fff !important

            img
                height 100%

        .overview-goods-name
            padding 18px 18px 0

            .goods-name
                line-height 30px

        .overview
            background #fff
            text-align left

        .overview-goods-brief
            padding 0 18px

            .goods-brief
                line-height 24px
                word-break break-all
                color rgba(0, 0, 0, .54)
                font-size 14px

        .overview-product-price
            padding 0 18px 18px

            .goods-price
                padding 12px 0 0

                .cur-price
                    color #ff6700
                    font-size 28px


        .classic-param
            padding 0 0 .16rem
            text-align center
            overflow-x auto

            .classic-param-item
                width 90px
                padding 0 4px

                img
                    display block
                    margin 0 auto
                    width 22px
                    height 22px

                .classic-param-item-name
                    padding 4px 0

                .classic-param-item-value
                    color #676767
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis


        .border-1px.card-box
            background-color #fafafa
            border-radius 10px
            overflow hidden
            margin 10px 20px 0

        .product-version
            position relative
            margin-bottom -10px

        .product-section
            position relative
            text-align left
            padding 12px 20px

            .van-sku-actions .van-button--danger
                background #FF6700

            .van-button__text
                color #fff

            .van-sku-row__item--active
                color #FF6700

            .service-policy-list
                flex-wrap wrap

                .service-policy-item
                    font-size 15px
                    line-height 24px
                    margin-right 12px
                    flex-direction row

            .img-icon
                height 12px
                width auto
                margin-right 5px

            .fscl
                font-size 12px
                color rgba(0, 0, 0, .54)

            .border-bottom-1px
                border-color #e5e5e5

            .title
                color rgba(0, 0, 0, .54)
                margin-right 18px
                min-width 30 pxrem

            .info
                color rgba(0, 0, 0, .87)

                .on
                    color #f56600


        .more:after
            width 10px
            height 10px
            border-color hsla(0, 0%, 64%, .8)

        .parmeter
            .van-action-sheet__cancel
                background-color #ff6700
                color #fff
                border-radius 80px

            .content
                overflow-y scroll
                padding-bottom 80px
                color #000
                text-align left
                padding 0 15px
                max-height 450px

                .parameters-table
                    padding 0

                    .parameters-table-row
                        margin 28px 0

                        .parameters-table-name
                            color rgba(0, 0, 0, .54)
                            width 160px
                            margin-right 10px
                            word-break keep-all
                            overflow hidden
                            text-overflow ellipsis

                        .parameters-table-value
                            width 100%
                            word-break keep-all
                            overflow hidden
                            text-overflow ellipsis


        .service
            .content
                overflow-y scroll
                padding-bottom 80px
                color #000
                text-align left
                padding 0 15px
                max-height 450px

                .service-item
                    margin 30px 0
                    position relative

                    .service-icon
                        width 18px
                        height 18px
                        margin-right 18px

                    .service-desc
                        margin-top 5px
                        color rgba(0, 0, 0, .54)


        .address
            .van-action-sheet__cancel
                background-color #ff6700
                color #fff
                border-radius 80px
                height 50px

            .btn-bottom
                position absolute
                bottom 0
                left 0
                right 0
                background #fff

                .action-box
                    height 50px
                    padding 8px 18px

                    .btn
                        height 34px
                        line-height 34px
                        border-radius 22px
                        background #ff6700
                        color #fff
                        display block
                        text-align center
                        width 100%
                        font-size 15px

            .content
                overflow-y scroll
                padding-bottom 80px
                color #000
                text-align left
                padding 0 15px
                height 450px

                div.addressActive
                    .address-item-line1
                        color #ff6700

                    .address-item-line2
                        color #ff6700

                .address-item
                    text-align left
                    padding 10px 0

                    .address-item-line1
                        font-size 14px
                        color rgba(0, 0, 0, .87)

                        .address-item-name
                            margin-right 5px

                        .image-icons
                            width 14px
                            height 14px
                            margin-right 8px

                            &.icon-location
                                background-image url("../../static/imgs/address.png")
                                background-size contain

                    .address-item-line2
                        font-size 14px
                        color rgba(0, 0, 0, .54)
                        padding-left 22px

        .imgBox
            padding 0 18px

            img
                display block
                width 100%
                height auto
                vertical-align top

        .comment
            margin-top 16px
            width 100%
            text-align left

            .swiper-container
                height 100%

                .swiper-box
                    padding 15px 15px 40px

            .comment-header
                .like
                    margin-right 10px
                    padding-left 24px
                    background transparent url('../../static/imgs/praise.png') no-repeat 0 top
                    background-size auto 70%
                    height 22px
                    line-height 22px
                    color rgba(0, 0, 0, .54)

                .avatar-img-box
                    margin-right 14px
                    width 36px
                    height 36px
                    overflow hidden
                    border-radius 100%

                    img
                        width 100%
                        height 100%

            .comment-content
                margin 8px 0
                line-height 20px
                overflow hidden
                position relative
                color rgba(0, 0, 0, .87)

                .photos
                    .img
                        display inline-block
                        width 90px
                        height 70px
                        margin 0 8px 0 0
                        border-radius 8px
                        overflow hidden
                        position relative

                        img
                            width 100%
                            height auto
                            position absolute
                            top 50%
                            left 50%
                            -webkit-transform translate(-50%, -50%)
                            transform translate(-50%, -50%)

            .more-comments
                margin-top 20px
                margin-bottom 30px
                color #4e72a5
                display block
                text-align center

                span
                    &:after
                        content "\25BA"
                        font-size 12px
                        vertical-align middle
                        display inline-block
                        -webkit-transform scale(.8, 1.5)
                        transform scale(.8, 1.5)
                        font-family Times New Roman

        .image_w_1080
            img
                display block
                width 100%
                height auto
                vertical-align top
        .view-bottom
            padding-bottom 130px
        footer
            padding 0 8px 8px
            background transparent
            position fixed
            bottom 0
            left 0
            right 0
            z-index 2
            .action-box
                margin-right 12px
                margin-left 6px
                text-align right
                .buy-btn
                    display inline-block
                    width 150px
                    overflow hidden
                    padding 0 30px
                    height 36px
                    line-height 36px
                    border-radius 20px
                    text-align center
                    background #ff6700
                    color #fff
                    font-size 16px
            .bgw
                background-color hsla(0,0%,100%,.96)!important
                width 100%
                height 60px
                border 1px solid #e5e5e5
                border-radius 10px
                overflow hidden
                -webkit-box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
                box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
            .footer-btn
                position relative
                display block
                text-decoration none
                width auto
                padding 0 6px
                color rgba(0,0,0,.54)
                &:first-child
                    padding-left 12px
                .bubble
                    position absolute
                    min-width 16px
                    height 16px
                    -webkit-box-sizing border-box
                    box-sizing border-box
                    padding 0 3px
                    font-size 10px
                    overflow hidden
                    text-align center
                    border-radius 14px
                    background #ed4d41
                    color #fff
                    top 0
                    left 50%
                    -webkit-transform translate3d(6px,-20%,0)
                    transform translate3d(.1rem,-20%,0)
                    font-style normal
            .footer-icon
                display block
                width 30px
                height 30px
                margin 0 auto 3px
                &.icon-home
                    background-image url("../../static/imgs/btn-home.png")
                &.icon-cart
                    background-image url("../../static/imgs/btn-cart.png")
                &.icon-service
                    background-image url("../../static/imgs/btn-service.png")
</style>
