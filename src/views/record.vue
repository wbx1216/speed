<template>
	<div>
		<topNav></topNav>
		<bottomNav></bottomNav>
		<div class="title">测速记录</div>
		<div class="head">
			<div>日期</div>
			<div>网络</div>
			<div>下载</div>
			<div>上传</div>
		</div>
		<div class="list">
			<div class="item" v-for="(item,index) in data" :key="index"  @click="detail(index)">
				<div class="record">
					<div class="text" style="line-height: 0.625rem;opacity: .5;">
						<div >{{item.date}}</div>
						<div>{{item.time}}</div>
					</div>
					<div class="text" style="opacity: .5;">{{item.type}}</div>
					<div class="text">{{item.down}}ms</div>
					<div class="text">{{item.up}}ms</div>
				</div>
				<img src="../assets/arrow.png">
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
		methods:{
			detail(index){
				this.$router.push({
				          path: '/detail',
				          query: {
				            index: index
				          }
				   })
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.title {
		text-align: center;
		font-size: 0.472rem;
		line-height: 1.528rem;
		border-bottom: 1px solid rgba(255, 255, 255, .1);
	}

	.head {
		width: 90%;
		display: flex;

		div {
			width: 25%;
			font-size: 0.416rem;
			text-align: center;
			line-height: 1.33rem;
		}
	}

	.item {
		width:100%;
		align-items: center;
        background: #11111e;
		margin:0.167rem auto;
		display: flex;
		.record{
			width:90%;
			display: flex;
			.text {
				width: 25%;
				font-size: 0.416rem;
				text-align: center;
				line-height: 1.25rem;
				font-size: 0.333rem;
			}
		}
		img{
			display: block;
			opacity: .5;
			width: 8px;
			transform: rotate(180deg);
		}
		
	}
	.list{
		background: #040412;
	}
</style>
