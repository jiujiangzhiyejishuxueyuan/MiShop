<template>
    <div class="category">
        <div class="list-navbar">
            <ul>
                <li v-for="(item,index) in categoryList" :key="index"  @click="clickMenuItem(index)">
                    <a><span :class="{active:currentIndex===index}">{{item.name}}</span></a>
                </li>
            </ul>
        </div>
        <div class="list-warp">
            <div ref="foodsUl">
                <div class="list-item" v-for="(product,index) in products" :key="index">
                    <div class="category_title">
                        <span>{{product.type}}</span>
                    </div>
                    <div class="category_group box-flex">
                        <div class="box box-flex">
                            <div class="product" v-for="(item,index) in product.items" :key="index">
                                <router-link :to="`/detail/${item._id}`" class="item">
                                    <div class="img">
                                        <img class="big" v-lazy="item.category_img_url" :loading="lazyImg">
                                    </div>
                                    <div class="name">{{item.goods_name}}</div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {reqCategortProducts, reqCategoryList} from '../../api'
    import BScroll from 'better-scroll'

    export default {
        name: 'category',
        data() {
            return {
                title: '分类',
                products: [],
                scrollY: 0, // 右侧滑动的Y轴坐标 (滑动过程时实时变化)
                tops: [], // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
                categoryList:[],
                lazyImg: '../../common/imgs/lazy.gif',
            }
        },
        methods:{
            _initScroll() {
                // 列表显示之后创建
                this.foodsScroll = new BScroll('.list-warp', {
                    probeType: 1,  // 停止滑动触发scroll
                    click: true
                })

                // 给右侧列表绑定scroll监听
                this.foodsScroll.on('scroll', ({y}) => {
                    this.scrollY = Math.abs(y)
                })
                // 给右侧列表绑定scroll结束的监听
                this.foodsScroll.on('scrollEnd', ({y}) => {
                    this.scrollY = Math.abs(y)
                })

            },
            // 初始化tops
            _initTops() {
                // 1. 初始化tops
                const tops = []
                let top = 0
                tops.push(top)
                // 2. 收集
                // 找到所有分类的li
                const lis = this.$refs.foodsUl.getElementsByClassName('list-item')
                Array.prototype.slice.call(lis).forEach(li => {
                    top += li.clientHeight
                    tops.push(top)
                })

                // 3. 更新数据
                this.tops = tops
            },

            clickMenuItem(index) {
                // console.log(index)
                // 使用右侧列表滑动到对应的位置

                // 得到目标位置的scrollY
                const scrollY = this.tops[index]
                // 立即更新scrollY(让点击的分类项成为当前分类)
                this.scrollY = scrollY
                // 平滑滑动右侧列表
                this.foodsScroll.scrollTo(0, -scrollY, 300)
            },
        },
        computed: {
            currentIndex() {// 初始和相关数据发生了变化
                // 得到条件数据
                const {scrollY, tops} = this
                // 根据条件计算产生一个结果
                const index = tops.findIndex((top, index) => {
                    // scrollY>=当前top && scrollY<下一个top
                    return scrollY >= top && scrollY < tops[index + 1]
                })
                // 返回结果
                return index
            }
        },
        beforeRouteEnter(to,from,next) {
            reqCategoryList().then((res)=> {
                reqCategortProducts().then((result)=> {
                    next(vm => {
                        vm.categoryList = res
                        vm.products = result
                        vm.$nextTick(() => { // 列表数据更新显示后执行
                            vm._initScroll()
                            vm._initTops()
                        })
                    })
                })
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .category
        height 100%
        padding-top 50px
    .list-navbar
        position fixed
        top 50px
        bottom 52px
        left 0
        width 90px
        border-right 1px solid #efefef
        overflow hidden

        ul
            z-index 90
            position absolute
            top 0
            bottom 0
            left 0
            right -18px
            padding 12px 18px 12px 0
            background #fefefe
            -webkit-overflow-scrolling touch
            list-style none
            overflow scroll

            li
                font-size 18px
                height 54px
                line-height 54px
                text-align center
                -webkit-tap-highlight-color rgba(0, 0, 0, 0)
                transition -webkit-transform .1s linear
                transition transform .1s linear
                transition transform .1s linear, -webkit-transform .1s linear
                transform-origin center center
                transform scale(.76)
                -webkit-transition -webkit-transform .1s linear
                -webkit-transform-origin center center
                -webkit-transform scale(.76)

                span
                    display block
                    height 54px
                    overflow hidden
                    transition all .1s
                    &.active
                        transform scale(1.3)
                        color #ff6700


    .list-warp
        padding-left 100px
        padding-right 18PX
        flex 1
        height 100%
        overflow hidden
        .list-item
            margin-bottom -12px
            .category_title
                background #fff
                font-size 16px
                text-align center
                font-weight 400
                margin-top 12px
                height 75px
                line-height 75px
                overflow hidden

                span
                    position relative

                    &:before, &:after
                        content ""
                        position absolute
                        top 50%
                        left 0
                        width 24px
                        border-top 1px solid #e0e0e0
                        transform translate3d(-150%, -50%, 0)
                        -webkit-transform translate3d(-150%, -50%, 0)

                    &:after
                        left auto
                        right 0
                        transform translate3d(150%, -50%, 0)
                        -webkit-transform translate3d(150%, -50%, 0)

            .category_group
                background #fff
                margin 3.5px 0 0

                .box
                    width 100%
                    overflow hidden
                    flex-wrap wrap

                    .product
                        width 33.333333333333336%
                        text-align center
                        margin-top 12px
                        margin-bottom 18px
                        overflow hidden

                        .img
                            width 60px
                            height 60px
                            margin 0 auto
                            background #fff
                            overflow hidden

                            .big
                                height 100%!important
                                width auto!important
                        .name
                            margin-top 15px
                            white-space nowrap
                            font-size 12px
                            color rgba(0,0,0,.54)
                            overflow hidden
                            text-overflow ellipsis

</style>
