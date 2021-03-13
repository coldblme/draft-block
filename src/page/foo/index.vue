<template>
  <div style="height: 300px; overflow: auto" ref="e" @scroll="consol">
    <div style="height: 200px">1</div>
    <div style="height: 200px">2</div>
    <div style="height: 200px">3</div>
</div>
</template>
<script>
// var debounce = function (fn, delayTime) {
// 		let timer
// 		return function () {
// 			clearTimeout(timer)
// 			timer = setTimeout(() => {
// 				fn.call(this)
// 			}, delayTime)
			
// 		}
// }
// import {debounce}  from "lodash"
export default {
  name: 'Foo',
  data(){
    return{
      lastStep: Date.now() - 1000,
      rate: 1000,
    }
  },
  created: function () {
  },
  computed: {
    scrollToTop(){
      return this.$refs.e
    }
  },
  methods: {
    // debounce(){
    //   consol
    // },
    consol(){
      console.log(this.scrollToTop.scrollTop, 'scrollTop')
      console.log(this.scrollToTop.offsetHeight, 'offsetHeight')
      console.log(this.scrollToTop.scrollHeight, 'scrollHeight')
    }
    // handleStart:throttle(function(){
    //   console.log('hello')
    //   console.log(this)
    // },1000)
    // handleStart: debounce(function(){
    //   console.log('hello')
    // },1000)
    // handleStart(){

    //   setTimeout(()=>{
    //     console.log('123')
    //   }, this.rate)
    // }
  }
}
</script>

<style lang="less" scoped>
.foo{
  // height: 50%;
  .bar{
    // height: 1000px;
    // overflow: scroll;
  }
}
</style>