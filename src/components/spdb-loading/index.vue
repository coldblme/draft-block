<script>
    export default {
        name: 'Loading',
        props:{
            // loading下文字
            tip:{
                type: String,
                default:'',
                required: false
            }
        }
    }
</script>

<template src="./template.html" />
<style scoped lang="less" src="./style.less"/>
