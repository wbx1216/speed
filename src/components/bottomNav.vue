<template>
	<div class="nav">
		<div v-for="(item,index) in list" :key="index" class="item" :class="$route.path==item.url?'selected':''" @click="select(index)">
			<img :src="$route.path==item.url?require('@/assets/nav_icon'+index+'_1.png'):require('@/assets/nav_icon'+index+'_0.png')">
			<div style="opacity: 0.6;">{{item.name}}</div>
		</div>
		<a class="item" v-if="ad" :href="ad.url"> 
			<img :src="ad.icon">
			<div>{{ad.name}}</div>
		</a>
		<!-- <a class="item"  href="http://www.playwonderful.cn/?cid=994121">
			<img  src="@/assets/nav_icon4_0.png">
			<div>资讯</div>
		</a> -->
	</div>
</template>

<script>
	export default {
		name: 'bottomNav',
		data() {
			return {
				list: [{
					name: "测速",
					url: "/"
				}, {
					name: "历史",
					url: "/record"
				}, {
					name: "工具",
					url: "/tool"
				}], 
				nav: 0,
				ad:""
				
			}
		},  
		created(){
			let that=this
			// this.$axios.get("http://www.speedtesting.cn/doc/getAdv.htm?appId=30&posId=253").then(res => {
			// 	let data = res.data.data 
			// 	if(data){
			// 		console.log(data)
			// 		that.ad=data[0]
			// 	}
			// })
		},
		methods: {
			select(index) {
				this.nav = index;
				let url = this.list[index].url
				this.$router.push(url);
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
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.nav {
		position: fixed;
		bottom: 0px;
		width: 100%;
		color: #ffffff;
		display: flex;
		align-items: center;
		background: #040412;
		padding: 0.1rem 0px;
		z-index: 999;

		.item { 
			text-align: center;
			flex:1;
			img {
				height: 0.625rem;
				display: block;
				margin: auto;
			}

			font-size:0.27rem;
			line-height: 0.63rem;
		}

		.selected {
			color: #60d58b;
		}
	}

	a {
		text-decoration: none;
		color: #fff;
	}

	a:active {

		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

	}
	@supports (bottom: env(safe-area-inset-bottom)) {
		.nav {
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
</style>
