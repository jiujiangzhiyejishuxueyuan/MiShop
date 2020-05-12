<template>
    <div class="app-search-head">
        <div class="app-search-head-input">
            <div class="app-search">
                <a class="header-btn" @click="$router.go(-1)">
                    <i class="image-icons app-header-icon icon-back"></i>
                </a>
                <div class="search-item">
                    <input type="search" placeholder="搜索商品名称" v-model="searchKey" @keydown.enter="submitSearch">
                </div>
                <a class="header-btn" @click="submitSearch" >
                    <i class="image-icons app-header-icon icon-search"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchKey: ''
            }
        },
        methods: {
            submitSearch() {
                const key = this.searchKey.trim()
                if (key) {
                    this.$router.push(`/search/list/${key}`)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .search-item
        background: #fff;
        width: 100%;
        input
            border: 1px solid #e5e5e5;
            border-radius: .2px;
            width: 100%;
            padding: 0 12px;
            outline: 0;
            font-size: 16px
            font-weight: 400;
            height: 30px;
            line-height: normal;
    .app-search-head
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        right: 0;
        background: #f2f2f2;
    .app-search-head-input
        width 100%
    .app-search
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 48px;
        width: 100%;
        .header-btn
            display: block;
            margin: 0 12px;
            color: #666;
        .app-header-icon
            display block
            width: 30px;
            height: 30px
            &.icon-back
                background-image url("../../static/imgs/icon-back.png")
            &.icon-search
                background-image url("../../static/imgs/icon-search.png")
</style>
