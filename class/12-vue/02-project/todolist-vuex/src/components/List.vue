<template>
	<div class="List">
		<Item 
			v-for="(todo,index) in this.$store.state.todos"
			:key="index"
			:todo="todo"
			:index="index"
		/>
	</div>
</template>
<script>
	import Item from './Item.vue'
	export default {
		name:'List',
		props:{
			todos:Array
		},
		components:{
			Item
		},

	}
</script>
<style scoped>
	
</style>