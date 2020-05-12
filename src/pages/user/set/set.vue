<template>
    <div class="set-view">
        <van-cell title="地址管理" is-link to="/address" />
        <van-cell title="经营证照" is-link />
        <van-cell title="协议规则" is-link />
        <van-cell title="小米商城用户协议" is-link />
        <van-cell title="小米商城隐私政策" is-link />
        <van-cell title="小米帐号使用协议" is-link />
        <van-cell title="小米帐号隐私政策" is-link />
        <footer>
            <a @click="exit">退出账号</a>
        </footer>
    </div>
</template>

<script>
    export default {
        methods: {
            exit() {
                this.$store.dispatch('exitLogin')
                this.$router.replace('/user')
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .set-view
        padding-top 50px
        .van-cell__title
            text-align left
            font-size 16px
        footer
            a
                display: block;
                width: 100%;
                height: 60px
                font-size: 16px;
                color: #3c3c3c;
                line-height 60px
                background-color #f4f4f4

</style>
