import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('dataFormat',(value)=> {
    return format(value,'yyyy/MM/dd HH:mm')
})
