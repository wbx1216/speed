<template>
	<div class="nav">
		<div v-for="(item,index) in list" :key="index" class="item" :class="$route.path==item.url?'selected':''" @click="select(index)">
			<img :src="$route.path==item.url?require('@/assets/nav_icon'+index+'_1.png'):require('@/assets/nav_icon'+index+'_0.png')">
			<div>{{item.name}}</div>
		</div>
		<a class="item" :href="ad.url">
			<img :src="ad.icon">
			<div>{{ad.name}}</div>
		</a>
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
					name: "记录",
					url: "/record"
				}, {
					name: "工具",
					url: "/tool"
				}],
				ad: "",
				nav: 0
			}
		},
		mounted() {  
			this.$axios.get("../../doc/getAdv.htm?appId=17&posId=119").then(res => {
				let data = res.data.data
				let random=""
				if(sessionStorage.random){
					random=sessionStorage.random
				}else{
					random=Math.floor((Math.random() * data.length))
					sessionStorage.random=random
				} 
				this.ad = data[random]
				
			}) 
		},
		methods: {
			select(index) {
				this.nav = index;
				let url = this.list[index].url
				this.$router.push(url);
			},
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
			width: 25%;
			text-align: center;

			img {
				height: 0.625rem;
				display: block;
				margin: auto;
			}

			font-size:0.27rem;
			line-height: 0.63rem;
		}

		.selected {
			color: #00dbff;
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
