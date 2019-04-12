

import React,{Component,Fragment} from 'react';
import { connect } from 'react-redux'
import './App.css';
import {  Row, Col ,Button,Input,List} from 'antd'
import store from './store/index.js';

import {getAddAction,getChangeAction,getDelAction,loadInitDataAction} from './store/getAction.js'



//容器组件
class App extends Component{

	componentDidMount(){
		const action = loadInitDataAction()
		store.dispatch(action)	
	}
		
	render() {
		const {val,list,handleChange,handleAdd,handleDle} = this.props;

		return (
			<div className = "app">
			    <Row>
			      <Col span={18}>
			      	<Input 
			      		placeholder="Basic usage"
			      		onChange={handleChange}
			      		value={val}
			      	/>
			      </Col>
			      <Col span={6} push={1}>
			      	<Button 
			      		type="primary"
			      		onClick={handleAdd}
			      	>新增</Button>
			      </Col>
			      <Col span={24}>
				    <List
				      style={{ marginTop: 16 }}
				      bordered
				      dataSource={list}
				      renderItem={(item,index) => (
				      	<List.Item
				      		onClick={()=>{handleDle(index)}}
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

const mapStateToProps = (state) => {
	console.log(state)
	return {
		val:state.val,
		list:state.list
	}
}

const mapDispatchToProps = dispatch=>{
	return{
		handleChange:(ev)=>{
			const value = ev.target.value;
			const action = getChangeAction(value)
			dispatch(action)			
		},
		handleAdd:()=>{
			const action = getAddAction()
			dispatch(action)			
		},
		handleDle:(index)=>{
			const action = getDelAction(index)
			dispatch(action)			
		}

	}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)