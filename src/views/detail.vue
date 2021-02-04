<template>
	<div style="width: 100%;background-color: #040412;">
		<div class="head" style="margin-left:5%;width: 95%;">
			<img src="../assets/arrow.png" @click="back">
			测速结果
		</div>
		<div style="width: 100%;height: 1px;background: rgba(255,255,255,0.1);"></div>
		<div style="width: 95%;margin:0 auto">
			<div style="display: flex;justify-content: space-between;font-size: 0.389rem;margin-top: 5px;opacity: 0.8;">
				<div>{{data.date}} {{data.time}}</div>
				<div class="item" style="display: flex;align-items: center;"><img src="../assets/location.png" style="width: 15px;display: block;margin-right: 2px;">
					{{data.address}}</div>
				</dv>
			</div>
			<div style="font-size: 15px;opacity: 0.8;text-align: center;margin:25px 0px;">本次测速结果超越全国移动设备<span style="margin-left: 5px;color:#09c269;font-size: 21px;">{{data.pet}}%</span></div>
			<div class="block">
				<div style="display: flex;width: 90%;font-size: 10px;color:rgba(255,255,255,0.3);margin:0px auto 10px auto;">
					<div style="display: flex;justify-content:center;align-items: center;flex: 1;">
						<img src="../assets/down2.png" style="display: block;width: 12px;">下载
					</div>
					<div style="display: flex;justify-content:center;align-items: center;flex: 1;">
						<img src="../assets/up2.png" style="display: block;width: 12px;"> 上传
					</div>
				</div>
				<div class="item" style="width: 90%;display: flex;">
					<div style="display: flex;flex:1;justify-content:center;align-items: baseline;">
						<div style="color:#09c269;font-size: 24px;font-weight: bold;">{{data.down}}</div>
						<div style="font-size: 10px;opacity: .3;">Mbps</div>
					</div>
					<div style="display: flex;align-items: baseline;flex:1;justify-content:center">
						<div style="color:#09c269;font-size: 24px;font-weight: bold;">{{data.up}}</div>
						<div style="font-size: 10px;opacity: .3;">Mbps</div>
					</div>

					<div class="line" style="left: 50%;"></div>
				</div>
				<div class="item" style="width:90%;margin-top:0.556rem;font-size: 12px;display: flex;justify-content: space-between;">
					<div style="display: flex;align-items: center;flex:1;justify-content:center">
						<div style="opacity: .3;">PING</div>
						<div style="margin:0px 4px">{{data.ping}}</div>
						<div style="opacity: .3;">ms</div>
					</div>
					<div style="display: flex;align-items: center;flex:1;justify-content:center">
						<div style="opacity: .3;">抖动</div>
						<div style="margin:0px 4px">{{data.ping}}</div>
						<div style="opacity: .3;">ms</div>
					</div>
					<div style="display: flex;align-items: center;flex:1;justify-content:center">
						<div style="opacity: .3;">丢包</div>
						<div style="margin:0px 4px">{{data.lost}}</div>
						<div style="opacity: .3;">%</div>
					</div>
					<div class="line"></div>
					<div class="line" style="left: 70%;"></div>
				</div>
			</div>
			<div style="text-align: center;">
				<div style="font-size: 10px;opacity: 0.5;">再测一次，结果会更准确哦~</div>
				<div class="button" @click="again()">再测一次</div>
			</div>
			<div style="font-size: 13px;color:rgba(255,255,255,.5);text-align: center;">您的网速相当于<span style="font-size: 16px;color:#fff;">{{level}}</span>宽带</div>
			<a :href="ad.url" style="display: block;color:#00dbff;font-size: 0.416rem;opacity: .5;text-align: center;margin:0.4rem auto;">{{ad.desc}}</a>
			<div class="list" style="width: 92%;margin:0 auto;">
				<router-link to="/speed?type=0"  class="item">
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
				</router-link>
				<router-link to="/speed?type=1" class="item">
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
				</router-link>
				<router-link to="/speed?type=2" class="item">
					<div style="display: flex;align-items: center;width:2.5rem">
						<img src="../assets/cesu_icon2.png" class="icon">
						<div>高清视频</div>
					</div>
					<div class="loading">
						<div class="inLoading" :style="{width:downLoading+'%'}"></div>
					</div>
					<div style="display: flex;align-items: center;">
						<div>{{video}}</div>
						<img src="../assets/arrow.png" class="arrow">
					</div>
				</router-link>
				<router-link to="/speed?type=3" class="item">
					<div style="display: flex;align-items: center;width:2.5rem">
						<img src="../assets/cesu_icon3.png" class="icon">
						<div>抢红包</div>
					</div>
					<div class="loading">
						<div class="inLoading" :style="{width:upLoading+'%'}"></div>
					</div>
					<div style="display: flex;align-items: center;">
						<div>{{hongbao}}</div>
						<img src="../assets/arrow.png" class="arrow">
					</div>
				</router-link>
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
				ad: ""
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

		},
		methods: {
			back() {
				this.$router.back()
			},
			again(){
				this.$router.push({
					path: '/'
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.head {
		font-size: 0.472rem;
		align-items: center;
		line-height: 1.2rem;
		position: relative;
		text-align: center;

		img {
			position: absolute;
			width: 0.25rem;
			display: block;
			margin: auto;
			margin-right: 0.25rem;
			top: 0;
			bottom: 0;
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
			font-size: 14px;
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
					background: #09c269;
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

	a {
		text-decoration: none;
		color:#FFF;
	}

	a:active {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

	}
	.button{ 
  background:linear-gradient( to right, rgb(98,223,148), rgb(81,232,211) );
  margin:10px auto;
  width: 290px;
  line-height: 40px; 
  color:#000;
  font-size: 16px;
  border-radius: 20px;
}

</style>
