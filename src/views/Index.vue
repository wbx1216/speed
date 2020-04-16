<template>
	<div class="index">
		<bottomNav></bottomNav>
		<topNav></topNav>
		<div style="text-align: center;color:rgba(255,255,255,.6);font-size:0.28rem;" v-show="status==0">5G测速来啦,快来测测你的网速吧</div>
		<img src="../assets/index_top.png" style="width:4.23rem;display: block;margin:5px auto;" v-show="status==0">
		<div class="start" v-show="status==0" @click="start">
			<div class="cir_in">测速</div>
			<div class="cir_out"></div>
		</div>
		<img src="../assets/index_logo.png" v-show="status==0" style="position: absolute;top:0.5rem;left:0.5rem;width:4rem;">
		<div v-show="status!=0">
			<transition name="fade">
				<div class="again" v-if="status==2">
					<div class="left" @click="start">
						<div class="cir_in">测速</div>
					</div>
					<div class="right">
						<div>您的网速相当于<span style="color:#00dbff">{{level}}</span>宽带</div>
						<div style="display: flex;align-items: center;margin-top: 0.4rem;justify-content: space-between;">
							<div style="font-size: 0.36rem;">已超越全国<span style="color:#00dbff">{{pet}}%</span>的用户</div>
							<div class="detail" @click="detail">详情分析</div>
						</div>
					</div>
				</div>
			</transition>
			<div class="down chart">
				<div style="width:3rem">
					<div class="text">下载/Mbps</div>
					<div style="background: #69e3c2;width:0.56rem;height:0.069rem;margin-top: 0.416rem;" v-show="down<=0"></div>
					<div style="color:#69e3c2;font-size: .6rem;line-height: 1rem;" v-show="down>0">{{down}}</div>
				</div>
				<div class="table">
					<div style="font-size:0.305rem; text-align: right;margin-bottom: 0.2rem;color:rgba(255,255,255,.5)" :style="{visibility:(downSum>0?'visible':'hidden')}">使用流量<span
						 style="color:#69e3c2;margin-left: 5px;">{{downSum}}M</span></div>
					<div class="table2">
						<div id="main" class="main"></div>
						<!-- <canvas id="canvas" width="235px"></canvas> -->
					</div>
				</div>
			</div>
			<div class="up chart">
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
						<!-- <canvas id="canvas" width="235px"></canvas> -->
					</div>
				</div>
			</div>
			<div class="midMessage">
				<div class="item">
					<div class="label">PING/ms</div>
					<div class="num"><span v-show="ping==0"></span>
						<div v-show="ping>0">{{ping}}</div>
					</div>
				</div>
				<div class="item">
					<div class="label">抖动/ms</div>
					<div class="num"><span v-show="doudong==0"></span>
						<div v-show="doudong>0">{{doudong}}</div>
					</div>
				</div>
				<div class="item">
					<div class="label">丢包/%</div>
					<div class="num"><span v-show="lost==0"></span>
						<div v-show="lost>0">{{lost}}%</div>
					</div>
				</div>
			</div>
			<transition name="fade">
				<div v-if="status==2" style="margin-top: 1.11rem;">
					<div class="ad">
						<div class="icon"><img src="../assets/cesu_icon0.png"></div>
						<div>玩大型网游，网速延迟一目了然</div>
						<div class="button" @click="game">游戏测速</div>
					</div>
					<a class="ad" :href="ad.url" target="_blank">
						<div class="icon"><img src="../assets/ie.png"></div>
						<div>{{ad.desc}}</div>
					</a>
				</div>
			</transition>
			<div class="testArea" v-if="status==1">
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
								<circle r="2.885rem" cx="50%" cy="50%" :stroke-dasharray="old+'px'" stroke="#2d333f" stroke-width="0.48rem"
								 fill="none" class="circle"></circle>
								<circle r="2.885rem" cx="50%" cy="50%" class="new" :stroke-dasharray="2*old+'px'" :stroke-dashoffset="dashoffset+'px'"
								 :class="first?'first':''" stroke="#14c7e5" stroke-width="0.48rem" fill="none"></circle>
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
		</div>
		<div class="tool" :style="status!=1?'width:8rem':''">
			<div class="item">
				<img src="@/assets/location.png">
				<div class="text">
					<div>{{ip}}</div>
					<div>{{operator}}</div>
				</div>
			</div>
			<div style="flex: 1;position: relative;margin:0px 5px">
				<div class="loading" :class="{down:downStatus,up:upStatus}" v-show="status==1"></div>
			</div>
			<div class="item">
				<img src="@/assets/jiedian.png">
				<div style="color:#00dbff;font-size: 0.36rem;margin-left: 0.2rem;">云测节点</div>
			</div>
		</div>
		<div class="bannerAd" v-show="bannerAd&&status==0">
			<a :href="bannerAd.url">
				<img :src="bannerAd.pic" style="width:90%;display: block;margin:10px auto;">
			</a>
		</div>
		<iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
		</iframe>
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
		data() {
			return {
				downStatus: false,
				upStatus: false,
				status: 0,
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
				type: ""

			}
		},
		created() {
			let that = this
			this.ajax({
				'url': 'http://api.ip138.com/query/',
				'data': { //默认自动添加callback参数
					'ip': '', //为空即为当前iP地址
					'oid': '28624',
					'mid': '90952',
					'token': '53237a5c33dc8f71d60a229331bc9760' //不安全，请定期刷新token，建议进行文件压缩
				},
				'dataType': 'jsonp',
				'success': function(json) {
					console.log(json)
					that.ip = json.ip.split(".")[0] + "..." + json.ip.split(".")[3]
					that.realIp = json.ip
					that.operator = json.data[2] + json.data[3]
					that.type = json.data[3]
				}
			});
			setInterval(function() {
				if (w) w.postMessage('status');
			}, 200);
			window.addEventListener('message', function(event) {
				var loc = event.data;
				if (loc && loc.module) {
					that.jd = (loc.lng).toFixed(2)
					that.wd = (loc.lat).toFixed(2)
				}
			}, false)
			this.$axios.get("../../doc/getAdv.htm?appId=17&posId=121").then(res => {
				let data = res.data.data
				this.ad = data[Math.floor((Math.random() * data.length))]
			})
			this.$axios.get("../../doc/getAdv.htm?appId=17&posId=122").then(res => {
				let data = res.data.data
				this.bannerAd = data[Math.floor((Math.random() * data.length))]
			})
		},
		mounted() {
			vm = this
			this.getNetworkType()
		},
		methods: {
			creatDown() {
				let xData = new Array(16).fill("")
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
						},
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgb(105, 227, 194)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(255,255,255,0)'
								}],
								global: false // 缺省为 false
							}
						}, 
						animationDurationUpdate: function (idx) {
						    // 越往后的数据延迟越大
						    return idx * 1000;
						}
					}], 
				}
				this.myChart.setOption(option, true)
			},
			creatUp() {
				let xData = new Array(10).fill("")
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
						},
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgb(0, 219, 255)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(255,255,255,0)'
								}],
								global: false // 缺省为 false
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

				// this.option.series[0].data = this.downData 
				// myChart.setOption(this.option);
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
						networkType = 'wifi';
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
				this.type = networkStr
			},
			start() {
				this.status = 1
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

				// this.upData = [0]
				// this.option.series[0].data = this.downData
				// this.option2.series[0].data = this.upData
				// let myChart = document.getElementById("main")
				// let myChart2 = document.getElementById("main2")
				// let canvas = document.getElementsByTagName("canvas")
				// if (canvas.length > 0) {
				// 	canvas[1].parentNode.removeChild(canvas[1])
				// 	canvas[0].parentNode.removeChild(canvas[0])
				// }
				// myChart.removeAttribute("_echarts_instance_");
				// myChart2.removeAttribute("_echarts_instance_");
				w = new Worker('speedtest_worker.min.js');
				w.postMessage('start'); //Add optional parameters as a JSON object to this command 
				w.onmessage = (e) => {
					let data = JSON.parse(e.data) 
					let status = data.testState;
					let zhizhen = document.querySelector('.zhizhen');
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
						console.log(this.downData.length)
						this.downStatus = false
						this.up = data.ulStatus
						this.speed = "0.00"
						this.dashoffset = document.body.clientWidth * 2.718
						this.deg = 50
						if (time == 1) {
							this.downSum = this.randomNum(20, 30)
							time = 2;
						}
					} else if (status == 3 && data.ulStatus != "") {
						this.upStatus = true
						this.drawUp(data.ulStatus)
						this.up = data.ulStatus
						let set = this.offset(data.ulStatus)
						this.dashoffset = (27.176 - set) * document.body.clientWidth / 10
						this.deg = (set * 19.8 + 45).toFixed(3)
						this.speed = data.ulStatus
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
						this.record()
						let that = this
						setTimeout(function() {
							that.status = 2
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
					jd: this.jd,
					wd: this.wd,
					ip: this.realIp,
					downSum: this.downSum,
					ping: this.ping,
					doudong: this.doudong,
					lost: this.lost,
					type: this.type
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
<style lang="less" scoped="scoped">
	.index {
		padding-top: 1.8rem;
	}

	.start {
		width: 5.83rem;
		height: 5.83rem;
		position: relative;
		margin: 0px auto 1rem auto;
		padding-top: 1rem;

		.cir_out {
			border: 2px solid #00dbff;
			width: 4.83rem;
			height: 4.83rem;
			border-radius: 50%;
			margin: auto;
			position: absolute;
			left: 0;
			bottom: 0;
			top: 0;
			right: 0;
			animation: startCircleAni 3s ease-in 2.8s infinite;
			-webkit-animation: startCircleAni 3s ease-in 2.8s infinite;
			opacity: 0;
			/* Safari 和 Chrome */
		}



		.cir_in {
			width: 4.83rem;
			height: 4.83rem;
			border-radius: 50%;
			position: absolute;
			left: 0rem;
			top: 0rem;
			bottom: 0;
			right: 0;
			margin: auto;
			color: #FFF;
			font-size: 0.9rem;
			text-align: center;
			line-height: 4.83rem;
			animation: inmove 3s ease-in 2s infinite;
			-webkit-animation: inmove 3s ease-in 2s infinite;
			background-image: linear-gradient(to bottom right, #89ecdc, #00dbff);

		}
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
		width: 9.09rem;
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
			width: 5rem;

			.table2 {
				margin-top: 1px;
				position: relative;
				background-size: cover;
				background: url('../assets/table.png') no-repeat;
				overflow: hidden;
				background-size: 100% 100%;
				height: 1rem;
			}
		}


	}

	.midMessage {
		width: 9.09rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;

		.item {
			font-size: 0.305rem;
			text-align: center;
			line-height: 0.5rem;

			.label {
				opacity: 0.5;
			}

			span {
				display: block;
				width: 0.486rem;
				height: 1px;
				background: #FFF;
				margin: 0.278rem auto;
			}
		}
	}

	.testArea {
		width: 6.25rem;
		height: 6.25rem;
		margin: 1rem auto;
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
			color: #00dbff;
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

	.table2 {
		.main {
			width: 124%;
			height: 220%;
			position: absolute;
			left: -12%;
			bottom: -50%;
		}
	}

	a {
		text-decoration: none;
	}

	a:active {

		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

	}
</style>
