<template>
	<div>
		<!-- <div v-show="!show">
			<img src="@/assets/menu.png" class="menu" @click="show=true">
		</div>
		<div v-show="show" class="cover">
			<img src="@/assets/close.png" class="menu" @click="show=false">
			<div style="padding-top: 1rem;"></div>
			<div  class="item" @click="nav('/')">
				<img src="@/assets/nav_icon0_0.png" class="icon">
				<div>测网速</div>
				<img src="@/assets/arrow.png" class="arrow">
			</div>
		    <div class="item" @click="nav('/tool')">
				<img src="@/assets/nav_icon2_0.png" class="icon">
				<div>工具箱</div>
				<img src="@/assets/arrow.png" class="arrow">
			</div>
	 
		</div> -->
	</div>
</template>

<script>
	export default {
		name: 'topNav',
		data() {
			return {
				show: false,
				ad:""
			}
		},
		// mounted() {
		// 	this.$axios.get("../../doc/getAdv.htm?appId=17&posId=119").then(res => {
		// 		let data = res.data.data
		// 		let random=""
		// 		if(sessionStorage.random){
		// 			random=sessionStorage.random
		// 		}else{
		// 			random=Math.floor((Math.random() * data.length))
		// 			sessionStorage.random=random
		// 		} 
		// 		this.ad = data[random] 
		// 	}) 
		// },
		 methods:{
			 nav(url){
				 console.log(this.$route.path)
				 if(url==this.$route.path){
					 this.show=false;
				 }
				 this.$router.push(url); 
			 }
		 }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	a {
		text-decoration: none;color:#FFF;
	}

	.menu {
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		right: 0.25rem;
		top: 0.5rem;
		z-index: 999;
	}

	.cover {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(4, 4, 18, .95);
		z-index: 100;
	}

	.item {
		width: 9.09rem;
		display: flex;
		align-items: center;
		margin: 0 auto;
		line-height: 1.38rem;
		font-size: 0.47rem;
		border-bottom: 1px solid;
		border-color: rgba(255, 255, 255, 0.2);
		position: relative;

		.icon {
			width: 0.625rem;
			display: block;
			margin-right: 0.27rem;
		}

		.arrow {
			position: absolute;
			right: 0;
			width: 0.278rem;
			transform: rotate(180deg);
		}
	}
</style>
