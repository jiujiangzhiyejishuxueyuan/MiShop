<template>
    <div class="login">
        <div class="login-box">
            <div class="login-content">
                <div class="lgnheader">
                    <div class="header_tit t_c">
                        <em id="custom_display_1" class="milogo">
                            <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <rect width="48" height="48" rx="3" ry="3" style="fill:#ff6700"></rect>
                                <rect x="10" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect>
                                <rect x="33.75" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect>
                                <rect x="11.25" y="15" width="15" height="4.1" style="fill:#FFFFFF"></rect>
                                <rect x="26.2" y="20.55" width="4.2" height="12.5" style="fill:#FFFFFF"></rect>
                                <rect x="20.6" y="15" width="9.8" height="9.8" rx="4.4" ry="4.4"
                                      style="fill:#FFFFFF"></rect>
                                <rect x="20.2" y="19" width="6" height="6" rx="2" ry="2" style="fill:#ff6700"></rect>
                                <rect x="18" y="19.1" width="4" height="2.2" style="fill:#ff6700"></rect>
                                <rect x="24.2" y="23" width="1.94" height="10" style="fill:#ff6700"></rect>
                                <rect x="18.1" y="22.8" width="4.2" height="10.2" style="fill:#FFFFFF"></rect>
                            </svg>
                        </em>
                        <h4 class="header_tit_txt" id="login-title">小米帐号登录</h4>
                        <div class="site_info"></div>
                    </div>
                </div>
                <div class="main">
                    <div class="inputbg">
                        <div class="inputbox">
                            <input type="text" placeholder="用户名" v-model="name">
                        </div>
                        <div class="inputbox box-flex align-center">
                            <input :type="passwordType" placeholder="密码" v-model="pwd" @keydown.enter="login">
                            <div class="eye" @click="cutType">
                                <img src="../../static/imgs/eye.png" alt="" v-if="eyeShow">
                                <img src="../../static/imgs/eyeactive.png" alt="" v-else>
                            </div>
                        </div>
                    </div>
                    <div class="btnsbg">
                        <button class="btn" @click="login" >
                            立即登陆/注册
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {reqPwdLogin} from '../../api'
    import Vue from 'vue'
    import {Notify} from 'vant'

    Vue.use(Notify)
    export default {
        data() {
            return {
                passwordType: 'password'
                ,eyeShow: true
                ,name: ''
                ,pwd: ''
            }
        },
        methods:{
            //密码切换显示隐藏
            cutType() {
                this.eyeShow = !this.eyeShow
                this.passwordType = this.passwordType === 'password' ? 'text' : "password"
            },
            async login() {
                const {name,pwd} = this
                if(!name) {
                    // 用户名必须指定
                    Notify('用户名必须指定')
                    return
                } else if(!pwd) {
                    // 密码必须指定
                    Notify('密码必须指定')
                    return
                }
                const result = await reqPwdLogin({name,pwd})
                if (result) {
                    this.$store.dispatch('getUserInfo')
                    this.$store.dispatch('getAddress')
                    this.$store.dispatch('getCart')
                    this.$router.go(-1)
                } else {
                    Notify('密码错误')
                }
            }
        },
        mounted() {
            if(this.$store.state.userInfo.username) {
                this.$router.replace('/user')
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    input
        background: none;
        border: 0 none;
        color: #4a4a4a;

    .login
        height 100%

        .login-box
            width: 100%;
            margin: 0 auto 30px;
            padding: 0 20px;
            position: relative;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;

            .header_tit
                padding 30px 0 10px

                .milogo
                    width: 48px;
                    height: 48px;
                    margin: 0 auto 15px;
                    display: block;

                .header_tit_txt
                    font-size: 18px;
                    color: #000;
                    font-weight: normal;

            .inputbox
                border-bottom: 1px solid #d3d3d3;
                position relative
                input
                    width: 100%;
                    padding: 19px 0;
                    line-height: normal;
                    display: block;
                    font-size: 18px;
                .eye
                    width 20px
                    height 20px
                    display block
                    img
                        width 100%
                        height 100%
            .btnsbg
                padding-top 24px
                .btn
                    width: 100%;
                    height 44px
                    padding: 5px 0;
                    display: block;
                    margin-bottom: 14px;
                    text-align: center;
                    font-size: 18px;
                    color: #fff;
                    cursor: pointer;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    -o-border-radius: 6px;
                    border none
                    border-radius: 6px;
                    overflow: hidden;
                    background-color: #ff6700;
                    line-height 40px
</style>
