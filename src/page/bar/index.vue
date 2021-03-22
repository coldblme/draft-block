<template>
  <DraftBlock>
    <div class="button"></div>
  </DraftBlock>
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
    handleStart(){
      console.log(123)
    }
  }
})
</script>

<style scoped>
.button{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: wheat;
}
</style>
