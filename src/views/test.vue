<template>
   <div id="line1" style="width:100%;height:30rem;" @click="update()"></div>
</template>
 
<script> 
export default {
  data () {
    return {
      data: []
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('line1'))
    this.initData()
   
  },
  methods: { 
	 update(){
		 console.log(1) 
		   for (var i = 0; i < 5; i++) {  
			 this.data.push(5)
		     this.myChart.setOption({
		       series: [{
		         data: this.data
		       }]
		     })
		   } 
	 },
    initData () { 
     var option={
     	xAxis: {
     		boundaryGap: false, 
     	},
     	yAxis: { 
     		max: 20,
     		min: 0,
     		splitNumber: 1,
     	},
     	series: [{
     		type: 'line',
     		data: this.data,
     		showSymbol: false,
     		hoverAnimation: false,
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
     		}
     	}]
     }
      this.myChart.setOption(option)
    }
  }
}
</script> 

<style>
</style>
