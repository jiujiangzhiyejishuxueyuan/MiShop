<template>
    <div class="comment-list-wrap">
        <div class="comment-list">
            <div class="comment-list-header">
                <span>{{(satisfaction*10).toFixed(1)}}</span>
                <em>%满意</em>
            </div>
            <div class="comment-bar layout align-center justify-start">
                <div><span class="active">最热门</span></div>
                <label>
                    <van-checkbox v-model="checked" shape="square" checked-color="#ff6700">有图片</van-checkbox>
                </label>
            </div>
            <div class="comment-box" v-for="(comment,index) in filterCommentList" :key="index">
                <div class="item" @click="$router.push(`/comment/view/${comment._id}`)">
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
                        <div class="photos p2" >
                            <img :src="img" alt="" v-for="(img,index) in comment.imgs" :key="index"
                                 @click.stop="priview(comment.imgs,index)">
                        </div>
                    </div>
                    <div class="comment-reply" v-if="comment.official">
                        <div class="comment-replay-item official">
                            <div class="text">
                                <div class="avatar"></div>
                                <span >官方回复：</span>如果青春是醺人欲醉的海风，那么这白桃乌龙就是这和风前行的路标。(*￣︶￣)
                            </div>
                            <div class="more border-top-1px">查看全部1条评论</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ImagePreview} from 'vant'
    import {reqBasicInfo, reqCommentList, reqCommentView} from '@/api'

    export default {
        components: {
            [ImagePreview.Component.name]: ImagePreview.Component,
        },
        data() {
            return {
                checked: false,
                value: 5,
                commentList:[],
                satisfaction: 9.9,
            }
        },
        methods: {
            priview(images,index) {
                ImagePreview({
                    images,
                    startPosition:index
                })
            }
        },
        computed: {
            filterCommentList() {
                const {checked,commentList} = this
                return commentList.filter(item => {
                    return checked ? item.imgs.length : true
                })
            }
        },
        beforeRouteEnter(to,from,next) {
            const id = to.params.id
            reqCommentList(id).then(res => {
                let {commentList,star} = res
                commentList = commentList.map((item,index)=> {
                    reqBasicInfo(item.userId).then(res => {
                        item.userInfo = res
                        setTimeout(()=> {
                            if(index===commentList.length-1) {
                                next(vm => {
                                    vm.star = star
                                    vm.satisfaction = star*2/commentList.length || 9.9
                                    vm.commentList = commentList
                                })
                            }
                        },10)
                    })
                    return item
                })
                if(!commentList.length) {
                    reqCommentView('5eb3992d00203095d8729fc9').then(res => {
                        next(vm => {
                            vm.star = 5
                            vm.satisfaction = 10
                            vm.commentList = [res]
                        })
                    })
                }

            })
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .comment-list
        padding-top 50px

        .comment-list-header
            background: #f37d0f;
            color: #fff;
            text-align: center;
            padding: 30px

            span
                font-size: 30px
                padding: 16px 0 11px 55px
                background: url(../../../static/imgs/face.png) no-repeat 0;
                background-size: auto 60%;

            em
                font-style: normal;
                font-size 12px
                margin-left: 12px

        .comment-bar
            height: 55px
            display: box;
            display: -webkit-box;
            box-align: center;
            -webkit-box-align: center;
            box-pack: start;
            -webkit-box-pack: start;
            background: #fafafa;
            font-size: 13.4px
            color: #afafaf;

            div
                box-flex: 1;
                -webkit-box-flex: 1;
                text-align: left;
                position: relative;

                span
                    position: relative;
                    padding: 0 18px

                    &.active
                        color #f60

            label
                padding-right 17px

                .van-checkbox
                    margin-right 18px

                    span
                        color #afafaf
                        padding-right  0
                        padding-left 5px

                    .van-icon
                        border-radius 5px


</style>
