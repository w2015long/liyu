

import React,{Component,Fragment} from 'react';
import { connect } from 'react-redux'
import './App.css';
import {  Row, Col ,Button,Input,List} from 'antd'

import {getAddAction,getChangeAction,getDelAction,loadInitDataAction} from './store/getAction.js'




//容器组件
class App extends Component{

	componentDidMount(){
		this.props.handleInit()
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

//store里的state映射到组件的props上
const mapStateToProps = (state) => {
	// console.log(state)
	return {
		val:state.val,
		list:state.list
	}
}
//派发一系列action的方法映射到组件的props上
const mapDispatchToProps = dispatch=>{
	// console.log(dispatch)
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
		},
		handleInit:()=>{
			const action = loadInitDataAction()
			dispatch(action)				
		}

	}
}

//connect方法让指定的组件(App)与store连接
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)