<template>
	<div>
		<topNav></topNav>
		<div class="title">
			<img src="../assets/arrow.png" @click="back">
			PING测试
		</div>
		<div class="nav">
			<div class="item" v-for="(item,index) in nav" :key="index" :class="a==index?'selected':''" @click="a=index">{{item}}</div>
		</div>
		<div v-show="a==0">
			<img src="../assets/tool_icon1.png" class="icon">
			<div style="font-size: .5rem;	text-align: center;" v-if="!result1.ping">例：www.baidu.com</div>
			<div style="font-size: .306rem;	text-align: center;margin:0.416rem 0" v-if="!result1.ping">请输入您想测速的网址</div>
			<div v-if="result1.ping" style="line-height: 1.222rem;font-size: .5rem;text-align: center;margin:0.416rem 0px">
			<div>{{result1.ping}}</div>
				<span v-if="result1.type==0" style="background: #b3b3b3;">测速中</span>
				<span v-else-if="result1.type==1" style="background: #31bf00;">极好</span>
				<span v-else-if="result1.type==2" style="background: #5ec3ed;">良好</span>
				<span v-else-if="result1.type==3" style="background: #d7a75d;">一般</span>
				<span v-else-if="result1.type==4" style="background: #ff0000;">极差</span>
				<span v-else-if="result1.type==5" style="background: #3a3f52;">失败</span>
			</div>
		
			<input v-model="url" class="input" placeholder="www.baidu.com">
			<div class="button" @click="test()" :class="url?'active':''">PING</div>
		</div>
		<div v-show="a==1">
			<img src="../assets/tool_icon1.png" class="icon">
			<div style="font-size: .5rem;	text-align: center;" v-if="!result2.ping">例：192.168.1.1</div>
			<div style="font-size: .306rem;	text-align: center;margin:0.416rem 0" v-if="!result2.ping">请输入您想测速的IP</div>
			<div v-if="result2.ping" style="line-height: 1.222rem;font-size: .5rem;text-align: center;margin:0.416rem 0px">
			<div>{{result2.ping}}</div>
				<span v-if="result2.type==0" style="background: #b3b3b3;">测速中</span>
				<span v-else-if="result2.type==1" style="background: #31bf00;">极好</span>
				<span v-else-if="result2.type==2" style="background: #5ec3ed;">良好</span>
				<span v-else-if="result2.type==3" style="background: #d7a75d;">一般</span>
				<span v-else-if="result2.type==4" style="background: #ff0000;">极差</span>
				<span v-else-if="result2.type==5" style="background: #3a3f52;">失败</span>
			</div>
					
			<div class="ipList">
				<input class="ip" v-model="list[0]" placeholder="0" />
				<input class="ip" v-model="list[1]" placeholder="0" />
				<input class="ip" v-model="list[2]" placeholder="0" />
				<input class="ip" v-model="list[3]" placeholder="0" />
			</div>
			<div class="button" @click="test()" :class="list[0]&&list[1]&&list[2]&&list[3]?'active':''">PING</div>
		</div>

	</div>
</template>

<script>
	import topNav from "../components/topNav.vue"
	export default {
		name: "pingTest",
		components: {
			topNav: topNav
		},
		data() {
			return {
				nav: ["网址", "IP"],
				a: 0,
				url: "",
				list: [],
				result1: {
					ping:"",
					type:""
				},
				result2: {
					ping:"",
					type:""
				}
			}
		},
		methods: {
			back() {
				this.$router.back()
			},
			test() {
				if (this.a == 0) {
					this.ping(this.url).then(res => { 
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
						if (type == 5) {
							this.result1.ping = "无法连接" 
						} else {
							 this.result1.ping = res+"ms"
						} 
						this.result1.type = type 
					})
				} else if (this.a == 1) {
					let ip = this.list.join('.')
					this.ping(ip).then(res => {
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
						if (type == 5) {
							this.result2.ping = "无法连接" 
						} else {
							 this.result2.ping = res+"ms"
						} 
						this.result2.type = type 
					})
				}

			},
			ping(url) {
				return new Promise((resolve, reject) => {
					let that = this
					let res = 1
					let img = new Image();
					let start = new Date().getTime();
					img.src = "http://stwifi.51woshow.com/speed5g/" + url + "?random-no-cache=" + start;
					let flag = false; //无法访问
					img.onerror = function() {
						let end = new Date().getTime();
						res = end - start
						flag = true;
						if (res < 500) {
							resolve(res)
						}
					};
					setTimeout(function() {
						resolve(1000)
						return false;
					}, 4000);
				})
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
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

	.nav {
		width: 6.944rem;
		display: flex;
		padding-top: 2.22rem;
		margin: 0rem auto;

		.item {
			width: 50%;
			font-size: 0.417rem;
			text-align: center;
			line-height: 1.2rem;
			border-bottom: 1px solid #FFF;
			opacity: .3;
		}

		.selected {
			opacity: 1;
		}
	}

	.icon {
		margin: 1rem auto .5rem auto;
		display: block;
		width: 1.167rem;
	}

	.input {
		width: 7.912rem;
		line-height: 1.278rem;
		text-align: center;
		background: rgba(255, 255, 255, .2);
		border: none;
		color: rgba(255, 255, 255, .5);
		font-size: 0.416rem;
		margin: 0 auto;
		display: block;
		border-radius: 5px;
	}

	.button {
		width: 7.912rem;
		line-height: 1.278rem;
		text-align: center;
		background: rgba(255, 255, 255, .1);
		border: none;
		color: rgba(255, 255, 255, .3);
		font-size: 0.416rem;
		margin: .861rem auto;
		display: block;
		border-radius: 5px;

	}

	.active {
		background: linear-gradient(-90deg, rgb(61, 227, 239) 0%, rgb(115, 233, 226) 100%);
		color: #fff;
	}

	.ipList {
		width: 8rem;
		display: flex;
		justify-content: space-between;
		margin: 0rem auto 0.633rem auto;

		.ip {
			width: 1.278rem;
			height: 1.278rem;
			line-height: 1.278rem;
			border-radius: 5px;
			background: #363641;
			font-size: 0.5rem;
			color: #FFF;
			border: none;
			text-align: center;
			display: block;
		}
	}
	span {
		text-align: center;
		display: block; 
		width:2rem;
		line-height: 0.7rem;
		height: 0.7rem;
		border-radius: 20px;
		background: #FFF;
		color: #fff;  
		margin:0 auto;
	}
</style>
