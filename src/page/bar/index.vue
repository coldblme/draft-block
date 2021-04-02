<template>
  <!-- <div class="box"> -->
  <DraftBlock
    :rotate="true"
    :flex="true"
    :drag="true"
  >
    <!-- <div class="button"
      @touchstart="handleStart"
      @touchmove="handleMove"
      @touchend="handleEnd"
    ></div> -->
    <img src="../../assets/test.jpg" class="button"/>
  </DraftBlock>
  <!-- </div> -->
</template>
<script>

import DraftBlock from '../../components/draft-block'
import {isPC} from '../../constant'
export default ({
  name: 'Bar',
  components:{
    DraftBlock
  },
  data(){
    return {

    }
  },
  created(){
    console.log(isPC)
  },
  methods:{
    // handleStart(e){
    //   // 阻止冒泡
    //   // e.preventDefault();
    //   console.log(e, 'out')
    // },
    // handleMove(e){
    //   console.log(e, 'out')
    // },
    // handleEnd(e){
    //   console.log(e, 'out')
    // },
    // handleClick(e){
    //   console.log(e, 'click')
    // }
  }
})
</script>

<style scoped>
/* .box{
  height: 500px;
} */
.button{
  width: 300px;
  height: 200px;
  /* border-radius: 50%; */
  background: wheat;
}
</style>
