

import React,{Component,Fragment} from 'react';
import './App.css';
import {  Row, Col ,Button,Input,List, Typography} from 'antd';
// import 'antd/dist/antd.css';


class App extends Component{
	constructor(props){
		super(props);

		this.state = {
			data:['吃饭'],
			val:''
		}


		this.handleVal = this.handleVal.bind(this);
		this.handleAdd = this.handleAdd.bind(this);		
	}

	handleAdd(ev){	
		this.setState(preState=>({
				data:[...preState.data,preState.val],
				val:''
		}))
	}	
	handleVal(ev){

		const value = ev.target.value;
		this.setState(preState=>({
			val:value
		}))
	}

	handleDle(item){
	
		this.setState(preState=>{
			const data = [...preState.data];
			const index = data.indexOf(item)
			data.splice(index,1);			
			return {data}
		}) 


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
				      renderItem={item => (
				      	<List.Item
				      		onClick={this.handleDle.bind(this,item)}
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