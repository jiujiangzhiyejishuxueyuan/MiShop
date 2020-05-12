<template>
        <header class="app-header-wrapper app-shell-header">
            <div class="app-header-left">
                <a class="app-header-item">
                    <i class="image-icons app-header-icon icon-back" @click="$router.go(-1)"></i>
                </a>
            </div>
            <div class="app-header-middle">
                <div class="app-header-title">{{title}}</div>
            </div>
            <div class="app-header-right">
                <a class="app-header-item">
                    <i class="image-icons app-header-icon icon-search" @click="$router.replace('/search')" v-show="!$route.meta.rightNone" ></i>
                </a>
            </div>
        </header>
</template>

<script>
    export default {
        props:{
            title: String
        },
        methods:{

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .app-header-wrapper
        display: flex
        -webkit-box-pack: justify
        justify-content: space-between
        -webkit-box-align: center
        align-items: center
        height: 50px
        background: #f2f2f2
        color: #666
        padding: 0
        transition: transform .2s ease-out,-webkit-transform .2s ease-out
        &>div
            display: flex;
            -webkit-box-align: center;
            align-items: center;
        div
            background: #f2f2f2
        .app-header-item
            display: block;
            width: 35px;
            height 30px
            margin: 5px;
            background: #f2f2f2
            .icon-back
                background-image url("../../static/imgs/icon-back.png")
            .image-icons
                width: 30px
                height: 30px
                display: block
                overflow hidden
            .icon-search
                width 35px
                height 35px
                background-image url("../../static/imgs/icon-search.png")
    .app-shell-header
        position: fixed
        z-index: 20
        top: 0
        left: 0
        right: 0
</style>
