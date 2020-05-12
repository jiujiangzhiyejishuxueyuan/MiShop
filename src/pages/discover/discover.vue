<template>
    <div class="app-view-wrapper">
        <div class="star-view">
            <div class="star-wrap">
                <div class="top-nav-container">
                    <div class="top-nav">
                        <div class="top-nav-left">
                            <a class="block nav-unit" :class="{'nav-unit-active':check===1}" @click="check=1">推荐</a>
                            <a class="block nav-unit" :class="{'nav-unit-active':check===2}" @click="check=2">小米智能生活</a>
                            <a class="block nav-unit" :class="{'nav-unit-active':check===3}" @click="check=3">5G</a>
                        </div>
                        <div class="top-nav-right">
                            <a class="message-wrap">
                                <img src="https://m.mi.com/static/img/bell.959ab6b28f.png" class="message-bell">
                            <div class="message-num" v-show="false">10</div>
                            </a>
                            <a class="inline-block user-icon">
                                <img class="user-icon"
                                src="../../static/imgs/discovery-user.png"
                                lazy="loaded">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="sections">
                    <transition-group name="main">
                        <recommend v-show="check===1" :key="1" :leftData="recommendLeftData" :rightData="recommendRightData"/>
                        <group v-show="check===2" wocao="1" :key="2"/>
                        <group v-show="check===3" wocao="2" :key="3"/>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import recommend from "@/pages/discover/recommend";
    import group from "@/pages/discover/group";
    import {reqDiscoverRecommend} from '@/api'

    export default {
        name: 'discover',
        components:{
            recommend,
            group
        },
        data() {
            return{
                check: 1,
                recommendData: [],
                recommendLeftData:[],
                recommendRightData:[],
                dataNum: 20
            }
        },
        methods: {
            scrollToTop() {
                const top = window.pageYOffset
                const height = document.body.scrollHeight-document.body.clientHeight
                if(top===height) {
                    this.loadMore(20)
                }
            },
            loadMore(num) {
                const {dataNum} = this
                reqDiscoverRecommend(dataNum,dataNum+num).then(res=> {
                    this.recommendData = res
                })
                this.dataNum += num
            }
        },
        mounted() {
            window.addEventListener('scroll', this.scrollToTop)
        },
        watch: {
            recommendData(value) {
                const left = value.slice(0,10)
                const right = value.slice(10,20)
                this.recommendLeftData = this.recommendLeftData.concat(left)
                this.recommendRightData = this.recommendRightData.concat(right)

            }
        },
        beforeRouteEnter(to,from,next) {
            reqDiscoverRecommend(0,20).then(res=> {
                next(vm=> {
                    vm.recommendData = res
                    document.body.scrollTop = 0
                    document.documentElement.scrollTop = 0
                })
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .star-view

        background-color: #F5F5F5
        .star-wrap
            padding-bottom 52px
            width 95%
            margin 0 auto
            padding-top 46px
    .star-wrap
        .top-nav-container
            background-color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 200;
        .top-nav
            width: 95%
            height: 46px
            line-height: 46px
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
            overflow: hidden;
        .top-nav-left
            font-size: 18px
            font-weight: 700;
            text-align: left;
        .nav-unit
            display inline-block
            &:not(:last-child)
                margin-right 20px
            &:first-child
                margin-left 13px
        .nav-unit-active
            color #ff6700
        .top-nav-right
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
        .message-wrap
            display: inline-block;
            position: relative;
            width: 46px
            height: 46px
            margin-right: 12px
            img
                width 100%
                height 100%
        .message-num
            position: absolute;
            top: 3px
            right: 0;
            height: 12px
            line-height: 12px
            background: #fff;
            border-radius: 6px
            font-size: 12px
            border: 1px solid #f23030;
            color: #f23030;
            padding: 0 3px
        .user-icon
            width 29px
            height 29px
            border-radius 277px

</style>
