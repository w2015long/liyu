
import {
	ADD_TODO,
	DEL_TODO,
	SELECTED_ALL_TODO
}from './types.js'
export default{
	[ADD_TODO](state,todo){
		state.todos.unshift(todo)
	},
	[DEL_TODO](state,index){
		state.todos.splice(index,1)
	},
	[SELECTED_ALL_TODO](state,val){
		state.todos.forEach(item=>{
			item.done = val
		})
	},
}