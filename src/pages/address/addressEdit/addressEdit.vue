<template>
    <div>
        <van-address-edit
                :area-list="areaList"
                :address-info="address[index]"
                show-set-default
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
        />
    </div>
</template>

<script>
    import areaList from '../../../api/area-list'

    export default {
        data() {
            return {
                areaList,
                index: this.$route.params.id,
                address: this.$store.state.address,
            }
        },
        methods: {
            onSave(value) {
                let address = this.address || []
                const index = this.index

                if(value.isDefault) {
                    for (let item of address) {
                        item.isDefault = false
                    }
                }
                if (index!=='a') {
                    address[index] = value
                } else {
                    address.push(value)
                }
                this.$store.dispatch('updateAddress',address)
                this.$router.go(-1)
            }
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .van-address-edit
        padding-top 50px
        text-align left
        .van-button--danger
            background-color #ff6700
            border-color #ff6700
</style>
