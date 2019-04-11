
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

export {getAddAction,getChangeAction,getDelAction}