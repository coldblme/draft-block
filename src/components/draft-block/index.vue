<template>
	<div id="container" @click="handleDefault" @touch="handleDefault">
		<div id="controller" ref="e">
			<slot></slot>
		</div>
	</div>
</template>
<script>
import {isPC} from '../../constant'

export default {
	name: "Foo",
	data() {
		return {
			clientX: 0,
			clientY: 0,
			distanceX: 0,
			distanceY: 0,
			marginX: 0,
			marginY: 0,
			height: 0,
			width: 0,
			info: "",
			startTime: null,
			endTime: null,
			// color: "white",
			drag: true,
			start: [],
			now: [],
			scale: 0,
			vnode: null,
			isPC: false,
			mousePress:false
		};
	},
	created: function() {
		this.isPC = isPC
	},
	mounted() {
		this.init();
	},
	computed: {
		boxStyle() {
			return `position: absolute; left: ${this.clientX}px; top: ${this.clientY}px; height: ${this.height}px; width: ${this.width}px`;
		},
	},
	methods: {
		init() {
			console.log(this.$refs.e.style)
			this.vnode = this.$refs.e.childNodes[0];
			const { vnode } = this;
			this.height = vnode.offsetHeight;
			this.width = vnode.offsetWidth;
			this.vnode.style = this.boxStyle;
			if(this.isPC){
				vnode.addEventListener("mousedown", this.handlePCStart);
				vnode.addEventListener("mousemove", this.handlePCMove);
				vnode.addEventListener("mouseup", this.handlePCEnd);
			}else{
				vnode.addEventListener("touchstart", this.handleStart);
				vnode.addEventListener("touchmove", this.handleMove);
				vnode.addEventListener("touchend", this.handleEnd);
			}
		},
		handlePCStart(e){
			this.mousePress = true
			const { clientX, clientY } = e;
			this.marginX = clientX - this.vnode.offsetLeft;
			this.marginY = clientY - this.vnode.offsetTop;
		},
		handlePCMove(e){
			if(this.mousePress){
				const { clientX, clientY } = e;
				this.clientX = clientX - this.marginX;
				this.clientY = clientY - this.marginY;
			}
			this.updateStyle();
		},
		handlePCEnd(e){
			this.mousePress = false
			console.log(e)
		},
		updateStyle() {
			this.vnode.style = this.boxStyle;
		},
		handleDrag() {
			// this.drag = true;
		},
		handleDefault(e) {
			e.preventDefault();
		},
		handleMove(e) {
      console.log(456)
			e.preventDefault();
			// 双指操作
			if (e.touches.length >= 2) {
				this.now = e.touches;
				this.scale = (
					this.getDistance(this.now[0], this.now[1]) /
					this.getDistance(this.start[0], this.start[1])
				).toFixed(2);
				this.height = this.height * this.scale;
				this.width = this.width * this.scale;
				if (this.height > 300) {
					this.height = 300;
				}
				if (this.height < 50) {
					this.height = 50;
				}
			}
			clearTimeout(this.startTime);
			if (this.drag) {
				const fingers = e.touches;
				const { clientX, clientY } = fingers[fingers.length - 1];
				this.info = fingers.length;
				this.clientX = clientX - this.marginX;
				this.clientY = clientY - this.marginY;
			}
			this.updateStyle();
		},
		handleStart(d) {
      console.log(123)
			// 双指操作
			if (d.touches.length >= 2) {
				this.start = d.touches;
			}
			const { clientX, clientY } = d.touches[d.touches.length - 1];
			this.marginX = clientX - this.vnode.offsetLeft;
			this.marginY = clientY - this.vnode.offsetTop;
			this.startTime = setTimeout(() => {
				this.drag = true;
			}, 1000);
		},
		getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		},
		changeColor() {
			let colorList = ["red", "blue", "green", "pink", "blank", "white"];
			let index = this.getRndInteger(0, 5);
			return colorList[index];
		},
		handleEnd(e) {
      console.log(456)
			clearTimeout(this.startTime);
			// this.drag = false;
			console.log(e);
			// if (this.clientX < 0) {
			// 	this.clientX = 0;
			// }
			// if (
			// 	this.clientX + this.vnode.offsetWidth >
			// 	this.vnode.parentNode.offsetWidth
			// ) {
			// 	this.clientX =
			// 		this.vnode.parentNode.offsetWidth -
			// 		this.vnode.offsetWidth;
			// }
			// if (
			// 	this.clientY + this.vnode.offsetHeight >
			// 	this.vnode.parentNode.offsetHeight
			// ) {
			// 	this.clientY =
			// 		this.vnode.parentNode.offsetHeight -
			// 		this.vnode.offsetHeight;
			// }
			// if (this.clientY < 0) {
			// 	this.clientY = 0;
			// }
			// this.updateStyle()
		},
		getDistance(p1, p2) {
			const x = p2.pageX - p1.pageX,
				y = p2.pageY - p1.pageY;
			return Math.sqrt(x * x + y * y);
		},
	},
};
</script>

<style lang="less" scoped>
#container {
	height: 100%;
	overflow: hidden;
	background: gray;
	position: relative;
	user-select: none;
}
.box {
	// height: 100px;
	// width: 100px;
	// position: absolute;
	border-radius: 50%;
	background: white;
}
</style>
