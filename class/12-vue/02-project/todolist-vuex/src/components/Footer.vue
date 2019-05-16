<template>
	<div class="Footer">
		<input type="checkbox" v-model="selectedAll">
		<span>{{AllDone}}/{{total}}</span>
		<button @click="handleDelAllDone">删除所有完成的任务</button>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'Footer',
		methods:{
			handleDelAllDone(){
				if(window.confirm('您确定要删除所有吗？')){
					// this.delAllDone();
					this.$store.dispatch('delAllDone')
				}
			}			
		},
		computed:{
			// 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
			  'total',
			  'AllDone'
			]),
			selectedAll:{
				get(){
					return this.$store.getters.getSelectedAll
				},
				set(val){
					// this.selectedAlltodo(val)
					this.$store.dispatch('selectedAlltodo',val)
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