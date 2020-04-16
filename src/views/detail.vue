<template>
	<div style="width: 92%;margin:0 auto;">
		<div class="head">
			<img src="../assets/arrow.png" @click="back">
			网络测速
		</div>
		<div style="display: flex;justify-content: space-between;font-size: 0.389rem;">
			<div>{{data.date}} {{data.time}}</div>
			<div>使用流量&nbsp;:&nbsp;{{data.downSum}}M</div>
		</div>
		<div class="location">
			<div class="item" style="display: flex;align-items: center;">
				<img src="../assets/location2.png">
				<div style="margin-left: 5px;">
					<div style="font-size: 0.306rem;margin-left: 0.2rem;"><span style="margin-right: 10px;">经度：{{data.jd}}</span>纬度：{{data.wd}}</div>
					<div style="font-size: 0.306rem;margin-left: 0.2rem;">IP&nbsp;:&nbsp;{{data.ip}}</div>
				</div>

			</div>
			<div class="item">
				<img src="@/assets/jiedian.png">
				<div style="font-size: 0.306rem;margin-left: 0.2rem;">云测节点</div>
			</div>
		</div>
		<div class="block">
			<div class="item">
				<div>
					<div style="color:#69e3c2;font-size: 0.677rem;font-weight: bold;">{{data.down}}</div>
					<div style="font-size: 0.278rem;opacity: .3;">下载/Mbps</div>
				</div>
				<div>
					<div style="color:#00dbff;font-size: 0.677rem;font-weight: bold;">{{data.up}}</div>
					<div style="font-size: 0.278rem;opacity: .3;">上传/Mbps</div>
				</div>
			</div>
			<div class="item" style="width:80%;margin-top:0.556rem">
				<div>
					<div style="font-size: 0.677rem;font-weight: bold;">{{data.ping}}</div>
					<div style="font-size: 0.278rem;opacity: .3;">PING/ms</div>
				</div>
				<div>
					<div style="font-size: 0.677rem;font-weight: bold;">{{data.doudong}}</div>
					<div style="font-size: 0.278rem;opacity: .3;">抖动/ms</div>
				</div>
				<div>
					<div style="font-size: 0.677rem;font-weight: bold;">{{data.lost}}</div>
					<div style="font-size: 0.278rem;opacity: .3;">丢包/%</div>
				</div>
				<div class="line"></div>
				<div class="line" style="left: 70%;"></div>
			</div>
		</div>
		<div style="font-size: 0.416rem;opacity: .5;text-align: center;">您的网速相当于{{level}}宽带</div>
		<a :href="ad.url" style="display: block;color:#00dbff;font-size: 0.416rem;opacity: .5;text-align: center;margin:0.4rem auto;">{{ad.desc}}</a>
		<div class="list">
			<div class="item">
				<div style="display: flex;align-items: center;width:2.5rem">
					<img src="../assets/cesu_icon0.png" class="icon">
					<div>大型游戏</div>
				</div>
				<div class="loading">
					<div class="inLoading" :style="{width:downLoading+'%'}"></div>
				</div>
				<div style="display: flex;align-items: center;">
					<div>{{game}}</div>
					<img src="../assets/arrow.png" class="arrow">
				</div>
			</div>
			<div class="item">
				<div style="display: flex;align-items: center;width:2.5rem">
					<img src="../assets/cesu_icon1.png" class="icon">
					<div>在线直播</div>
				</div>
				<div class="loading">
					<div class="inLoading" :style="{width:upLoading+'%'}"></div>
				</div>
				<div style="display: flex;align-items: center;">
					<div>{{zhibo}}</div>
					<img src="../assets/arrow.png" class="arrow">
				</div>
			</div>
			<div class="item">
				<div style="display: flex;align-items: center;width:2.5rem">
					<img src="../assets/cesu_icon6.png" class="icon">
					<div>高清视频</div>
				</div>
				<div class="loading">
					<div class="inLoading" :style="{width:downLoading+'%'}"></div>
				</div>
				<div style="display: flex;align-items: center;">
					<div>{{video}}</div>
					<img src="../assets/arrow.png" class="arrow">
				</div>
			</div>
			<div class="item">
				<div style="display: flex;align-items: center;width:2.5rem">
					<img src="../assets/cesu_icon7.png" class="icon">
					<div>抢红包</div>
				</div> 
				<div class="loading">
						<div class="inLoading" :style="{width:upLoading+'%'}"></div>
				</div> 
				<div style="display: flex;align-items: center;">
					<div>{{hongbao}}</div>
					<img src="../assets/arrow.png" class="arrow">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'detail',
		data() {
			return {
				data: {},
				level: "",
				hongbao: "",
				zhibo: "",
				game: "",
				video: "",
				downLoading: "",
				upLoading: "",
				ad:""
			}
		},
		created() {
			let index = this.$route.query.index
			this.data = JSON.parse(localStorage.data5g)[index]
			if (this.data.down <= 20) {
				this.downLoading = (this.data.down * 5).toFixed(0)
			} else {
				this.downLoading = 100
			}
			if (this.data.up <= 20) {
				this.upLoading = (this.data.up * 5).toFixed(0)
			} else {
				this.upLoading = 100
			}
			if (this.data.up < 4) {
				this.zhibo = "极慢"
				this.hongbao = "极慢"
			} else if (this.data.up >= 4 && this.data.up < 10) {
				this.zhibo = "较慢"
				this.hongbao = "较慢"
			} else if (this.data.up >= 10 && this.data.up < 20) {
				this.zhibo = "一般"
				this.hongbao = "一般"
			} else if (this.data.up >= 20) {
				this.zhibo = "极快"
				this.hongbao = "极快"
			}
			if (this.data.down < 5) {
				this.level = "0~5M"
				this.game = "较慢"
				this.video = "标清"
			} else if (this.data.down >= 5 && this.data.down < 10) {
				this.level = "5M~10M"
				this.game = "一般"
				this.video = "高清"
			} else if (this.data.down >= 10 && this.data.down < 20) {
				this.level = "10M~20M"
				this.game = "良好"
				this.video = "超清"
			} else if (this.data.down >= 20 && this.data.down < 50) {
				this.level = "20M~50M"
				this.game = "流畅"
				this.video = "蓝光"
			} else if (this.data.down >= 50 && this.data.down < 70) {
				this.level = "50M~70M"
				this.game = "流畅"
				this.video = "蓝光"
			} else if (this.data.down >= 70 && this.data.down < 100) {
				this.level = "70M~100M"
				this.game = "流畅"
				this.video = "蓝光"
			} else if (this.data.down >= 100) {
				this.level = "100M+"
				this.game = "流畅"
				this.video = "蓝光"
			}
			this.$axios.get("../../doc/getAdv.htm?appId=17&posId=121").then(res=>{
						
							 let data=res.data.data 
							 this.ad=data[Math.floor((Math.random()*data.length))] 
			})

		},
		methods: {
			back() {
				this.$router.back()
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.head {
		font-size: 0.472rem;
		display: flex;
		align-items: center;
		line-height: 1.2rem;

		img {
			width: 0.25rem;
			display: block;
			margin-right: 0.25rem;
		}
	}

	.location {
		display: flex;
		justify-content: space-between;
		font-size: 0.306rem;
		margin: 0.556rem auto;

		.item {
			display: flex;
			align-items: center;

			img {
				display: block;
				width: 0.694rem;
				height: 0.694rem;
			}

			.text {
				font-size: 0.36rem;
				color: #FFF;
				margin-left: 0.2rem;
			}
		}
	}

	.block {
		width: 100%;
		background: #161623;
		border-radius: 5px;
		padding: 0.833rem 0px;
		margin-bottom: 0.667rem;

		.item {
			display: flex;
			width: 50%;
			margin: 0 auto;
			justify-content: space-between;
			text-align: center;
			position: relative;

			.line {
				background: rgba(255, 255, 255, .1);
				width: 1px;
				height: 0.9rem;
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto;
				left: 30%;
				z-index: 999;
			}
		}
	}

	.list {
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 0.417rem;
			line-height: 1.44rem;
			border-top: 1px solid rgba(255, 255, 255, .1);

			.icon {
				width: 0.556rem;
				display: block;
				margin-right: 10px;
			}

			.loading {
				width: 3.61rem;
				height: 0.138rem;
				background: rgba(255, 255, 255, .1);
				border-radius: 20px;
				position: relative;
				overflow: hidden;

				.inLoading {
					position: absolute;
					width: 0px;
					height: 100%;
					border-radius: 20px;
					background: rgb(0, 219, 255);
				}
			}

			.arrow {
				width: 0.222rem;
				display: block;
				transform: rotate(180deg);
				margin-left: 10px;
			}
		}
	}

	.list .item:last-child {
		border-bottom: 1px solid rgba(255, 255, 255, .1);
	}
	 a{
	 	text-decoration: none; 
	 }
	 a:active{ 
	      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	 
	 }
</style>
