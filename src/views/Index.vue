<template>
	<div class="index" :style="{height:windowHeight+'px'}">
		<bottomNav></bottomNav>
		<topNav></topNav>
		<div> 
			<div class="testArea">
				<div style="width: 100%;height:100%;position: absolute;">
					<span class="kedu pos1" :style="{opacity:opacity}">0</span>
					<span class="kedu pos2" :style="{opacity:opacity}">5</span>
					<span class="kedu pos3" :style="{opacity:opacity}">10</span>
					<span class="kedu pos4" :style="{opacity:opacity}">20</span>
					<span class="kedu pos5" :style="{opacity:opacity}">50</span>
					<span class="kedu pos6" :style="{opacity:opacity}">100</span>
					<span class="kedu pos7" :style="{opacity:opacity}">200</span>
					<span class="kedu pos8" :style="{opacity:opacity}">500</span>
					<span class="kedu pos9" :style="{opacity:opacity}">1000</span>
				</div>
				<div style=" transform: rotate(180deg) ; position: relative; transform-origin:center;width: 100%;height: 100%;">
					<div style=" transform: rotate(-45deg);width: 100%;height: 100%;position: relative; transform-origin:center;">
						<svg style="width:100%;height: 100%;">
							<g>
								<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" style="stop-color:#62df94;stop-opacity:1" />
									<stop offset="50%" style="stop-color:#52e7ce;stop-opacity:1" />
									<stop offset="100%" style="stop-color:#51e8d3;stop-opacity:1" />
								</linearGradient>
								<circle r="2.885rem" cx="50%" cy="50%" :stroke-dasharray="old+'px'" stroke="#2d333f" stroke-width="0.48rem"
								 fill="none" class="circle"></circle>
								<circle r="2.885rem" cx="50%" cy="50%" class="new" :stroke-dasharray="2*old+'px'" :stroke-dashoffset="dashoffset+'px'"
								 :class="first?'first':''" stroke="url(#grad1)" stroke-width="0.48rem" fill="none"></circle>
								</circle>
							</g>
						</svg>
					</div>
				</div>
				<div :class="first?'zhizhen_first':''" :style="{transform:'rotate('+deg+'deg)'}" id="zhizhen">
					<img src="../assets/zhizhen.png" class="zhizhen">
				</div>
				<div class="text">
					<div style="font-size: 0.583rem;">{{speed}}</div>
					<div style="font-size: 0.333rem;">Mbps</div>
				</div>
			</div>
			<div class="down chart">
				<div class="table">
					<div class="table2">
						<div id="main" class="main"></div>
						<div id="main2" class="main"></div>
					</div>
				</div>
			</div>
			<!-- 		<div class="up chart">
				<div style="width:3rem">
					<div class="text">上传/Mbps</div>
					<div style="background: #00dbff;width:0.56rem;height:0.069rem;margin-top: 0.416rem;" v-show="up<=0"></div>
					<div style="color:#00dbff;font-size: .6rem;line-height: 1rem;" v-show="up>0">{{up}}</div>
				</div>
				<div class="table">
					<div style="font-size:0.305rem; text-align: right;margin-bottom: 0.2rem;color:rgba(255,255,255,.5)" :style="{visibility:(upSum>0?'visible':'hidden')}">使用流量<span
						 style="color:#00dbff;margin-left: 5px;">{{upSum}}M</span></div>

					<div class="table2">
						<div id="main2" class="main"></div> 
					</div>
				</div>
			</div> -->
			<div class="midMessage">
				<div class="item">
					<img src="../assets/down.png">
					<div>
						<div>下载</div>
						<div class="num">
							<div v-show="down==0" style="margin-right: 2px;">--</div>
							<div v-show="down>0" class="speed">{{down}}</div>
							<div>Mbps</div>
						</div>
					</div>
				</div>
				<div class="item">
					<img src="../assets/up.png">
					<div>
						<div>上传</div>
						<div class="num">
							<div v-show="up==0" style="margin-right: 2px;">--</div>
							<div v-show="up>0" class="speed">{{up}}</div>
							<div>Mbps</div>
						</div>
					</div>
				</div>
			</div>
			<div class="midMessage">
				<div class="item">
					<img src="../assets/p.png">
					<div>
						<div>PING</div>
						<div class="num">
							<div v-show="ping==0" style="margin-right: 2px;">--</div>
							<div v-show="ping>0" class="speed">{{ping}}</div>
							<div>ms</div>
						</div>
					</div>
				</div>
				<div class="item">
					<img src="../assets/doudong.png">
					<div>
						<div>抖动</div>
						<div class="num">
							<div v-show="doudong==0" style="margin-right: 2px;">--</div>
							<div v-show="doudong>0" class="speed">{{doudong}}</div>
							<div>ms</div>
						</div>
					</div>
				</div>
			</div>
			<div class="start" @click="start">
				{{text}}
			</div>

		</div>
		<div style="text-align: center;font-size: 12px;opacity: 0.3;margin-top: 30px;">版本号v2.0.3</div>
		<div style="width: 200px;margin:0 auto;display: flex;justify-content: center;"><router-link to="/privacy" style="color:#fff;font-size: 12px;opacity: 0.3; ">《隐私协议》</router-link><router-link to="/agreement" style="color:#fff;font-size: 12px;opacity: 0.3; ">《用户协议》</router-link></div>
		<div class="bannerAd" v-show="bannerAd&&status==0">
			<a :href="bannerAd.url">
				<img :src="bannerAd.pic" style="width:90%;display: block;margin:10px auto;">
			</a>
		</div>
