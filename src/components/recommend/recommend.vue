<template>
    <div class="recommend-box">
        <div class="recommend-top-img">
            <img src="../../static/imgs/recommend.jpg">
        </div>
        <div class="recommend-list layout row wrap align-center align-content-start justify-space-between J_linksign-customize">
            <div class="goods-item" v-for="(product,index) in productList" :key="index">
                <a class="exposure" @click="$router.push(`/detail/${product._id}`)">
                    <div class="goods-img-box">
                        <img v-lazy="product.category_img_url">
                    </div>
                    <div class="goods-info">
                        <div class="goods-name no-wrap">{{product.goods_name}}</div>
                        <div class="goods-price price">{{product.option.length ? product.option[0].price || 1999 : 1999}}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import {searchProduct} from "@/api";

    export default {
        data() {
            return {
                productList: ''
            }
        },
        created() {
            searchProduct('新品').then((res)=> {
                this.productList = res
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .recommend-box
        background #FFFFFF
        margin-bottom 54px
        text-align left

        .recommend-top-img
            height 66px

            img
                width 100%
                height 100%

        .recommend-list
            .goods-name
                font-size 16px
                overflow hidden
                text-overflow ellipsis
                height 21px
            .goods-price
                font-size 18px
                display inline-block
                color #ff6700
                margin-top 6px
                position relative
                padding-left 10px

                &:before
                    content "\A5"
                    position absolute
                    left 0
                    top 0
                    font-size 14px
                    text-decoration none

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
                            height 200px

                    .goods-info
                        padding 10px 14px 12px
</style>
