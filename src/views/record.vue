<template>
	<div style="min-height: 100vh;">
		<topNav></topNav>
		<bottomNav></bottomNav>
		<div class="title">历史<img src="../assets/del.png" class="del" @click="del()"></div>
		<div style="width: 95%;margin:10px auto;border-radius:5px; "> 
			<div class="list">
				<div class="item" v-for="(item,index) in data" :key="index" @click="detail(index)">
					<div style="line-height: 35px;width: 95%;padding:0% 2.5%;border-bottom: 1px solid rgba(255,255,255,0.1);">
						<div style="float: left;font-size: 13px;display: flex;align-items: center;"><img src="../assets/wifi.png" style="width: 14px;margin-right: 5px;"
							 v-if="item.type=='WIFI'"><img style="width: 14px;margin-right: 5px;" src="../assets/yd.png" v-else>{{item.type}}</div>
						<div style="opacity: 0.3;font-size: 10px;float:right">{{item.date}} {{item.time}}</div>
						<div style="clear: both;"></div>
					</div>
					<div style="position: relative;">
						<div class="head">
							<div><img src="../assets/download.png">下载</div>
							<div><img src="../assets/update.png">上传</div>
							<div><img src="../assets/ping.png">延迟</div>
						</div>
						<div class="record">
							<div class="text">{{item.down}}<span style="font-size: 11px;opacity: 0.3;margin-left:5px">Mbps</span></div>
							<div class="text">{{item.up}}<span style="font-size: 11px;opacity: 0.3;margin-left:5px">Mbps</span></div>
							<div class="text">{{item.ping}}<span style="font-size: 11px;opacity: 0.3;margin-left:5px">ms</span></div>
						</div>
						<img src="../assets/arrow.png" class="arrow">
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bottomNav from "../components/bottomNav.vue"
	import topNav from "../components/topNav.vue"
	export default {
		name: 'record',
		components: {
			bottomNav,
			topNav
		},
		data() {
			return {
				data: []
			}
		},
		created() {
			if (localStorage.data5g) {
				this.data = JSON.parse(localStorage.data5g)
			}
		},
		methods: {
			detail(index) {
				this.$router.push({
					path: '/detail',
					query: {
						index: index
					}
				})
			},
			del() {
				localStorage.removeItem("data5g")
				this.data = []
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
 
	.title {
		text-align: center;
		font-size: 0.472rem;
		line-height: 1.528rem;
		position: relative;

		.del {
			position: absolute;
			right: 20px;
			top: 0;
			bottom: 0;
			width: 18px;
			height: 18px;
			margin: auto;
		}
	}

	.head {
		width: 90%;
		padding-right: 10%;
		display: flex;

		div {
			flex: 1;
			font-size: 11px;
			text-align: center;
			line-height: 1.33rem;
			color: rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				display: block;
				width: 13px;
				margin-right: 5px;
			}
		}

	}

	.item {
		width: 100%;
		margin: 10px auto;
		background: #161623;
		border-radius: 4px;

		.record {
			width: 90%;
			display: flex;

			.text {
				flex: 1;
				font-size: 17px;
				text-align: center;
				line-height: 1.25rem;
			}
		}

		img {
			display: block;
			width: 8px;
		}

	}
	.list{
		padding-bottom: 50px;
	}
	.arrow {
		position: absolute;
		right: 20px;
		display: block;
		width: 8px;
		bottom: 0;
		margin: auto;
		top: 0;
		transform: rotate(180deg)
	}
</style>
