<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Todo from './components/Todo.vue'
import { mapState, mapGetters, mapMutations } from "vuex";
// import Rx from 'rxjs/Rx';
// import _ from "lodash";

export default {
	name: "App",
	components: {
		// HelloWorld,
		// Todo
	},
	data() {
		return {
			list: 4,
			foo: {
				name: "LPN",
			},
			count: 0,
			lastClick: Date.now() - 1000,
			arr: [1, 2, 3, 4],
		};
	},
	created() {
		// this.imageGet()
		// console.log(_.chunk(this.arr, 3));
		// console.log(this.foo.filter(item=> !!item))
	},
	computed: {
		...mapState(["name"]),
		...mapGetters(["nickname"]),
	},
	methods: {
		...mapMutations({
			add: "handleName",
		}),
		imageGet(){
			const img = new Image();
			img.src = "http://192.168.154.121:3076"
		},
		warn(message, event) {
			// 现在可以访问到原生事件
			if (event) {
				event.preventDefault();
			}
			console.log(event);
		},
		handlName(e) {
			const rate = 1000;
			if (Date.now() - this.lastClick >= rate) {
				this.add(e);
				this.lastClick = Date.now() + 1;
			} else {
				console.log("慢点");
			}
		},
		showToast() {
			this.$snotify.success("Example body content", {
				timeout: 2000,
				showProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
			});
		},
	},
};
</script>

<style>
body{
	margin: 0;
}
#app{
	height: 100vh;
	width: 100vw;
}
</style>
