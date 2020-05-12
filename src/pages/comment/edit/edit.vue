<template>
    <div class="comment-edit-wrap">
            <van-nav-bar
                    title="评论"
                    right-text="发布"
                    fixed
                    size="large"
                    @click-left="$router.go(-1)"
                    @click-right="issue"
            >
                <template #left>
                    <van-icon name="cross" size="18" color="#3c3c3c" />
                </template>
                <template #right>
                    <van-button round type="info" size="small" color=" #ff6700">发布</van-button>
                </template>
            </van-nav-bar>
            <div class="comment-edit-view">
                <div class="edit">
                    <van-field v-model="commentContent"
                               placeholder="觉得产品怎么样,来评价下吧!"
                               autosize
                               type="textarea"
                               maxlength="150"
                    />
                    <van-uploader v-model='fileList' :after-read="afterRead" max-count="8" @delete="deleteImg"/>
                </div>
                <div class="check-bottom">
                    <p>请打分</p>
                    <van-rate v-model="starValue"/>
                    <p v-if="productList.length>1">请选择需要评价的商品</p>
                    <van-radio-group v-model="productId"  v-if="productList.length>1">
                        <van-cell-group>
                            <van-cell :title="product.goodsName+' '+product.option"
                                      clickable
                                      @click="selecteProduct(index,product.goodsId)"
                                      v-for="(product,index) in productList" :key="index">
                                <template #right-icon>
                                    <van-radio :name="product.goodsId" />
                                </template>
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </div>
            </div>
        </div>
</template>

<script>
    import {reqOrderView, submitComment} from '@/api'
    import axios from 'axios'

    export default {
        beforeRouteEnter(to,from,next) {
            reqOrderView(to.params.id).then((res)=> {
                next(vm=> {
                    vm.productList = res.items.filter(item => {
                        return !item.isComment
                    })
                    vm.orderId = res._id
                    vm.productId = res.items[0].goodsId
                })
            })
        },
        data() {
            return {
                productList: '',
                commentContent: '',
                starValue: 0,
                productId: '',
                fileList: [],
                imgList: [],
                orderId:'',
                productIndex: 0,
            }
        },
        methods: {
            selecteProduct(index,id) {
                this.productId = id
                this.productIndex = index
            },
            afterRead(file) {
                let formData = new FormData()
                formData.append('imgFile', file.file)
                axios.post('/api/upload/img', formData, {
                    headers: {
                        'enctype': 'multipart/form-data'
                    }
                }).then(res => {
                    this.imgList.push(res.data)
                })
            },
            issue() {
                const {starValue,commentContent,productId,imgList,productIndex,orderId} = this
                const comment = {
                    createTime: new Date().getTime(),
                    userId: this.$store.state.userInfo._id,
                    content: commentContent,
                    star: starValue,
                    goodsId: productId,
                    imgs: imgList,
                    orderId,
                    productIndex
                }
                submitComment(comment).then((res)=> {
                    this.$router.replace(`/comment/view/${res}`)
                })
            },
            deleteImg(file,detail) {
                this.imgList.splice(detail.index,1)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .comment-edit-wrap
        position relative
        .comment-edit-view
            padding-top 50px
            .edit
                margin 0 3px
                position relative
                height 350px
                border-radius 15px
                background-color #fff
                .van-cell:not(:last-child)::after
                    border none
                .van-uploader
                    position: absolute;
                    left 10px
                    bottom 0
            .check-bottom
                display flex
                flex-direction column
                padding 10px 10px
                text-align left
                color #3c3c3c
                p
                    margin-bottom 20px
                    color #969799
                .van-rate
                    margin-bottom  20px
                    margin-left 15px


</style>
