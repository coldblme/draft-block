<script>
import MeScroll from "../mescroll/mescroll"
import "../mescroll/mescroll.min.css"
export default {
  name: "RecordDataList",
  data: ()=>{
    return {
      mescroll: null,
    }
  },
  props: {
    up: Object,
    down: Object
  },
  mounted() {
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      up: this.up,
      down: this.down,
    })
    // 将mescroll实例传回页面
    this.$emit("init", this.mescroll)
  }
}
</script>
<template src="./template.html" />
<style scoped lang="less" src="./style.less" />