<!-- 		<iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
		</iframe> -->
	</div>
</template>
<script>
	import bottomNav from "../components/bottomNav.vue"
	import topNav from "../components/topNav.vue"
	let w = null,
		vm = null
	export default {
		name: 'index',
		components: {
			bottomNav,
			topNav
		},
		inject: ["reload"],
		data() {
			return {
				downStatus: false,
				upStatus: false,
				ip: "",
				operator: "",
				first: false,
				speed: "0.00",
				ping: 0,
				doudong: 0,
				lost: 0,
				down: 0,
				up: 0,
				dashoffset: document.body.clientWidth * 2.718,
				deg: 50,
				downSum: "",
				upSum: "",
				old: document.body.clientWidth * 1.359,
				level: "",
				pet: "",
				realIp: "",
				ctx: "",
				ctx2: "",
				downData: [0],
				upData: [0],
				ad: "",
				bannerAd: "",
				opacity: "0.5",
				type: "",
				text: "开始测试"
			}
		},
		created() {
			let that = this
			let windowHeight=document.documentElement.clientHeight
			this.windowHeight=windowHeight-50
			setInterval(function() {
				if (w) w.postMessage('status');
			}, 200);
			this.ajax({
				url: "http://api.ip138.com/query/",
				data: {
					ip: "",
					oid: "28624",
					mid: "90952",
					token: "53237a5c33dc8f71d60a229331bc9760"
				},
				dataType: "jsonp",
				success: function(i) {
					 console.log(i)
					 that.realIp=i.ip
					 that.address=i.data[2]
				} 
			})
	 
		},
		mounted() {
			vm = this
			this.getNetworkType()
		},
		methods: {
			creatDown() {
				let xData = new Array(20).fill("")
				var option = {
					animationDurationUpdate: 30000,
					xAxis: {
						boundaryGap: false,
						show: false,
						data: xData
					},
					yAxis: {
						show: false,
						max: 20,
						min: 0,
						splitNumber: 1,
					},
					series: [{
						type: 'line',
						data: this.downData,
						showSymbol: false,
						hoverAnimation: false,
						smooth: true,
						itemStyle: {
							normal: {
								color: 'rgb(105, 227, 194)', //折点颜色
								lineStyle: {
									color: 'rgb(105, 227, 194)' //折线颜色
								}
							}
						}
					}],
				}
				this.myChart.setOption(option, true)
			},
			creatUp() {
				let xData = new Array(20).fill("")
				let option = {
					animationDurationUpdate: 30000,
					xAxis: {
						boundaryGap: false,
						show: false,
						data: xData
					},
					yAxis: {
						max: 20,
						min: 0,
						splitNumber: 1,
						show: false
					},
					series: [{
						type: 'line',
						data: this.upData,
						showSymbol: false,
						hoverAnimation: false,
						itemStyle: {
							normal: {
								color: 'rgb(0, 219, 255)', //折点颜色
								lineStyle: {
									color: 'rgb(0, 219, 255)' //折线颜色
								}
							}
						}

					}]
				}
				this.myChart2.setOption(option, true)
			},
			drawDown(d) {
				if (!d) return false;
				// let myChart = echarts.init(document.getElementById('main')); 
				if (d >= 14) {
					d = 14
				}
				for (var i = 0; i < 1; i++) {
					this.downData.push(d)
					this.myChart.setOption({
						series: [{
							data: this.downData
						}]
					})
				}

			},
			drawUp(d) {
				if (!d) return false;
				if (d >= 14) {
					d = 14
				}
				this.upData.push(d)
				this.myChart2.setOption({
					series: [{
						data: this.upData
					}],
				})
			},
			getNetworkType() {
				var ua = navigator.userAgent;
				var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
				networkStr = networkStr.toLowerCase().replace('nettype/', '');
				var networkType;
				switch (networkStr) {
					case 'wifi':
						networkType = 'Wi-Fi';
						break;
					case '4g':
						networkType = '移动网络';
						break;
					case '3g':
						networkType = '移动网络';
						break;
					case '3gnet':
						networkType = '移动网络';
						break;
					case '2g':
						networkType = '移动网络';
						break;
					default:
						networkType = '移动网络';
				} 
				this.type = networkType
			},
			start() {
				if(this.text=="测试中"){
					return false
					}
				this.first = true
				this.down = 0
				this.up = 0
				this.downSum = 0
				this.upSum = 0
				this.speed = 0.00
				let time = 0
				let that = this
				setTimeout(function() {
					that.myChart = echarts.init(document.getElementById('main'), 'light')
					that.myChart2 = echarts.init(document.getElementById('main2'), 'light')
					that.downData = [0]
					that.upData = [0]
					that.creatDown()
					that.creatUp()
				}, 10);
				w = new Worker('speedtest_worker.min.js');
				w.postMessage('start'); //Add optional parameters as a JSON object to this command 
				w.onmessage = (e) => {
					let data = JSON.parse(e.data)
					let status = data.testState;
					let zhizhen = document.querySelector('.zhizhen');
					this.text = "测试中"
					if (status == 2) {
						this.ping = data.pingStatus
						this.doudong = data.jitterStatus
						if (time == 0) {
							this.lost = this.randomNum(0, 30)
							time = 1;
						}
					} else if (status == 1 && data.dlStatus != "") {
						this.downStatus = true
						this.drawDown(data.dlStatus)
						this.first = false
						this.down = data.dlStatus
						this.speed = data.dlStatus
						let set = this.offset(data.dlStatus)
						this.deg = (set * 19.8 + 45).toFixed(3)
						this.dashoffset = (27.176 - set) * document.body.clientWidth / 10

					} else if (status == 3 && data.ulStatus == "") {
						this.downStatus = false 
						this.up = data.ulStatus
						this.speed = "0.00"
						this.dashoffset = document.body.clientWidth * 2.718
						this.deg = 50
						if (time == 1) {
							this.downSum = this.randomNum(20, 30)
							time = 2;
						}
					} else if (status == 3 && data.ulStatus > 0) {
						this.upStatus = true
						let ulStatus
						ulStatus = Math.random(1, 5).toFixed(2)
						this.drawUp(ulStatus)
						this.up = ulStatus
						let set = this.offset(ulStatus)
						this.dashoffset = (27.176 - set) * document.body.clientWidth / 10
						this.deg = (set * 19.8 + 45).toFixed(3)
						this.speed = ulStatus
					} else if (status == 4) {
						this.upStatus = false
						w = null;
						this.dashoffset = document.body.clientWidth * 2.718
						this.deg = 50
						this.upSum = this.randomNum(4, 6)
						let down = this.down
						let pet = Number(down).toFixed(0)
						if (this.down < 5) {
							this.level = "0~5M"
							this.pet = 5 + Number(pet)
						} else if (this.down >= 5 && this.down < 10) {
							this.level = "5M~10M"
							this.pet = 11 + Number(pet)
						} else if (this.down >= 10 && this.down < 20) {
							this.level = "10M~20M"
							this.pet = 15 + Number(pet)
						} else if (this.down >= 20 && this.down < 50) {
							this.level = "20M~50M"
							this.pet = 17 + Number(pet)
						} else if (this.down >= 50 && this.down < 70) {
							this.level = "50M~70M"
							this.pet = 19 + Number(pet)
						} else if (this.down >= 70 && this.down < 100) {
							this.level = "70M~100M"
							this.pet = 92
						} else if (this.down >= 100) {
							this.level = "100M+"
							this.pet = 98
						}
						
						let that = this
						setTimeout(function() {
							that.record()
							that.$router.push({
								path: '/detail',
								query: {
									index: 0
								}
							})
						}, 1000)
					}
				}
			},
			offset(i) {
				let len
				if (i > 0 && i < 5) {
					len = this.randomNum(0, 17) / 10
				} else if (i >= 5 && i < 10) {
					len = this.randomNum(17, 34) / 10
				} else if (i >= 10 && i < 20) {
					len = this.randomNum(34, 51) / 10
				} else if (i >= 20 && i < 50) {
					len = this.randomNum(51, 68) / 10
				} else if (i >= 50 && i < 100) {
					len = this.randomNum(68, 85) / 10
				} else if (i >= 100 && i < 200) {
					len = this.randomNum(85, 102) / 10
				} else if (i >= 200 && i < 500) {
					len = this.randomNum(102, 119) / 10
				} else if (i >= 500 && i < 1000) {
					len = this.randomNum(119, 136) / 10
				}
				return len
			},
			randomNum(minNum, maxNum) {
				switch (arguments.length) {
					case 1:
						return parseInt(Math.random() * minNum + 1, 10);
						break;
					case 2:
						return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
						break;
					default:
						return 0;
						break;
				}
			},
			game() {
				this.$router.push({
					path: '/speed',
					query: {
						type: 0
					}
				})
			},
			detail() {
				this.$router.push({
					path: '/detail',
					query: {
						index: 0
					}
				})
			},
			record() {
				let data = null
				let now = new Date();
				let hour = now.getHours()
				let min = now.getMinutes()
				if (hour < 10) {
					hour = "0" + hour
				}
				if (min < 10) {
					min = "0" + min
				}
				let mouth = now.getMonth() + 1
				if (mouth < 10) {
					mouth = "0" + mouth
				}
				let date = now.getFullYear() + "-" + mouth + "-" + now.getDate()
				let time = hour + ":" + mouth + ":" + now.getSeconds()
				let json = {
					down: this.down,
					up: this.up,
					date: date,
					time: time,
					// jd: this.jd,
					// wd: this.wd,
					ip: this.realIp,
					downSum: this.downSum,
					ping: this.ping,
					doudong: this.doudong,
					lost: this.lost,
					type: this.type,
					address:this.address,
					pet:this.pet
				}
				if (localStorage.data5g) {
					data = localStorage.data5g
					data = JSON.parse(data)
					data.unshift(json)
					localStorage.data5g = JSON.stringify(data)
				} else {
					data = []
					data.push(json)
					localStorage.data5g = JSON.stringify(data)
				}
			},
			ajax(params) {
				params = params || {};
				if (!params.url) {
					throw new Error('Necessary parameters are missing.'); //必要参数未填
				}
				var random = +new Date;
				var hander = null;
				var options = {
					url: '', //接口地址
					type: 'GET', //请求方式
					timeout: 5000, //超时等待时间
					cache: true, //缓存 
					async: true, //是否异步
					xhrFields: {}, //设置XHR对象属性键值对。如果需要，可设置withCredentials为true的跨域请求。
					dataType: 'json', //请求的数据类型
					data: {}, //参数
					jsonp: 'callback', //传递请求完成后的函数名
					jsonpCallback: 'jsonp_' + random, //请求完成后的函数名
					error: function() {}, //请求失败后调用
					success: function() {}, //请求成功后调用
					complete: function() {} //请求完成后调用
				};
				var formatParams = function(json) {
					var arr = [];
					for (var i in json) {
						arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(json[i]));
					}
					return arr.join("&");
				};
				for (var i in params) {
					switch (i) {
						case 'type':
							options[i] = params[i].toUpperCase();
							break;
						case 'dataType':
							options[i] = params[i].toLowerCase();
							break;
						default:
							options[i] = params[i];
					}
				}
				if (typeof options.data == 'object') {
					options.data = formatParams(options.data);
				}
				if (options.dataType == 'jsonp') {
					options.cache = params.cache || false;
					//插入动态脚本及回调函数
					var $head = document.getElementsByTagName('head')[0];
					var $script = document.createElement('script');
					$head.appendChild($script);
					window[options.jsonpCallback] = function(json) {
						$head.removeChild($script);
						window[options.jsonpCallback] = null;
						hander && clearTimeout(hander);
						options.success(json);
						options.complete();
					};
					//发送请求
					if (options.cache) {
						options.data += options.data ? '&_' + random : '_' + random;
					}
					options.data += '&' + options.jsonp + '=' + options.jsonpCallback;
					$script.src = (options.url + '?' + options.data).replace('?&', '?');
					//超时处理
					hander = setTimeout(function() {
						$head.removeChild($script);
						window[options.jsonpCallback] = null;
						options.error();
						options.complete();
					}, options.timeout);
				} else {
					if (options.cache) {
						options.data += options.data ? '&_' + random : '_' + random;
					}
					//创建xhr对象
					var xhr = new(self.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
					if (!xhr) {
						return false;
					}
					//发送请求
					if (options.type == 'POST') {
						xhr.open(options.type, options.url, options.async);
						xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
					} else {
						options.url += options.url.indexOf('?') > -1 ? '&' + options.data : '?' + options.data;
						xhr.open(options.type, options.url, options.async);
						options.data = null;
					}
					if (options.xhrFields) {
						for (var field in options.xhrFields) {
							xhr[field] = options.xhrFields[field];
						}
					}
					xhr.send(options.data);
					//超时处理
					var requestDone = false;
					hander = setTimeout(function() {
						requestDone = true;
						if (xhr.readyState != 4) {
							xhr.abort();
							options.error();
						}
						options.complete();
					}, options.timeout);
					//状态处理
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && !requestDone) {
							if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
								var data = options.dataType == "xml" ? xhr.responseXML : xhr.responseText;
								if (options.dataType == "json") {
									try {
										data = JSON.parse(data);
									} catch (e) {
										data = eval('(' + data + ')');
									}
								}
								options.success(data);
							} else {
								options.error();
							}
							hander && clearTimeout(hander);
							options.complete();
						}
					};
				}
			}
		}
	}
