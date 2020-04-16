<template>
  <div id="app"> 
   <keep-alive>
       <router-view v-if="$route.meta.keepAlive"></router-view>
   </keep-alive>
   <router-view v-if="!$route.meta.keepAlive"></router-view> 
  </div>
</template>


<style lang="less">
body,html{
	width:100%;
	height: 100vh;
	margin:0;
   
}
 
#app { 
  font-family: "黑体";
  background: #040412;
  width:100%;
  height: 100%;
  color:#FFF;
} 
</style>
