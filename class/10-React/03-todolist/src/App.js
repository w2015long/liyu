

import React,{Component,Fragment} from 'react';
import axios from 'axios'
import './App.css';
import Item from './Item.js';

class App extends Component{
	constructor(props){
		console.log('01 App constructor')
		super(props);
		this.state = {
			list:['吃饭'],
			val:''
		}
		this.handleVal = this.handleVal.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
/*
	static getDerivedStateFromProps(nextProps, prevState){
		console.log('App getDerivedStateFromProps (nextProps, prevState)',nextProps, prevState)
		return {
			// list:['打豆豆']
		}
	}
*/	
	componentDidMount(){
		//组件挂载完毕执行,多用于发送ajax获取数据
		axios
		.get('http://127.0.0.1:3000/')
		.then(data=>{
			// console.log(data)
			this.setState(()=>({
					list:data.data
			}))
		})
		.catch(err=>{
			console.log(err)
		})
	}

	/*----------------------update--------------------------*/
/*
	static getDerivedStateFromProps(props,state){
		console.log('App getDerivedStateFromProps (props,state)',props,state);
		return {}
	}
	shouldComponentUpdate(nextProps,nextState){
		console.log('App shouldComponentUpdate',nextProps,nextState);
		
		// return false
		return true
	}
	getSnapshotBeforeUpdate(prevProps,prevState){
		console.log('App getSnapshotBeforeUpdate',prevProps,prevState);
		return 'custom snapshot'
	}
	componentDidUpdate(prevProps, prevState,snapshot){
		console.log('App componentDidUpdate',prevProps, prevState,snapshot)
	}
	*/	
	handleAdd(ev){	
		this.setState(preState=>({
				list:[...preState.list,preState.val],
				val:''
		}))
	}

	handleVal(ev){

		const value = ev.target.value;
		this.setState(preState=>({
			val:value
		}))
	}

	handleDle(index){

		this.setState(preState=>{
			const list = [...preState.list];
			list.splice(index,1);			
			return {list}
		}) 

	}
	getItem(){
		return 	this.state.list.map((item,index)=>{
							
				return <Item 
						key = {index}
						content={item}
						handleDle={this.handleDle.bind(this,index)}
					/>
				})
	}
	render() {
		console.log('1 : App render...')
		return (
			<div className = "app">
				<input 
					onChange={this.handleVal}
					value={this.state.val}
				/>
				<button 
					style = {{width:100,height:30,marginLeft:10,background:'#f88'}}
					onClick={this.handleAdd}
				>新增</button>
				<ul>
					{
						this.getItem()	
					}
				</ul>
			</div>


		)
	}
}

export default App;