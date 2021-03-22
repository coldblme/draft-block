<template>
	<div id="container" @click="handleDefault" @touch="handleDefault">
		<div
			class="box"
			:style="boxStyle"
			ref="e"
			@touchmove="handleMove"
			@touchstart="handleStart"
			@touchend="handleEnd"
			@dblclick="handleDrag"
		>
		</div>
			<slot
				class="box"
				:style="boxStyle"
				ref="e"
				@touchmove="handleMove"
				@touchstart="handleStart"
				@touchend="handleEnd"
				@dblclick="handleDrag"
			>
			</slot>
	</div>
</template>
<script>
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
			height: 100,
			// width: 100,
			info: "",
			startTime: null,
			endTime: null,
			color: "white",
			drag: true,
			start: [],
			now: [],
			scale: 0,
		};
	},
	created: function() {},
	computed: {
		boxStyle() {
			return `position: absolute; left: ${this.clientX}px; top: ${this.clientY}px; height: ${this.height}px; width: ${this.height}px; background: ${this.color};`;
		},
	},
	methods: {
		handleDrag() {
			this.drag = true;
		},
		handleDefault(e) {
			e.preventDefault();
		},
		handleMove(e) {
			e.preventDefault();
			// 双指操作
			if (e.touches.length >= 2) {
				this.now = e.touches
				this.scale = (this.getDistance(this.now[0],this.now[1])/this.getDistance(this.start[0],this.start[1])).toFixed(2)
				console.log(this.scale)
				this.height = this.height * this.scale
				if(this.height > 300){
					this.height = 300
				}
				if(this.height < 50){
					this.height = 50
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
		},
		handleStart(d) {
			// 双指操作
			if (d.touches.length >= 2) {
				this.start = d.touches;
			}
			const { clientX, clientY } = d.touches[d.touches.length - 1];
			this.marginX = clientX - this.$refs.e.offsetLeft;
			this.marginY = clientY - this.$refs.e.offsetTop;
			// this.startTime = setInterval(()=>{
			//   this.color = this.changeColor()
			// },1000)
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
			clearTimeout(this.startTime);
			// this.drag = false;
			console.log(e);
			if (this.clientX < 0) {
				this.clientX = 0;
			}
			if (
				this.clientX + this.$refs.e.offsetWidth >
				this.$refs.e.parentNode.offsetWidth
			) {
				this.clientX =
					this.$refs.e.parentNode.offsetWidth - this.$refs.e.offsetWidth;
			}
			if (
				this.clientY + this.$refs.e.offsetHeight >
				this.$refs.e.parentNode.offsetHeight
			) {
				this.clientY =
					this.$refs.e.parentNode.offsetHeight - this.$refs.e.offsetHeight;
			}
			if (this.clientY < 0) {
				this.clientY = 0;
			}
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
	position: absolute;
	border-radius: 50%;
}
</style>
