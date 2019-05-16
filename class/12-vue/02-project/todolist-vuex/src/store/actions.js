
import {
	ADD_TODO,
	DEL_TODO,
	SELECTED_ALL_TODO,
	DEL_ALL_DONE
}from './types.js'
export default{
	addTodo({commit},todo){
		commit(ADD_TODO,todo)
	},
	delTodo({commit},index){
		commit(DEL_TODO,index)
	},
	selectedAlltodo({commit},val){
		commit(SELECTED_ALL_TODO,val)
	},
	delAllDone({commit}){
		commit(DEL_ALL_DONE)
	}
}