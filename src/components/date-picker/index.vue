<template>
    <transition name="fade">
        <div class="pickerbox" v-show="visible" @click="clickMask">
            <transition name="toup">
                <div
                    class="vue-picker"
                    :class="pickerClass"
                    @click.stop
                    v-show="visible"
                >
                    <div class="content" :style="{ height: boxHeight + 'px' }">
                        <div class="colums">
                            <List
                                :column="yearsList"
                                :boxHeight="boxHeight"
                                :itemHeight="itemHeight"
                                :row-number="rowNumber"
                                :activeIndex.sync="yearIndex"
                            />
                            <List
                                :column="monthesList"
                                :boxHeight="boxHeight"
                                :itemHeight="itemHeight"
                                :row-number="rowNumber"
                                :activeIndex.sync="monthIndex"
                            />
                            <div
                                class="hairline"
                                :style="'height: ' + itemHeight + 'px'"
                            ></div>
                        </div>
                    </div>
                    <div v-if="confirmText" class="footer">
                        <div @click="cancel" class="cancel">
                            {{ cancelText }}
                        </div>
                        <div
                            @click="confirm"
                            class="confirm"
                            :style="confirmStyle"
                        >
                            {{ confirmText }}
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import List from "./list.vue";
import { DEFTAULT_ITEM_HEIGHT } from "./utils.js";
// import { currentYear, currentMonth } from "Constant";
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1
// import {transformMonth, transformDate} from "Utils/transformDate";
export default {
    name: "DatePicker",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        itemHeight: {
            type: [Number, String],
            default: DEFTAULT_ITEM_HEIGHT
        },
        year: {
            type: Number,
            default: new Date().getFullYear()
        },
        month: {
            type: Number,
            default: new Date().getMonth() + 1
        },
        confirmText: {
            type: String,
            default: "确认"
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        rowNumber: {
            type: Number,
            default: 3
        },
        pickerClass: {
            type: String,
            default: ""
        },
        yearsList: {
            type: Array,
            default: () => [
                { label: `2020年`, value: 2020 },
                { label: `2021年`, value: 2021 }
            ]
        },
        // monthesList: {
        //     type: Array,
        //     default: () => [
        //         { label: `1月`, value: 1 },
        //         { label: `2月`, value: 2 },
        //         { label: `3月`, value: 3 },
        //         { label: `4月`, value: 4 },
        //         { label: `5月`, value: 5 },
        //         { label: `6月`, value: 6 },
        //         { label: `7月`, value: 7 },
        //         { label: `8月`, value: 8 },
        //         { label: `9月`, value: 9 },
        //         { label: `10月`, value: 10 },
        //         { label: `11月`, value: 11 },
        //         { label: `12月`, value: 12 }
        //     ]
        // },
        indexNumber: {
            type: Number,
            default: 0
        },
        confirmStyle: {
            type: String,
            default: ""
        }
    },
    components: {
        List
    },
    data() {
        return {
            yearIndex: 0,
            monthIndex: 0,
            monthesList:[],
            currentYear: 2021,
            currentMonth: 12,
        };
    },
    computed: {
        boxHeight() {
            let itemHeight = parseInt(this.itemHeight);
            itemHeight = itemHeight ? itemHeight : DEFTAULT_ITEM_HEIGHT;
            return itemHeight * this.getRowNumber;
        },
        getRowNumber() {
            return this.rowNumber % 2 === 0
                ? this.rowNumber + 1
                : this.rowNumber;
        }
    },
    created() {
        this.initList();
        console.log(this.month);
        // generate 2 years
        // 光大特殊逻辑，仅有当前年开始
        // this.yearsList.unshift({ label: `2020年`, value: 2020 });
        // for (let i = 0; i < 2; i++) {
        //     const year = new Date().getFullYear() - i
        //   this.yearsList.unshift({label: `${year}年`, value: year});
        // }
        // 光大特殊逻辑，月份从7月到9月
        // this.monthesList.push(
        //   { label: `1月`, value: 1 },
        //   { label: `2月`, value: 2 },
        //   { label: `3月`, value: 3 },
        //   { label: `4月`, value: 4 },
        //   { label: `5月`, value: 5 },
        //   { label: `6月`, value: 6 },
        //   { label: `7月`, value: 7 },
        //   { label: `8月`, value: 8 },
        //   { label: `9月`, value: 9 },
        //   { label: `10月`, value: 10 },
        //   { label: `11月`, value: 11 },
        //   { label: `12月`, value: 12 }
        // );
        // generate 12 monthes
        // for (let i = 0; i < 12; i++) {
        //     const month = 1 + i
        //   this.monthesList.push({label: `${month}月`, value: month});
        // }

        // if (this.month) {
        //     // 光大特殊逻辑
            // this.monthIndex = this.month - 1 - this.indexNumber;
        //     //   this.monthIndex = this.month - 1;
        // } else {
            // 光大特殊逻辑
            // this.monthIndex = new Date().getMonth() - 6;
            //   this.monthIndex = new Date().getMonth();
        // }

        // if (this.year) {
            // 光大特殊逻辑
            // this.yearIndex = 0;
            this.monthIndex = this.month - 1 - this.indexNumber;
            this.yearIndex = this.yearsList.length - (new Date().getFullYear() - this.year) -1;
            // this.yearIndex = new Date().getFullYear() - this.year;
            // console.log(this.year,'22222222222222')
        // } else {
        //     this.yearIndex = 0;
        // }
    },
    methods: {
        initList() {
            this.monthesList = [];
            if(this.year == '2020'){
                this.monthesList = [
                    { label: `1月`, value: 1 },
                    { label: `2月`, value: 2 },
                    { label: `3月`, value: 3 },
                    { label: `4月`, value: 4 },
                    { label: `5月`, value: 5 },
                    { label: `6月`, value: 6 },
                    { label: `7月`, value: 7 },
                    { label: `8月`, value: 8 },
                    { label: `9月`, value: 9 },
                    { label: `10月`, value: 10 },
                    { label: `11月`, value: 11 },
                    { label: `12月`, value: 12 }
                ]
            }
            else {
                for (let i = 1; i < Number(currentMonth) + 1; i++){
                    this.monthesList.push(
                        { label: `${i}月`, value: i },
                    )
                }
            }
        },

        clickMask() {
            // this.looseBody();
            this.$emit("dataPickerClose");
        },
        cancel() {
            // this.looseBody();
            this.$emit("dataPickerClose");
            this.$emit("update:visible", false);
        },
        confirm() {
            // this.looseBody();
            this.$emit("update:visible", false);
            this.$emit(
                "updateTime",
                this.yearsList[this.yearIndex].value,
                this.monthesList[this.monthIndex].value
            );
            // this.$emit("update:year", this.yearsList[this.yearIndex].value);
            // this.$emit("update:month", this.monthesList[this.monthIndex].value);
        }
        // fixedBody() {
        //   const scrollTop =
        //     document.body.scrollTop || document.documentElement.scrollTop;
        //   this.prevBodyCss = document.body.style.cssText;
        //   document.body.style.cssText +=
        //     "position:fixed;width:100%;top:-" + scrollTop + "px;";
        // },
        // looseBody() {
        //   const body = document.body;
        //   const top = body.style.top;
        //   body.style.cssText = this.prevBodyCss;
        //   body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
        //   body.style.top = "";
        // }
    },
    watch: {
        // 监听年索引，决定月列表
        yearIndex(newVal) {
            if(this.yearsList[newVal].value == currentYear){
                this.monthesList = [];
                for(let i = 1; i < Number(currentMonth) + 1; i++){
                    this.monthesList.push(
                        { label: `${i}月`, value: i },
                    )
                }
                if(this.monthesList.length - 1 <  this.monthIndex){
                    this.monthIndex = this.monthesList.length - 1
                }
            }
            if(this.yearsList[newVal].value < currentYear){
                this.monthesList = [];
                this.monthesList=[
                    { label: `1月`, value: 1 },
                    { label: `2月`, value: 2 },
                    { label: `3月`, value: 3 },
                    { label: `4月`, value: 4 },
                    { label: `5月`, value: 5 },
                    { label: `6月`, value: 6 },
                    { label: `7月`, value: 7 },
                    { label: `8月`, value: 8 },
                    { label: `9月`, value: 9 },
                    { label: `10月`, value: 10 },
                    { label: `11月`, value: 11 },
                    { label: `12月`, value: 12 }
                ]
            }
        }
        // visible(v) {
        //   if (v) {
        //     this.fixedBody();
        //   }
        // }
    }
};
</script>
<style lang="less" scoped>
.pickerbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    bottom: 0;
    z-index: 9999;
    overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.toup-enter-active,
