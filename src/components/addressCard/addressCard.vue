<template>
    <div class="addressCard-view more">
        <a @click="$router.push('/address/list')">
            <div class="b11">
                <p>
                    <span>{{ address.name}}</span>
                    <span>{{ address.tel}}</span>
                </p>
            </div>
            <div class="b13" v-if=" address.province">
                <p>{{`${ address.province} ${ address.city} ${ address.county} ${ address.addressDetail}` || ''}} ({{ address.areaCode}})</p>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        props: {
             address:Object
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .addressCard-view
        background #fff url(//s1.mi.com/m/images/m/bd1.png) 0 0 repeat-x
        background-size 30px 5px
        padding 24px 15px 18px
        position relative
        text-align left
        a
            display block
            .b11
                font-size 18px
                font-weight 700
                margin-bottom 12px
                span
                    margin-right 6px
            .b13
                font-size 14px
                line-height 16px
                color #757575
                margin-right 18px
</style>
