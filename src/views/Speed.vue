<template>
	<div class="speed">
		<div class="title">
			<img src="../assets/arrow.png" @click="back">
			{{title}}
		</div>
		<div class="loading" v-show="loading==true">
			<div class="point"></div>
			<div class="cir">
				<img :src="require('@/assets/speed/loading'+type+'.png')">
			</div>
			<svg class="svg1">
				<circle  r="2rem" cx="50%" cy="50%" stroke="rgba(255,255,255,.3)" stroke-width="2px" :stroke-dasharray="dashoffset+'px'"
				  ></circle>
			</svg>
			<svg class="svg2">
				<circle :class="ready?'cir_out':''" r="2rem" cx="50%" cy="50%" stroke="#09c26a" stroke-width="2px" :stroke-dasharray="dashoffset+'px'"
				 :stroke-dashoffset="dashoffset+'px'" fill="none"></circle>
			</svg>
		</div>
		<div style="text-align: center;font-size:0.416rem ;" v-show="loading==true">测试中{{num}}%</div>
		<div class="block" v-show="loading==false">
			<div class="top">
				<div>平台名称</div>
				<div>延迟毫秒</div>
			</div>
			<div v-for="(item,index) in list" :key="index" class="item">
				<img :src="require('@/assets/speed/'+cate+index+'.png')" class="icon">
				<div>{{item.name}}</div>
				<span v-if="item.type==0" style="background: #b3b3b3;">测速中</span>
				<span v-else-if="item.type==1" style="background: #31bf00;">极好</span>
				<span v-else-if="item.type==2" style="background: #5ec3ed;">良好</span>
				<span v-else-if="item.type==3" style="background: #d7a75d;">一般</span>
				<span v-else-if="item.type==4" style="background: #ff0000;">极差</span>
				<span v-else-if="item.type==5" style="background: #3a3f52;">失败</span>
				<div>{{item.ping}}</div>
				<img src="../assets/refresh.png" class="refresh" @click="refresh(index)">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'speed',
		data() {
			return {
				loading: true,
				title: "",
				type: "",
				list: "",
				cate: "",
				dashoffset: document.body.clientWidth*1.256,
				ready: false,
				num: 0,
				i: "", 
			}
		},
		created() {
			this.type = this.$route.query.type
			this.ready = true;
			this.i = setInterval(this.frame, 100);
			this.$axios.get("speed.json").then(res => {
				this.title = res.data[this.type].title;
				this.cate = res.data[this.type].cate;
				this.list = res.data[this.type].list;
				let that = this;
				(async function loop() {
					for (let i = 0; i < that.list.length; i++) {
						await that.ping(that.list[i].url);
						await that.ping(that.list[i].url).then(res => {
							if (res >= 0) {
								let type = ""
								switch (true) {
									case res > 0 && res < 50:
										type = 1;
										break;
									case res >= 50 && res < 100:
										type = 2;
										break;
									case res >= 100 && res < 200:
										type = 3;
										break;
									case res >= 200 && res < 500:
										type = 4;
										break;
									case res >= 500:
										type = 5;
										break;
								}
								that.list[i].type = type
								if (type == 5) {
									that.list[i].ping = "无法连接" 
								} else {
									 that.list[i].ping = res
								}
							}
						})
					}
				})();

			})

		},
		methods: {
			back() {
				this.$router.back()
			},
			frame() {
				if (this.num == 100) {
					clearInterval(this.i)
					this.loading = false;
				} else {
					this.num++
				}
			},
			ping(url) {
				return new Promise((resolve, reject) => {
					let that = this
					let res = 1
					let img = new Image();
					let start = new Date().getTime();
					img.src = url + "?random-no-cache=" + start;
					let flag = false; //无法访问
					img.onerror = function() {
						let end = new Date().getTime();
						res = end - start
						flag = true;
						if(res<500){ 
							resolve(res)
						} 
					};
					setTimeout(function() {
						resolve(1000)
						return false;
					}, 4000);
				})
			},
			refresh(i) {
				this.ping(this.list[i].url).then(res => {
					if (res >= 0) {
						
						let type = ""
						switch (true) {
							case res > 0 && res < 50:
								type = 1;
								break;
							case res >= 50 && res < 100:
								type = 2;
								break;
							case res >= 100 && res < 200:
								type = 3;
								break;
							case res >= 200 && res < 500:
								type = 4;
								break;
							case res >= 500:
								type = 5;
								break;
						}
						this.list[i].type = type 
						if (type == 5) {
							this.list[i].ping = "无法连接" 
						} else {
							 this.list[i].ping = res
						} 
					}
				})

			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.loading {
		width: 4.2rem;
		margin: 3rem auto 1rem auto;
		height: 4.2rem;
		position: relative;
		// border: 1px solid rgba(255, 255, 255, .3);
		border-radius: 50%; 
		.svg1{
			width: 100%;
			height:100%;
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: 0;
			top: 0;
			transform: rotate(-90deg);
			z-index: 8;
		}
		.svg2{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: 0;
			top: 0;
			transform: rotate(-90deg);
			z-index: 9;
			.cir_out {
				animation: first 10s linear forwards;
			}

			@keyframes first {
				0% {
					stroke-dashoffset: 12.56rem;
				}

				100% {
					stroke-dashoffset: 0rem;
				}
			}
		}

		.point {
			width: 0.11rem;
			height: 0.11rem;
			background: #09c26a;
			border-radius: 50%;
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			top: 0.02rem;
			z-index: 10;
		}

		.cir {
			width: 3.5rem;
			height: 3.5rem;
			border-radius: 50%;
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			top: 0;
			bottom: 0;
			background: linear-gradient(to right, #54e7c9, #62df94);
			z-index: 10;
			img {
				width: 50%;
				display: block;
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				top: 0;
				bottom: 0;
				z-index: 10;
			}
		}
	}

	.speed {
		background: #040412;
	}

	.title {
		height: 1.67rem;
		line-height: 1.67rem;
		text-align: center;
		position: relative;
		font-size: 0.444rem;

		img {
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			width: 0.222rem;
			left: 0.556rem;
		}
	}

	.block {
		background: rgba(255, 255, 255, .05);
		line-height: 1.319rem;
		font-size: 0.416rem;

		.top {
			display: flex;

			div {
				width: 50%;
				text-align: center;
			}
		}

		.item {
			display: flex;
			position: relative;
			font-size: 0.316rem;

			div {
				width: 50%;
				text-align: center;
			}

			span,
			img {
				position: absolute;
			}

			span {
				text-align: center;
				display: block;
				width: 1.389rem;
				line-height: 0.5rem;
				height: 0.5rem;
				border-radius: 20px;
				background: #FFF;
				color: #fff;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
			}

			.icon {
				width: 1rem;
				display: block;
				top: 0;
				bottom: 0;
				margin: auto;
				left: 0.5rem;
			}

			.refresh {
				width: 0.3rem;
				display: block;
				top: 0;
				bottom: 0;
				margin: auto;
				right: 0.5rem;
			}
		}
	}
</style>
