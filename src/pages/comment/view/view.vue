<template>
    <div class="comment-view-wrap">
        <div class="comment-box" v-if="comment.userInfo">
            <div class="item">
                <div class="comment-header layout align-center">
                    <div class="avatar-img-box">
                        <img src="../../../static/imgs/default-avatar.jpg" v-if="!comment.userInfo.avatar">
                        <img :src="comment.userInfo.avatar" v-else>
                    </div>
                    <div class="user-info flex">
                        <p class="name">{{comment.userInfo.nickName||comment.userInfo.name}}</p>
                        <p class="comment-date">{{comment.createTime | dataFormat}}</p></div>
                    <van-rate v-model="comment.star" readonly />
                </div>
                <div class="comment-content">
                    <div class="text">{{comment.content}}</div>
                    <div class="photos p2">
                        <img :src="img" v-for="(img,index) in comment.imgs" :key="index"
                             @click="priview(img)">
                    </div>
                </div>
                <div class="comment-reply" v-if="comment.official">
                    <div class="comment-replay-item official">
                        <div class="text">
                            <div class="avatar"></div>
                            <span >官方回复：</span>{{comment.official}}(*￣︶￣)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {reqCommentView} from "@/api";
    import {ImagePreview} from 'vant';

    export default {
        components: {
            [ImagePreview.Component.name]: ImagePreview.Component,
        },
        beforeRouteEnter(to,from,next) {
            const id = to.params.id
            reqCommentView(id).then((res)=> {
                next(vm => {
                    vm.comment = res
                })
            })
        },
        data() {
            return {
                comment: ''
            }
        }
        ,methods: {
            priview(url) {
                ImagePreview([url])
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .comment-view-wrap
        padding-top 50px
</style>
