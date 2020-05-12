<template>
    <router-view></router-view>
</template>

<script>
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .comment-box
        .item
            text-align left
            padding: 14px 18px 18px
            .comment-header
                .avatar-img-box
                    margin-right: 13px
                    width: 44px
                    height: 44px
                    overflow: hidden;
                    border-radius: 100%;
                    img
                        width 100%

                .name
                    font-size 14px
                .comment-date
                    font-size 12px
                    margin-top: 3px
                    color: rgba(0,0,0,.54);
            .comment-content
                .text
                    padding: 7px 0;
                    line-height: 20px
                    font-size: 14px
                .photos
                    margin-bottom: 6px
                    img
                        width: 90px
                        height: 90px
                        margin: 0 5px 5px 0;
            .comment-reply
                padding: 9px
                background: #f6f6f6;
                .comment-replay-item
                    overflow: hidden;
                    padding: 3px 0;
                    .avatar
                        float: left;
                        width: 18px
                        height: 18px
                        overflow: hidden;
                        border-radius: 100%;
                        margin-right: 12px
                        background: transparent url("../../static/imgs/mi.png") no-repeat 50%;
                        background-size: cover;
                    .text
                        font-size: 12px
                        line-height: 18px
                        span
                            color #ff6700

                .more
                    font-size: 16px
                    color: #ff6700;
                    text-align: center;
                    margin-top: 14px
                    padding: 17px 0 9px
                    border-color: #c9c9c9;
                    &:after
                        display: inline-block;
                        vertical-align: middle;
                        -webkit-transform: translate3d(0,-25%,0) rotate(135deg) scale(.7);
                        transform: translate3d(0,-25%,0) rotate(135deg) scale(.7);
</style>
