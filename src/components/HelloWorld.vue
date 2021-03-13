<template>
	<div class="container">
		<div class="formData">
			<div class="row">
				<p>euid:</p>
				<el-input
					v-model="pageParams.euid"
					placeholder="Please Enter"
				></el-input>
			</div>
			<div class="row">
				<p>Campaign Id:</p>
				<el-input
					v-model="pageParams.campaignId"
					placeholder="Please Enter"
				></el-input>
			</div>
			<div class="row">
				<p>Offer Id:</p>
				<el-input
					v-model="pageParams.offerId"
					placeholder="Please Enter"
				></el-input>
			</div>
			<div class="row">
				<p>Source:</p>
				<el-input
					v-model="pageParams.source"
					placeholder="Please Enter"
				></el-input>
			</div>
			<div class="column">
				<p>全卡号:</p>
				<el-input
					v-model="pageParams.cardNumber"
					placeholder="多张卡用英文逗号分隔"
				></el-input>
			</div>
			<div class="column">
				<p>卡后四位:</p>
				<el-input
					v-model="pageParams.panLastFour"
					placeholder="多张卡用英文逗号分隔"
				></el-input>
			</div>
			<div class="column">
				<p>卡产品:</p>
				<el-input
					v-model="pageParams.cardProduct"
					placeholder="多张卡用英文逗号分隔"
				></el-input>
			</div>
			<div class="column">
				<p>企业标识:</p>
				<el-input
					v-model="pageParams.sign"
					placeholder="多张卡用英文逗号分隔"
				></el-input>
			</div>
			<div class="column">
				<p>推荐人euid:</p>
				<el-input
					v-model="pageParams.Teuid"
					placeholder="Please Enter"
				></el-input>
			</div>
			<div>
				<p>公钥:</p>
				<el-input
					v-model="pageParams.publicKey"
					placeholder="Please Enter"
				></el-input>
			</div>
			<div>
				<p>调用接口:</p>
				<el-select v-model="pageParams.value" placeholder="请选择">
					<el-option
						v-for="item in dataList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</div>
			<div>
				<p>选择环境</p>
				<el-select v-model="pageParams.env" placeholder="请选择">
					<el-option
						v-for="item in envList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					>
					</el-option>
				</el-select>
			</div>
			<div></div>
		</div>
		<div class="buttonWrapper">
			<el-button @click="reset" v-loading.fullscreen.lock="loading"
				>清空</el-button
			>
			<el-button type="primary" @click="submitData">访问Vere</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "HelloWorld",
	components: {},
	data() {
		return {
			pageParams: {
				euid: "",
				campaignId: "",
				offerId: "",
				source: "",
				cardNumber: "",
				panLastFour: "",
				cardProduct: "",
				sign: "",
				Teuid: "",
				publicKey: "",
				value: "",
				env: 0,
			},
			dataList: [
				{ value: 1, label: "光大" },
				{ value: 2, label: "Visa官微二期绑卡页" },
				{ value: 3, label: "Visa官微二期报名页" },
				{ value: 4, label: "Visa官微刷卡金查询页" },
				{ value: 5, label: "建行" },
				{ value: 6, label: "浙商" },
				{ value: 7, label: "普通跳转" },
			],
			envList: [
				{ value: 0, label: "测试环境" },
				{ value: 1, label: "生产环境" },
			],
			loading: false,
		};
	},
	computed: {},
	watch: {},
	mounted() {},
	created() {},
	methods: {
		reset() {
			Object.keys(this.pageParams).map((item) => {
				this.$set(this.pageParams, item, "");
			});
			this.$notify({
				title: "提示",
				message: "已清空所有输入项",
				offset: 300,
				type: "success",
				duration: 2000,
			});
		},
		submitData() {
			if (!this.validateData()) {
				this.$notify({
					title: "提示",
					message: "输入项有误，请检查后提交",
					offset: 300,
					type: "error",
					duration: 2000,
				});
			}else{
				alert("666")
			}
		},
		validateData() {
			if (this.pageParams.env === "") {
				return false;
			}
			if (this.pageParams.offerId === "" && this.pageParams.campaignId === "") {
				return false;
			}
			return true;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
	.formData {
		padding-bottom: 80px;
	}
	.buttonWrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #ffffff;
		padding: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-top: 1px solid #f0f0f0;
	}
}
</style>
