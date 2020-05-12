<template>
  <div id="app">
    <transition name="header">
      <Header :title="$route.meta.title" v-show="$route.meta.title" />
    </transition>
    <transition name="main">
      <keep-alive>
        <router-view v-if="$route.meta.keep"/>
      </keep-alive>
    </transition>
    <transition name="main">
      <router-view v-if="!$route.meta.keep"/>
    </transition>
    <transition name="footer">
      <Footer v-show="$route.meta.showFooter"/>
    </transition>
  </div>
</template>

<script>
  import Footer from './components/Footer/Footer'
  import Header from './components/Header/Header'
  import {mapState} from 'vuex'

  export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  created() {
    this.$store.dispatch('getUserInfo')
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getCart')
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/app.styl"
  html,body
    height: 100%;
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;

.footer-enter-active, .footer-leave-active
  transition: all .2s;

.footer-enter, .footer-leave-to
  transform: translateY(50px);

.header-enter-active, .header-leave-active
  transition: all .2s;

.header-enter, .header-leave-to
  transform: translateY(-50px);

.main-enter-active, .main-leave-active
  transition: all .1s;

.main-enter, .main-leave-to
  opacity 0
</style>
