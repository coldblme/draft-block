<script>
    export default {
        name: 'BankCardInput',
        props: {
            value: {
                type: String,
                required: true
            }
        },
        data: () => ({
            cardNumberDisplay: ''
        }),
        methods: {
            cardNumberDisplayChange(e) {
                const {target} = e
                const value = target.value;

                let formatedCardNumber = "";

                const pureCardNumber = value
                    .replace(/\D/g, "")
                    .replace(/[^0-9]+/g, "")
                    .substring(0, 16);

                this.$emit('input', pureCardNumber)

                for (let i = 0, len = pureCardNumber.length; i < len; i++) {
                    if (i % 4 === 0 && i > 0) {
                        formatedCardNumber = formatedCardNumber + " " + pureCardNumber.charAt(i);
                    } else {
                        formatedCardNumber = formatedCardNumber + pureCardNumber.charAt(i);
                    }
                }
                console.log(target.selectionStart,'target')

                //获取当前光标的位置
                var caret = target.selectionStart
                //从左边沿到坐标之间的空格数
                var sp =  (value.slice(0, caret).match(/\s/g) || []).length
                //从左边沿到原坐标之间的空格数
                var curSp = (formatedCardNumber.slice(0, caret).match(/\s/g) || []).length


                this.cardNumberDisplay = formatedCardNumber;
                this.$forceUpdate();

                this.$nextTick(() => {
                    target.selectionEnd = target.selectionStart = caret + curSp - sp
                })
            }
        }
    }
</script>

<template src="./template.html" />