.toup-leave-active {
    transition: transform 0.3s;
}
.toup-enter,
.toup-leave-to {
    transform: translate3d(0, -30px, 0);
}
// ----
.vue-picker {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    user-select: none;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
}
.header {
    font-size: 16px;
    color: #253c96;
    display: -webkit-box;
    line-height: 54px;
    border-bottom: 1px solid #f0f0f0;
    span {
        display: block;
        -webkit-box-flex: 1;
        color: #000;
        letter-spacing: 1px;
        text-align: center;
    }
}
.footer {
    display: flex;
    text-align: center;
    line-height: 58px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.33px;
    border-top: 1px solid #f0f0f0;
    .cancel {
        flex: 1;
        color: #000;
    }
    .confirm {
        flex: 1;
        background: #181f6f;
        color: #fff;
    }
}
.content {
    position: relative;
    display: flex;
    overflow: hidden;
    height: 220px;
    .hairline {
        position: absolute;
        top: 50%;
        left: 0;
        z-index: 3;
        width: 100%;
        transform: translateY(-50%);
        pointer-events: none;
        background: rgba(160, 193, 234, 0.2);
    }
}
.colums {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0.9),
            hsla(0, 0%, 100%, 0.4)
        ),
        linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    backface-visibility: hidden;
    pointer-events: none;
    background-size: 100% 88px;
}
</style>