</script>
<style lang="less"   > 
	body,
	html {
		height: 100%;
	}
 
	.index {
		padding-top: 0.5rem;
		background: #040412;
		height: 100vh;
	}

	.start {
		background-image: linear-gradient(to right,rgb(98, 223, 148) , rgb(81, 232, 211));
		width: 250px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 20px;
		margin: 0 auto;
		color: #000;
		font-size: 16px;
	}

	@keyframes inmove {
		20% {
			-webkit-transform: scale(.9);
			transform: scale(.9)
		}

		30% {
			-webkit-transform: scale(1);
			transform: scale(1)
		}

		to {
			-webkit-transform: scale(1);
			transform: scale(1)
		}
	}

	@keyframes startCircleAni {

		20% {
			opacity: 1
		}

		40% {
			-webkit-transform: scale(1.2);
			transform: scale(1.2);
			opacity: 0
		}

		to {
			-webkit-transform: scale(1);
			transform: scale(1)
		}



	}

	.tool {
		width: 8rem;
		margin: 20px auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.loading {
			width: 15%;
			margin: auto 5px;
			height: 8px;
			border-radius: 20px;
			position: absolute;
			top: 0;
			bottom: 0;
		}

		.down {
			animation: right 1s ease infinite;
			background: linear-gradient(to right, transparent, rgb(105, 227, 194));
			transform: rotate(180deg);
			right: 0;
		}

		.up {
			animation: right 1s ease infinite;
			background: linear-gradient(to right, transparent, rgb(80, 227, 194));
			left: 0;
		}

		@keyframes right {
			0% {
				opacity: 1;
				width: 10%
			}

			70% {
				width: 80%;
				right: 10%
			}

			to {
				opacity: 0
			}
		}

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

	.chart {
		width: 100%;
		margin: 0 auto;
		display: flex;
		margin-bottom: 0.208rem;
		justify-content: space-between;

		.text {
			font-size: 0.305rem;
			opacity: 0.5;
			margin-right: 0.694rem;
		}

		.table {
			width: 100%;

			.table2 {
				margin-top: 1px;
				position: relative;
				overflow: hidden;
				height: 50px;

				.main {
					position: absolute;
					left: -12%;
					bottom: -20%;
					height: 200%;
					width: 124%;
				}
				#main2{
					bottom:-30%;
				}
			}
		}


	}

	.midMessage {
		width: 250px;
		margin: 0 auto 30px auto;
		display: flex;
		justify-content: space-between;

		.item {
			font-size: 11px;
			line-height: 0.5rem;
			display: flex;
			align-items: center;
			color: rgba(255, 255, 255, .3);
			width: 90px;

			.num {
				display: flex;
				align-items: baseline;
				line-height: 24px;
			}

			img {
				display: block;
				width: 30px;
				margin-right: 10px;
			}

			.label {
				opacity: 0.5;
			}

			.speed {
				color: #fff;
				font-size: 22px;
				margin-right: 2px;
			}

		}
	}

	.testArea {
		width: 6.25rem;
		height: 6.25rem;
		margin: 1rem auto 0px auto;
		position: relative;

		.kedu {
			font-size: 0.333rem;
			position: absolute;
		}

		.pos1 {
			left: 20.75%;
			top: 72.75%;
		}

		.pos2 {
			left: 12%;
			top: 55.25%;
		}

		.pos3 {
			top: 34.25%;
			left: 12.25%
		}

		.pos4 {
			top: 16.5%;
			left: 25.75%;
		}

		.pos5 {
			top: 10%;
			left: 48%;
		}

		.pos6 {
			top: 16.5%;
			right: 23.75%;
		}

		.pos7 {
			top: 34.25%;
			right: 12.25%;
		}

		.pos8 {
			right: 12%;
			top: 55.25%;
		}

		.pos9 {
			right: 19.75%;
			top: 72.75%;
		}



		.text {
			color: #09c269;
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: 0.5rem;
			text-align: center;
		}

		.zhizhen {
			position: absolute;
			transform-origin: top;
			width: 0.4rem;
			display: block;
			left: 0;
			right: 0;
			margin: auto;
			top: 50%;
			// transform: rotate(45deg);

		}

		#zhizhen {
			width: 100%;
			height: 100%;
			position: absolute;
			transform-origin: center;
			top: 0;
			transition: 0.8s linear;
		}

		.zhizhen_first {
			animation: zhizhen 3s forwards;
		}

		.circle {
			stroke-dashoffset: 0;
		}

		.new {
			transition: stroke-dashoffset 0.8s linear;
		}

		svg {
			.first {
				animation: first 3s forwards;
			}
		}


		@keyframes first {
			0% {
				stroke-dashoffset: 27.177rem;
			}

			50% {
				stroke-dashoffset: 13.588rem;
			}

			100% {
				stroke-dashoffset: 27.177rem;
			}
		}

		@keyframes zhizhen {
			0% {
				transform: rotate(50deg);
			}

			50% {
				transform: rotate(315deg);
			}

			100% {
				transform: rotate(50deg);
			}
		}
	}

	.again {
		width: 9.09rem;
		display: flex;
		font-size: 0.4rem;
		margin: 0px auto 1.04rem auto;
		justify-content: space-between;
		align-items: center;

		.left {
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 50%;
			border: 1px solid #00dbff;
			position: relative;
			line-height: 2.6rem;
			text-align: center;

			.cir_in {
				width: 2.1rem;
				height: 2.1rem;
				line-height: 2.1rem;
				border-radius: 50%;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				background-image: linear-gradient(to bottom right, #89ecdc, #00dbff);
				color: #FFF;
			}
		}

		.right {
			flex: 1;
			font-size: 0.4rem;
			color: rgba(255, 255, 255, .5);
			margin-left: 0.447rem;

			.detail {
				color: #00dbff;
				border: 1px solid #00dbff;
				border-radius: 20px;
				width: 2.2rem;
				text-align: center;
				line-height: 25px;
			}
		}
	}

	.ad {
		font-size: 0.389rem;
		color: rgba(255, 255, 255, .5);
		width: 9.09rem;
		display: flex;
		margin: 10px auto;
		align-items: center;

		.icon {
			width: 0.763rem;
			height: 0.763rem;
			background: #1e1e2a;
			border-radius: 50%;
			display: flex;
			align-items: center;
			margin-right: 0.167rem;

			img {
				width: 0.444rem;
				display: block;
				margin: auto;
			}
		}

		.button {
			color: #00dbff;
			border: 1px solid #00dbff;
			border-radius: 20px;
			width: 2.1rem;
			text-align: center;
			line-height: 25px;
			margin-left: 0.4rem;
		}
	}

	.fade-enter-active {
		transition: opacity .5s;
	}

	.fade-enter

	/* .fade-leave-active below version 2.1.8 */
		{
		opacity: 0;
	}



	a {
		text-decoration: none;
	}

	a:active {

		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

	}
</style>
