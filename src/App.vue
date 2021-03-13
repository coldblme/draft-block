<template>
	<div id="app">
		<!-- <div>{{ name }}</div> -->
		<!-- <div @click="showToast">{{ nickname }}</div>
		<vue-snotify></vue-snotify> -->
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
		// console.log(_.chunk(this.arr, 3));
		// console.log(Math.floor);
	},
	computed: {
		...mapState(["name"]),
		...mapGetters(["nickname"]),
	},
	methods: {
		...mapMutations({
			add: "handleName",
		}),
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

<style></style>
