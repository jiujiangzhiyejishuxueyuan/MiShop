<template>
    <div class="container">
        <div class="address-manager">
            <div class="address-manager-list">
                <div class="ui-card">
                    <ul class="ui-card-item ui-list" v-for="(item,index) in address" :key="index">
                        <li class="ui-list-item identity"><a @click="isDelete(index)">删除</a>
                            <span class="consignee">{{item.name}}</span>
                            <span>{{item.tel}}</span>
                            <em v-if="item.isDefault">[默认]</em>
                        </li>
                        <li class="ui-list-item edit" @click="$router.push(`edit/${index}`)">
                                <p>{{`${item.province} ${item.city} ${item.country}`}}</p>
                                <p>{{item.addressDetail}}</p>
                        </li>
                    </ul>
                    <ul class="ui-card-item ui-list" v-if="!address.length">
                        <li class="ui-list-item identity"><a>删除</a>
                            <span class="consignee">蔡徐坤</span>
                            <span>66666666666</span>
                            <em>[默认]</em>
                        </li>
                        <li class="ui-list-item edit">
                            <p>当前地址簿为空</p>
                            <p>新增地址后此地址将消失</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="add">
            <router-link class="btn ui-button ui-button-active" to="edit/a">
                <span>新建地址</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        methods: {
            isDelete(index) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定删除当前地址?',
                }).then(() => {
                    this.address.splice(index,1)
                    this.$store.dispatch('updateAddress',this.address)
                }).catch(() => {

                });
            }
        },
        computed: {
            ...mapState(['address'])
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .container
        padding-top 50px
        color #3c3c3c
        background #fff

        .address-manager
            position relative
            padding-bottom 60px

            .ui-card
                border: 1px solid #f6f6f6;
                overflow: hidden;
                margin: 12px;
                border-radius: 4px;
                background: #fff;
                text-align: left;

                .ui-list
                    position relative

                    .edit
                        position: relative;
                        padding-right: 30px;
                        font-size: 14px !important

                        &:before
                            content: " ";
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            right: 8px;
                            top: 50%;
                            margin-top: -4px;
                            border-right: 1px solid #999;
                            border-bottom: 1px solid #999;
                            -webkit-transform: rotate(-45deg);

                    .ui-list-item
                        border-bottom: 1px solid #f6f6f6;
                        display: block;
                        font-size: 16px;
                        overflow: hidden;
                        background: #fff;
                        padding: 12px 18px;

                .ui-card-item
                    padding 0 12px

                    .identity
                        a
                            float: right;
                            color: #999;

                        .consignee
                            margin-right: 36px;
                            color: #f60;

                        em
                            color: #f60;
                            font-size: 12px;
                            font-style: normal;
                            margin-left: 3px;


        .add
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            z-index: 1;
            .btn
                display: block;
                outline: 0;
                background: #ff6700;
                color: #fff;
                text-align: center;
                width: 100%;
                height: 60px;
                line-height: 60px;
                font-size: 16px;
</style>
