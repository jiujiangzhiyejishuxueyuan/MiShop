<template>
    <div class="app-view-wrapper">
        <div class="app-search-page app-view">
            <search-head/>
            <div class="page-wrap">
                <div class="search-promotion">
                    <div class="search-promotion-title">热门搜索</div>
                </div>
                <div class="search-key" >
                    <a  v-for="(item,index) in searchKeys" :key="index" :class="item.sty"
                        @click="$router.push(`/search/list/${item.text}`)">
                        {{item.text}}
                    </a>
                </div>
                <div class="search-hotClassify">
                    <div class="search-promotion-title">常用分类</div>
                    <div class="hotClassify-list">
                        <a v-for="(item,index) in hotList" :key="index"
                           @click="$router.push(`/search/list/${item}`)">
                            {{item}}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import searchHead from '@/components/search-header/search-header'

    export default {
        components: {
            searchHead
        },
        data() {
            return {
                searchKeys: [
                    {text: '全部商品',sty: 'blue'},
                    {text: '小米手环4',sty: 'red'},
                    {text: '小米10',sty: 'green'},
                    {text: 'redmi K30',sty: 'red'},
                    {text: '黑鲨手机',sty: 'orange'},
                ],
                hotList: [
                    '手机','电视','笔记本','盒子','路由器','平板','手表'
                    ,'激光投影','VR','穿戴','空气净化器','空调','耳机'
                ],
            }
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .app-search-page
        padding-top 48px
    .app-view
        background #FFFFFF
        color #3c3c3c

        .search-promotion-title
            line-height: 48px;
            padding: 0 18px;
            font-size: 13.4px;
            text-align: left;
        .search-key
            margin: 6px 12px;
            text-align: left;
            a
                display inline-block
                padding: 7px 11px;
                margin: 5px;
                border: 1px solid #e4e4e4;
                font-size 13.4px
                color: rgb(72, 72, 72);
                &.red
                    border-color: rgb(227, 175, 150);
                    background: rgb(250, 232, 232);
                &.green
                    border-color: rgb(187, 208, 144);
                    background: rgb(242, 246, 233);
                &.blue
                    border-color: rgb(140, 218, 222);
                    background: rgb(232, 246, 246);
                &.orange
                    border-color: rgb(250, 194, 136);
                    background: rgb(248, 242, 236);
        .search-hotClassify
            .hotClassify-list
                text-align: left;
                max-height: 60px
                overflow: hidden;
                padding-left: 20px
                a
                    display: inline-block;
                    background: #f5f5f5;
                    height: 30px;
                    line-height: 30px;
                    font-size 12px
                    padding: 0 8px;
                    margin-right: 8px;
                    margin-bottom: 5px;
                    color: rgba(0,0,0,.54);
</style>
