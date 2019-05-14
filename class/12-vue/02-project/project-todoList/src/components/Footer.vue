<template>
	<div class="Footer">
		<input type="checkbox" v-model="selectedAll">
		<span>{{AllDone}}/{{total}}</span>
		<button @click="handleDelAllDone">删除所有完成的任务</button>
	</div>
</template>
<script>
	export default {
		name:'Footer',
		props:{
			todos:Array,
			selectedAlltodo:Function,
			delAllDone:Function
		},
		methods:{
			handleDelAllDone(){
				if(window.confirm('您确定要删除所有吗？')){
					this.delAllDone()
				}
			}			
		},
		computed:{
			total(){
				return this.todos.length
			},
			AllDone(){
				/*
				var num = 0;
				this.todos.forEach(item=>{
					if(item.done){
						num++
					}
				})
				return num;
				*/
				return this.todos.reduce((total,item)=>{
					if(item.done){
						total++
					}
					return total
				},0)
			},
			selectedAll:{
				get(){
					return this.total == this.AllDone && this.total
				},
				set(val){
					this.selectedAlltodo(val)
				}
			}
		}
	}
</script>
<style scoped>
	.Footer{
		width: 100%;
		line-height: 40px;
		margin-top: 20px;
	}
	.Footer input{
		float: left;
		margin-top: 14px;
		margin-right: 10px;
	}
	.Footer button{
		float: right;
		margin-top: 14px;
	}		
</style>