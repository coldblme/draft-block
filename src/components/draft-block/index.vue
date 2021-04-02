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
	props:{
		flex: {
			type: Boolean,
			default: false
		},
		drag:{
			type: Boolean,
			default: true
		},
		rotate:{
			type: Boolean,
			default: false
		}
	},
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
			// drag: true,
			start_flex: [],
			now_flex: [],
			scale: 0,
			start_rotate:[],
			now_rotate:[],
			angle: 0,
			vnode: null,
			isPC: false,
			mousePress:false,
			identifier:null
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
			return `position: relative; left: ${this.clientX}px; top: ${this.clientY}px; height: ${this.height}px; width: ${this.width}px; transform:rotate(${this.angle}deg)`;
		},
	},
	methods: {
		init() {
			if(this.$refs.e.childNodes.length != 1){
				throw '只可传入单个DOM元素'
			}
			this.vnode = this.$refs.e.childNodes[0];
			const { vnode } = this;
			this.height = vnode.offsetHeight;
			this.width = vnode.offsetWidth;
			this.vnode.style = this.boxStyle;
			// if(this.isPC){
			// 	vnode.addEventListener("mousedown", this.handlePCStart);
			// 	vnode.addEventListener("mousemove", this.handlePCMove);
			// 	vnode.addEventListener("mouseup", this.handlePCEnd);
			// }else{
				vnode.addEventListener("touchstart", this.handleStart);
				vnode.addEventListener("touchmove", this.handleMove);
				vnode.addEventListener("touchend", this.handleEnd);
			// }
		},
		// handlePCStart(e){
		// 	this.mousePress = true
		// 	const { clientX, clientY } = e;
		// 	this.marginX = clientX - this.vnode.offsetLeft;
		// 	this.marginY = clientY - this.vnode.offsetTop;
		// },
		// handlePCMove(e){
		// 	if(this.mousePress){
		// 		const { clientX, clientY } = e;
		// 		this.clientX = clientX - this.marginX;
		// 		this.clientY = clientY - this.marginY;
		// 	}
		// 	this.updateStyle();
		// },
		// handlePCEnd(e){
		// 	console.log(e, "inside")
		// 	this.mousePress = false
		// },
		updateStyle() {
			this.vnode.style = this.boxStyle;
		},
		handleDefault(e) {
			e.preventDefault();
		},
		handleStart(d) {
			// 双指操作
			if (d.targetTouches.length >= 2 && this.flex) {
				this.handleFlex(d, 'start')
			}
			if(d.targetTouches.length >= 2 && this.rotate){
				this.handleRotate(d, 'start')
			}
			if(this.drag){
				this.handleDrag(d, 'start')
			}
		},
		handleMove(e) {
			e.preventDefault();
			// 双指放大缩小操作
			if (e.targetTouches.length >= 2 && this.flex) {
				this.handleFlex(e, 'move')
			}
			if(e.targetTouches.length >= 2 && this.rotate){
				this.handleRotate(e, 'move')
			}
			clearTimeout(this.startTime);
			if (this.drag) {
				this.handleDrag(e, 'move')
			}
			this.updateStyle();
		},
		handleEnd(e) {
			clearTimeout(this.startTime);
			console.log(e, "inside")
			if(e.targetTouches.length >= 2 && this.rotate){
				this.handleRotate(e, 'end')
			}
		},
		getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		},
		changeColor() {
			let colorList = ["red", "blue", "green", "pink", "blank", "white"];
			let index = this.getRndInteger(0, 5);
			return colorList[index];
		},
		getDistance(p1, p2) {
			const x = p2.pageX - p1.pageX,
				y = p2.pageY - p1.pageY;
			return Math.sqrt(x * x + y * y);
		},
		getAngle(p1, p2){
			const x = p2.pageX - p1.pageX,
				y = p2.pageY - p1.pageY;
			const z = Math.sqrt(x * x + y * y);
			return y/z
		},

		handleDrag(e, action){
			switch(action){
				case 'start':{
					const { clientX, clientY } = e.targetTouches[e.targetTouches.length - 1];
					this.identifier = e.targetTouches[e.targetTouches.length - 1].identifier
					// console.log(this.identifier, 'identifier')
					this.marginX = clientX - this.vnode.offsetLeft;
					this.marginY = clientY - this.vnode.offsetTop;
					break
				}
				case 'move':{
						const fingers = e.targetTouches;
						const { clientX, clientY } = fingers[fingers.length - 1];
						this.info = fingers.length;
						this.clientX = clientX - this.marginX;
						this.clientY = clientY - this.marginY;
						break
				}
				case 'end':{
					break
				}
			}
		},

		handleFlex(e, action){
			switch(action){
				case 'start':{
					this.start_flex = e.targetTouches;
					break
				}
				case 'move':{
						this.now_flex = e.targetTouches;
						this.scale = this.getDistance(this.now_flex[0], this.now_flex[1]) - this.getDistance(this.start_flex[0], this.start_flex[1]);
						this.height = this.height + this.scale;
						this.width = this.width + this.scale;
						// 开始坐标换成当前坐标
						this.start_flex = this.now_flex
						break
				}
				case 'end':{
					break
				}
			}
		},

		handleRotate(e, action){
			switch(action){
				case 'start':{
					this.start_rotate = e.targetTouches;
					break
				}
				case 'move':{
					e.preventDefault()
						this.now_rotate = e.targetTouches;
						let cornA = Math.round(Math.asin(this.getAngle(this.start_rotate[0], this.start_rotate[1])) * 180/Math.PI);
						let cornB = Math.round(Math.asin(this.getAngle(this.now_rotate[0], this.now_rotate[1])) * 180/Math.PI);
						let rate = cornA - cornB
						if(this.start_rotate[0].pageX < this.start_rotate[1].pageX){
							rate = cornB - cornA 
						}
						this.angle += rate
						this.start_rotate = this.now_rotate
						console.log(this.angle, 'this.angle')
						break
				}
				case 'end':{
					break
				}
			}
		}
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
