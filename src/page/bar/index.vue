<template>
  <div id="container" >
    <div id="payload"></div>
    <div class="box" :style="boxStyle" ref="e" @touchmove='handleMove' @touchstart='handleStart'></div>
  </div>
</template>
<script>

// import {debounce}  from "lodash"
export default {
  name: 'Bar',
  data() {
    return {
      clientX: 0,
      clientY: 0,
      distanceX: 0,
      distanceY: 0,
    }
  },
  computed: {
    boxStyle() {
      return `position: relative; left: ${this.clientX}px; top: ${this.clientY}px`
    }
  },
  created: function () {
    // console.log(this.$router.params)
  },
  mounted() {
    console.log(this.$refs.e.offsetWidth)
    this.init()
  },
  methods: {
    handleMove(e){
      const {clientX, clientY} = e.touches[e.touches.length - 1]
      this.clientX = clientX
      this.clientY = clientY
      // console.log(clientX, clientY)
    },
    handleStart(d){
      const {clientX, clientY} = d.touches[d.touches.length - 1]
      console.log(d,this.$refs.e.offsetTop, clientX, clientY,11111)
    },
    init(){
      this.clientX = -this.$refs.e.offsetWidth + 20
    }
  }
}
</script>

<style lang="less" scoped>
#container {
  height: 200px;
  overflow: auto;
  background-color: gray;
  /* background: black; */
  // #payload {
  // height: 300px;
  // }
  .box{
    background-color: white;
    width: 100px;
    height:50px;
    transition: all 0s ease-in-out;
  }
}
</style>