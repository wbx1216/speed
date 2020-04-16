<template>
	<div>
		<topNav></topNav>
		<div class="title">
			<img src="../assets/arrow.png" @click="back">
			IP查询
		</div>
		<img src="../assets/tool_icon0.png" class="icon">
		<div class="title2">
			<div class="line"></div>
			<div>当前IP地址</div>
			<div class="line"></div>
		</div>
		<div style="text-align: center;font-size:0.5rem ;">{{ip}}</div>
		<div style="text-align: center;font-size:0.306rem ;margin-top: 0.347rem;">{{address[0]}}&nbsp;{{address[1]}}&nbsp;{{address[2]}}&nbsp;{{address[3]}}</div>
		<div class="ipList">
			<input class="ip" v-model="list[0]" placeholder="0" />
			<input class="ip" v-model="list[1]" placeholder="0" />
			<input class="ip" v-model="list[2]" placeholder="0" />
			<input class="ip" v-model="list[3]" placeholder="0" />
		</div>
		<div class="button" @click="search" :class="list[0]&&list[1]&&list[2]&&list[3]?'active':''">查询</div>
	</div>
</template>

<script>
	import topNav from "../components/topNav.vue"
	export default {
		name: 'ipSearch',
		components: {
			topNav: topNav
		},
		data() {
			return {
				ip: "",
				address: "",
				list: []
			}
		},
		created() {
			let that=this
			this.ajax({
			    'url':'http://api.ip138.com/query/',
			   'data': { //默认自动添加callback参数
			   	'ip': '', //为空即为当前iP地址
			   	'oid': '28230',
			   	'mid': '90585',
			   	'token': '827cb93f55b6478ff37f2e9197d86c86' //不安全，请定期刷新token，建议进行文件压缩
			   },
			    'dataType':'jsonp',
			    'success':function(json){ 
			     	that.ip =json.ip
			     	that.address = json.data
			    }
			});
		},
		methods: {
			back() {
				this.$router.back()
			},
			ajax(params){
			    params = params||{};
			    if (!params.url) {
			        throw new Error('Necessary parameters are missing.'); //必要参数未填
			    }
			    var random = +new Date;
			    var hander = null;
			    var options = {
			        url: '',                                //接口地址
			        type: 'GET',                            //请求方式
			        timeout: 5000,                          //超时等待时间
			        cache: true,                            //缓存 
			        async: true,                            //是否异步
			        xhrFields: {},                          //设置XHR对象属性键值对。如果需要，可设置withCredentials为true的跨域请求。
			        dataType: 'json',                       //请求的数据类型
			        data: {},                               //参数
			        jsonp: 'callback',                      //传递请求完成后的函数名
			        jsonpCallback: 'jsonp_' + random,       //请求完成后的函数名
			        error: function() {},                   //请求失败后调用
			        success: function(){},                  //请求成功后调用
			        complete: function(){}                  //请求完成后调用
			    };
			    var formatParams = function(json) {
			        var arr = [];
			        for(var i in json) {
			            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(json[i]));
			        }
			        return arr.join("&");
			    };
			    for(var i in params){
			        switch(i){
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
			    if(typeof options.data =='object'){
			        options.data = formatParams(options.data);
			    }
			    if(options.dataType=='jsonp'){
			        options.cache = params.cache||false;
			        //插入动态脚本及回调函数
			        var $head = document.getElementsByTagName('head')[0];
			        var $script = document.createElement('script');
			        $head.appendChild($script);
			        window[options.jsonpCallback] = function (json) {
			            $head.removeChild($script);
			            window[options.jsonpCallback] = null;
			            hander && clearTimeout(hander);
			            options.success(json);
			            options.complete();
			        };
			        //发送请求
			        if(options.cache){
			            options.data += options.data?'&_'+random:'_'+random;
			        }
			        options.data += '&'+options.jsonp+'='+options.jsonpCallback;
			        $script.src = (options.url + '?' + options.data).replace('?&','?');
			        //超时处理
			        hander = setTimeout(function(){
			            $head.removeChild($script);
			            window[options.jsonpCallback] = null;
			            options.error();
			            options.complete();
			        }, options.timeout);
			    }else{
			        if(options.cache){
			            options.data += options.data?'&_'+random:'_'+random;
			        }
			        //创建xhr对象
			        var xhr = new (self.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP");
			        if(!xhr){
			            return false;
			        }
			        //发送请求
			        if (options.type == 'POST') {
			            xhr.open(options.type, options.url, options.async);
			            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
			        }else{
			            options.url += options.url.indexOf('?')>-1?'&'+options.data:'?'+options.data;
			            xhr.open(options.type, options.url, options.async);
			            options.data = null;
			        }
			        if(options.xhrFields){
			            for(var field in options.xhrFields){
			                xhr[field]= options.xhrFields[field];
			            }
			        }
			        xhr.send(options.data);
			        //超时处理
			        var requestDone = false;
			        hander = setTimeout(function() {
			            requestDone = true;
			            if(xhr.readyState != 4){
			                xhr.abort();
			                options.error();
			            }
			            options.complete();
			        }, options.timeout);
			        //状态处理
			        xhr.onreadystatechange = function(){
			            if(xhr.readyState == 4&&!requestDone) {
			                if(xhr.status>=200 && xhr.status<300||xhr.status == 304) {
			                    var data = options.dataType == "xml" ? xhr.responseXML : xhr.responseText;
			                    if (options.dataType == "json") {
			                        try{
			                            data =  JSON.parse(data);
			                        }catch(e){
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
			},
			search() {
				let that=this
				let ip = this.list.join('.')
				this.ajax({
				    'url':'http://api.ip138.com/query/',
				    'data':{            //默认自动添加callback参数
				        'ip':ip, //为空即为当前iP地址
				        'oid':'27815',
				        'mid':'90169',
				        'token':'c8125d9d5c9d0fd32d05345aaa13d1cd'  //不安全，请定期刷新token，建议进行文件压缩
				    },
				    'dataType':'jsonp',
				    'success':function(json){ 
				     	that.ip =json.ip
				     	that.address = json.data
				    }
				});
			 
			
			}
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
	.icon {
		padding-top: 3.01rem;
		margin: 0 auto;
		display: block;
		width: 1.167rem;
	}

	.title2 {
		width: 5.903rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.833rem auto;
		opacity: .5;
		color: #10ddfb;
		font-size: 0.306rem;

		.line {
			width: 2.028rem;
			height: 1px;
			background: #10ddfb;
		}
	}

	.ipList {
		width: 8rem;
		display: flex;
		justify-content: space-between;
		margin: 0.833rem auto 0.633rem auto;

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

	.button {
		width: 7.917rem;
		line-height: 1.25rem;
		text-align: center;
		font-size: 0.444rem;
		margin: 0 auto;
		border-radius: 20px;
		background: rgba(255, 255, 255, .1);
		border: none;
		color: rgba(255, 255, 255, .3);
	}
	.active{
		background: linear-gradient(-90deg, rgb(61, 227, 239) 0%, rgb(115, 233, 226) 100%);
		color: #fff;
	}
</style>
