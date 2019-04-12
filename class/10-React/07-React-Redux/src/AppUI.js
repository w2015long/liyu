

import React,{Component,Fragment} from 'react';
import './App.css';
import {  Row, Col ,Button,Input,List} from 'antd'



//UI组件
const AppUI = (props)=>{

//子组件接收父组件传递过来的数据
const {value,list,handleVal,handleAdd,handleDle} = props;	

	return (
		<div className = "app">
		    <Row>
		      <Col span={18}>
		      	<Input 
		      		placeholder="Basic usage"
		      		onChange={handleVal}
		      		value={value}
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


export default AppUI;