import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM} from './actionTypes.js'

const defaultState = {
		data:['吃饭','睡觉'],
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
		/*
			 不是纯函数的例子
			 newState.val = action.payload + Date.now
			 newState.val = action.payload + Math.random()
		*/	  		
	  		newState.val = action.payload
	  		return newState
		case ADD_ITEM:
	  		//1.copy state
	  		const newState1 = JSON.parse(JSON.stringify(state))
	  		//2.更新 state
	  		newState1.data.push(action.payload)
	  		newState1.val = ''
	  		return newState1
		case DEL_ITEM:
	  		//1.copy state
	  		const newState2 = JSON.parse(JSON.stringify(state))
	  		//2.更新 state
	  		newState2.data.splice(action.payload,1)
	  		return newState2	  		
		default:
	  		return state
	}
}