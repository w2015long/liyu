

import React,{Component,Fragment} from 'react';
import AppUI from './AppUI.js'


import store from './store/index.js';
import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM,INIT_ITEM} from './store/actionTypes.js'
import {getAddAction,getChangeAction,getDelAction,loadInitDataAction} from './store/getAction.js'


//容器组件
class App extends Component{
	constructor(props){
		super(props);
		//1. 初始化时获取store中的数据
		this.state = store.getState()
		//2. 数据更新时调用(subscribe:订阅)
		store.subscribe(()=>{
			//获取store中的最新数据来更新当前组件的state数据
			this.setState(()=>store.getState())			
		})

		this.handleVal = this.handleVal.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDle = this.handleDle.bind(this);		
	}

	componentDidMount(){
		
		const action = loadInitDataAction()
		store.dispatch(action)


		/*
		axios
		.get('http://127.0.0.1:3000')
		.then(response=>{
			//console.log(response)
			//获取后台数据更新store数据 并渲染页面
			const action = getInitAction(response.data)
			store.dispatch(action)

		})
		.catch(err=>{
			console.log(err)
		})
		*/
	}


	handleAdd(){
		const action = getAddAction(this.state.val)
		//3. 组件发送action 通过dispatch派发给store,store再发给reducer来处理
		store.dispatch(action)
	}

	handleVal(ev){
		const value = ev.target.value;
		const action = getChangeAction(value)
		store.dispatch(action)
	}

	handleDle(index){
		const action = getDelAction(index)
		store.dispatch(action)
	}

	render() {
		return (

			<AppUI 
				//父组件传数据给子组件

				value = {this.state.val}
				list = {this.state.list}
				handleVal={this.handleVal}
				handleAdd={this.handleAdd}
				handleDle={this.handleDle}

			/>

		)
	}
}

export default App;