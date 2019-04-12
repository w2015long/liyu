import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM,INIT_ITEM} from './actionTypes.js'

let getAddAction = (payload)=>{
	return {
		type:ADD_ITEM,
		payload		
	}
}

let getChangeAction = (payload)=>{
	return {
		type:CHANGE_ITEM,
		payload		
	}
}

let getDelAction = (payload)=>{
	return {
		type:DEL_ITEM,
		payload		
	}
}

let getInitAction = payload=>{
	return {
		type:INIT_ITEM,
		payload		
	}
}

export {getAddAction,getChangeAction,getDelAction,getInitAction}