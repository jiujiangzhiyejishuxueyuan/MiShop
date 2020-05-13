<template>
    <div class="app-view search-list-wrap">
        <search-head/>
        <div id="page-box" v-if="goodsList">
            <div class="page-wrap">
                <div class="app-goods-con">
                    <div class="app-goods-list">
                        <div class="item-box" v-for="(goods,index) in goodsList" :key="index" @click="$router.push(`/detail/${goods._id}`)">
                            <a class="item bd-bottom-1px">
                                <img class="item-img"
                                     :src="goods.category_img_url"
                                >
                                <div class="icon-left"></div>
                                <div class="item-con">
                                    <h3 class="">{{goods.goods_name}}</h3>
                                    <p class="item-desc" v-if="goods.desc" v-html="goods.desc"></p>
                                    <p class="item-desc" v-else style="color: #ff4a00">
                                        「购机享信用卡24期免息，低至188元/期；购机赠99.9元无线蓝牙耳机；购机赠价值470元善诊体检卡；购机享延保碎屏保5折；加1元得50G 云空间月卡；下单抽奖赢70英寸电视」
                                    </p>
                                    <div class="item-specs-list" v-if="goods.key_parameters">
                                        <div class="specs-item bd-right-1px"
                                             v-for="(item,index) in goods.key_parameters.slice(0,3)"
                                             :key="index">
                                            <span class="name">{{item.name}}</span>
                                            <span class="desc">{{item.value.slice(0,10)}}</span>
                                        </div>
                                    </div>
                                    <div class="item-specs-list" v-else>
                                        <div class="specs-item bd-right-1px"
                                             v-for="(item,index) in simulationParemeters"
                                             :key="index">
                                            <span class="name">{{item.name}}</span>
                                            <span class="desc">{{item.value}}</span>
                                        </div>
                                    </div>
                                    <div class="item-price" >
                                        <sub>¥</sub>
                                        <span>{{goods.option.length ? goods.option[0].price || 1999 : 1999}}</span>
                                        <span class="spe">起</span>
                                        <del><sub>¥</sub>3499</del>
                                        <span class="icon-box">
                                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e2780c6688e79247128e5cff50a921ca.png">
                                        </span>
                                    </div>
                                    <div class="item-count">
                                        <span>{{goods.comments ? goods.comments.length||666: 666}}条评价</span><span> 98.3%满意</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <van-empty image="search" description="未搜索到商品" v-else />
        <recommend/>
    </div>
</template>

<script>
    import searchHead from '@/components/search-header/search-header'
    import recommend from '@/components/recommend/recommend'
    import {searchProduct} from "@/api";

    export default {
        components: {
            searchHead,
            recommend
        },
        beforeRouteEnter(to,from,next) {
            searchProduct(to.params.key).then((res)=> {
                next(vm => {
                    vm.goodsList = res
                })
            })
        },
        data() {
            return {
                goodsList: '',
                simulationParemeters:[
                    {name:'价格',value:'良心公道'},
                    {name:'品质',value:'高级代工'},
                    {name:'性能',value:'强劲有力'}]
            }
        },


    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .page-wrap
        position: relative;
        z-index: 1;
        width: 100%;
        overflow: auto;
        height: 100%;
        background: #fafafa;
    .search-list-wrap
        .app-search
            background #FAFAFA
        #page-box
            padding-top 48px
    .app-goods-list
        .item-box
            border-bottom 1px solid rgba(0,0,0,.15)
        .item
            display: block;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            padding: 15px 0;
            padding-right: 15px;
            min-height: 140px
            position: relative;
            background: #fff;
            .item-img
                width 140px
                height 140px
            .item-con
                display: block;
                text-align: left;
                width: 220px
                margin-left: 12px
                h3
                    font-size: 15.6px
                    color: rgba(0,0,0,.87);
                    line-height: 21px
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    font-weight: 400;
                .item-desc
                    font-size: 12px
                    line-height: 15px
                    color: rgba(0,0,0,.54);
                    margin-top: 3px
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                .item-specs-list
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    margin: 12px 0 0;
                    .specs-item:last-child
                        border: none;
                    .specs-item
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;

                        span
                            display: block;
                            text-align: center;
                        .name
                            color: #4a4a4a;
                            font-size:12px
                            line-height: 18px
                        .desc
                            color: rgba(0,0,0,.54);
                            font-size: 12px
                            line-height: 14px
                            height: 16px
                            overflow: hidden;
                .item-price
                    color: #ff6700;
                    font-size: 20px
                    line-height: 1;
                    margin-top: 12px
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    sub
                        font-size: 13.4px
                        top: 10px
                        margin-right: 3px
                        line-height: 0;
                        position: relative;
                        vertical-align: baseline;
                    .spe
                        font-size: 13px
                        display: inline-block;
                        line-height: 23px
                    del
                        margin-left: 3px
                        color: rgba(0,0,0,.54);
                        font-size: 13px
                        line-height: 24px
                        sub
                            top: -.02rem;
                            font-size: .14rem;
                    img
                        display: inline-block;
                        height: 14px
                        margin-left: 5px
                        vertical-align: middle;
                        margin-top: -2px;
                    .icon-box
                        display: inline-block;
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        vertical-align: bottom;
                        margin-top: -1px
                        img
                            line-height: 1;
                            vertical-align: bottom;

                .item-count
                    color: rgba(0,0,0,.54);
                    font-size: .2rem;
                    line-height: .24rem;
                    margin-top: .1rem;
</style>
