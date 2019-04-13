import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM,INIT_ITEM} from './actionTypes.js'

const defaultState = {
		list:['吃饭','睡觉'],
		val:''
}

//1. reducer是一个纯函数(固定的输入就有固定的输出)
//2. reducer主要处理业务逻辑 接收(previosState,action),返回newState


export default (state=defaultState,action)=>{
	switch (action.type) {
		case CHANGE_ITEM:
	  		//1.copy state
	  		const newState = JSON.parse(JSON.stringify(state))
	  		//2.更新 state  		
	  		newState.val = action.payload
	  		return newState
		case ADD_ITEM:
	  		//1.copy state
	  		const newState1 = JSON.parse(JSON.stringify(state))
	  		//2.更新 state
	  		newState1.list.push(state.val)
	  		newState1.val = ''
	  		return newState1
		case DEL_ITEM:
	  		//1.copy state
	  		const newState2 = JSON.parse(JSON.stringify(state))
	  		//2.更新 state
	  		newState2.list.splice(action.payload,1)
	  		return newState2

		case INIT_ITEM:
	  		//1.copy state
	  		const newState3 = JSON.parse(JSON.stringify(state))
	  		//2.更新 state
	  		newState3.list = action.payload;
	  		return newState3	 	  			  		
		default:
	  		return state
	}
}