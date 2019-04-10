

import React,{Component,Fragment} from 'react';
import './App.css';
import Item from './Item.js';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			list:['吃饭','睡觉','打豆豆'],
			val:''
		}
		this.handleVal = this.handleVal.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleAdd(ev){
	/*
	由于setState是一个异步方法,如果需要获取最新的Dom,
	需要写在setState方法的第二个回调函数中
	 */		
		this.setState(preState=>({
				list:[...preState.list,preState.val],
				val:''
		}),()=>{
			console.log(this.ul.querySelectorAll('li'))	
		})
		// console.log(this.ul.querySelectorAll('li'))	
	}	
	handleVal(ev){

		// const value = ev.target.value;
		const value = this.input.value
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
		console.log('1 : App remder')
		return (
			<div className = "app">
				<input 
					onChange={this.handleVal}
					value={this.state.val}
					ref = {(input)=>{
						//console.log(input);
						this.input = input
					}}
				/>
				<button 
					style = {{width:100,height:30,marginLeft:10,background:'#f88'}}
					onClick={this.handleAdd}
				>新增</button>
				<ul
					ref = {ul=>{this.ul = ul}}
				>
					{
						this.getItem()	
					}
				</ul>
			</div>


		)
	}
}

export default App;