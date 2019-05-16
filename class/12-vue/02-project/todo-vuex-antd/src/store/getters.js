

export default{
	total(state){
		return state.todos.length
	},
	AllDone(state){
		return state.todos.reduce((total,item)=>{
			if(item.done){
				total++
			}
			return total
		},0)
	},
	getSelectedAll(state,getter){
		// console.log('getter',getter)
		return getter.total == getter.AllDone && getter.total
	}	
}