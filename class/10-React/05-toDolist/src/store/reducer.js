import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM} from './actionTypes.js'

const defaultState = {
		data:['吃饭','睡觉'],
		val:''
}

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