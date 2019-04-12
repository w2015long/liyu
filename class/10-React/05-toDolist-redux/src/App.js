

import React,{Component,Fragment} from 'react';
import './App.css';
import {  Row, Col ,Button,Input,List} from 'antd'


import store from './store/index.js';
import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM} from './store/actionTypes.js'
import {getAddAction,getChangeAction,getDelAction} from './store/getAction.js'


//容器组件
class App extends Component{
	constructor(props){
		super(props);
		/*
		this.state = {
			data:['吃饭'],
			val:''
		}
		*/
//1. 初始化时获取store中的数据
		this.state = store.getState()
//2. 数据更新时调用(subscribe:订阅)
		store.subscribe(()=>{
			//获取store中的最新数据来更新当前组件的state数据
			this.setState(()=>store.getState())			
		})

		this.handleVal = this.handleVal.bind(this);
		this.handleAdd = this.handleAdd.bind(this);		
	}

	handleAdd(){
		/*	
		this.setState(preState=>({
				data:[...preState.data,preState.val],
				val:''
		}))
		
		const action = {
			type:ADD_ITEM,
			payload:this.state.val			
		}
		*/

		const action = getAddAction(this.state.val)
//3. 组件发送action 通过dispatch派发给store,store再发给reducer来处理
		store.dispatch(action)
	}	
	handleVal(ev){

		const value = ev.target.value;
		/*
		this.setState(preState=>({
			val:value
		}))
		
		const action = {
			type:CHANGE_ITEM,
			payload:value
		}
		*/
		const action = getChangeAction(value)
		store.dispatch(action)

	}

	handleDle(index){
		/*
		this.setState(preState=>{
			const data = [...preState.data];
			data.splice(index,1);			
			return {data}
		}) 
		
		const action = {
			type:DEL_ITEM,
			payload:index
		}
		*/
		const action = getDelAction(index)
		store.dispatch(action)


	}



	render() {
		return (
			<div className = "app">
			    <Row>
			      <Col span={18}>
			      	<Input 
			      		placeholder="Basic usage"
			      		onChange={this.handleVal}
			      		value={this.state.val}
			      	/>
			      </Col>
			      <Col span={6} push={1}>
			      	<Button 
			      		type="primary"
			      		onClick={this.handleAdd}
			      	>新增</Button>
			      </Col>
			      <Col span={24}>
				    <List
				      style={{ marginTop: 16 }}
				      bordered
				      dataSource={this.state.data}
				      renderItem={(item,index) => (
				      	<List.Item
				      		onClick={this.handleDle.bind(this,index)}
				      	>
				      		 {item}
				      	</List.Item>
				      )}
				    />
			      </Col>
			    </Row>
			</div>


		)
	}
}

export default App;