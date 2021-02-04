<template>
	<div class="about">
		<bottomNav></bottomNav>
		<topNav></topNav>
		<div class="block">
			<div class="title">工具</div>
			<div class="background">
				<div v-for="(item,index) in list" class="item" :key="index" @click="gotoSpeed(index)">
					<div class="img">
						<img :src="require('@/assets/cesu_icon'+index+'.png')">
					</div>
					<div class="name">{{item.name}}</div>
				</div>
			</div>
		</div>
		<!-- 		<div class="block">
			<div class="title">实用工具</div>
			<div class="background">
				<div v-for="(item,index) in list2" class="item" :key="index" @click="gotoTool(item.url)">
					<div class="img">
						<img :src="require('@/assets/tool_icon'+index+'.png')">
					</div>
					<div  class="name">{{item.name}}</div>
				</div>
			</div>
		</div> -->
		<!-- 	<div class="block">
			<div class="title">必装工具<span>安卓手机必装工具</span></div>
			<div class="background">
				<div v-for="(item,index) in list3" class="item" :key="index" @click="gotoApp(index)">
					<div class="img ">
						<img :src="require('@/assets/wifi_icon'+index+'.png')" class="wifi">
					</div>
					<div class="name">{{item.name}}</div>
				</div>
			</div>
		</div> -->
		<div class="cover" v-show="showApp"></div>
		<div class="app" v-show="showApp">
			<img :src="require('@/assets/app'+appImg+'.png')" class="background" @click="download(apkUrl)">
			<img src="../assets/close.png" class="close" @click="showApp=false">
			<div style="font-size: .5rem;margin:0.5em 0px 0.4rem 0px" @click="download(apkUrl)">体验该功能需下载APP</div>
			<div style="font-size: .416rem;margin-bottom: 1rem;" @click="download(apkUrl)">该APP目前仅支持Android 使用</div>
			<div style="color:#00cbec;font-size: .5rem;border-top: 1px solid #eee;line-height: 1.3rem;" @click="download(apkUrl)">立即下载</div>
		</div>
	</div>
</template>

<script>
	import bottomNav from "../components/bottomNav.vue"
	import topNav from "../components/topNav.vue"
	export default {
		name: 'tool',
		components: {
			bottomNav,
			topNav
		},
		data() {
			return {
				list: [{
						name: "游戏PK"
					}, {
						name: "直播PK"
					},
					{
						name: "视频PK"
					}, {
						name: "抢红包PK"
					}
				],
				list3: [{
					name: "测速大师",
					url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.syezon.lab.networkspeed"
				}, {
					name: "充电加速器",
					url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.hodanet.charge"
				}, {
					name: "电池超人",
					url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.isyezon.kbatterydoctor"
				}, {
					name: "来电闪光灯",
					url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.hd.fly.flashlight"
				}, {
					name: "WIFI信号增强器",
					url: "http://a.app.qq.com/o/simple.jsp?pkgname=com.syezon.wifi"
				}],
				showApp: false,
				appImg: "0",
				apkUrl: ""
			}
		},
		methods: {
			gotoSpeed(index) {

				if (index == 4) {
					this.$router.push({
						path: '/pingTest'
					})
				} else {
					this.$router.push({
						path: '/speed',
						query: {
							type: index
						}
					})
				}
			},
			gotoTool(url) {
				this.$router.push({
					path: url
				})
			},
			gotoApp(index) {
				this.appImg = index
				this.showApp = true
				this.apkUrl = this.list3[index].url
			},
			download(url) {
				window.location.href = url
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.about {
		background: #040412;
		padding-bottom: 1.4rem;
	}

	.block {
		width:100%;
		margin: 0 auto 0.277rem auto;

		.title {
			font-size: 0.472rem;
			text-align: center;
			line-height: 1.528rem;
			background: rgba(0,0,0,0.15);
			span {
				font-size: 0.333rem;
				opacity: 0.5;
				margin-left: 0.333rem;
			}
		}

		.background {
			margin: 0.3rem 0px;
			border-radius: 10px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around; 
			.item {
				width: 140px;
				font-size: 14px;
				text-align: center;
				margin: 0.5rem 0px;
				background: rgba(239,247,255,.05);
				border-radius:10px;
				padding:20px 0px;
				.name {
					margin-top: 10px;
				}

				.img {
					height:40px;
					width: 100%;
					position: relative; 
					img {
						display: block;
						margin: auto;
						position: absolute;
						left: 0;
						right: 0;
						top: 0;
						bottom: 0;
						width: 40px;
					}

					.wifi {
						width: 1rem;
					}

				}
			}
		}
	}

	.cover {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .7);
		top: 0;
		right: 0;
	}

	.app {
		width: 7.222rem;
		height: 8.333rem;
		position: fixed;
		color: #040412;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		border-radius: 5px;
		background: #FFF;
		text-align: center;
		overflow: hidden;

		.close {
			width: 0.416rem;
			display: block;
			position: absolute;
			right: 0.2rem;
			top: 0.2rem;
		}

		.background {
			width: 101%;
			display: block;
		}
	}
</style>
