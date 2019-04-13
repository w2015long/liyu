
import { fromJS } from 'immutable'

import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM,INIT_ITEM} from './actionTypes.js'

//用fromJS生成一个immutable对象
const defaultState = fromJS({
		list:['吃饭','睡觉'],
		val:''
})

//1. reducer是一个纯函数(固定的输入就有固定的输出)
//2. reducer主要处理业务逻辑 接收(previosState,action),返回newState


export default (state=defaultState,action)=>{
	switch (action.type) {
		case CHANGE_ITEM:
			/*
	  		//1.copy state
	  		const newState = JSON.parse(JSON.stringify(state))
	  		//2.更新 state  		
	  		newState.val = action.payload
	  		return newState
	  		*/
	  		console.log('list>>>>',state.get('list'))
	  		return state.set('val',action.payload)

		case ADD_ITEM:
			/*
	  		const newState1 = JSON.parse(JSON.stringify(state))
	  		newState1.list.push(state.val)
	  		newState1.val = ''
	  		return newState1
	  		*/
	  		const list = state.get('list').push(state.get('val'))

	  		return state.merge({
	  			list,
	  			val:''
	  		});
	  		
		case DEL_ITEM:
			/*
	  		const newState2 = JSON.parse(JSON.stringify(state))
	  		newState2.list.splice(action.payload,1)
	  		return newState2
			*/
			const newlist = state.get('list').splice(action.payload,1);
			return state.set('list',newlist)
			
		case INIT_ITEM:
			/*
	  		newState3.list = action.payload;
	  		return newState3
	  		*/
	  		return state.set('list',action.payload)	 	  			  		
		default:
	  		return state
	}
}