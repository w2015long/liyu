/*
const a = 1;
const b= 2;
export {a,b}
*/

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
		// console.log('>>>',this.state.val)
		/*
		this.setState({
			list:[...this.state.list,this.state.val],
			val:''
		})
		*/
		/*
		this.setState(()=>{
			return {
				list:[...this.state.list,this.state.val],
				val:''
			}

		})
		*/	
		/*	
		this.setState(()=>({
				list:[...this.state.list,this.state.val],
				val:''
		}))
		*/	
		
		this.setState(preState=>({
				list:[...preState.list,preState.val],
				val:''
		}))	
	}	
	handleVal(ev){
		// console.log(this)
		// console.log(ev.target.value)
		/*
		this.setState({
			val:ev.target.value
		})
		*/
		const value = ev.target.value;
		this.setState(preState=>({
			val:value
		}))
	}

	handleDle(index){
		// console.log(index)
		/*
		const list = [...this.state.list];
		list.splice(index,1);
		// console.log(list)
		//删除后再更新一遍state里的值
		
		this.setState({
			list
		}) 
		*/
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
		return (
			// 在返回组件内容时,如果不想有多余的标签,可以使用React.Fragment来代替html标签
			<div className = "app">
				<input onChange={this.handleVal} value={this.state.val}/>
				{/*行间样式*/}
				<button 

					style = {{width:100,height:30,marginLeft:10,background:'#f88'}}
					onClick={this.handleAdd}
				>新增</button>
				<ul>
					{
						/*
						// console.log(this.state.list)
						this.state.list.map((item,index)=>{
							
							return(

								<li
								key = {index}
								onClick = {this.handleDle.bind(this,index)}
								>{item}</li>

							)
							
							return <Item 
								key = {index}
								content={item}
								handleDle={this.handleDle.bind(this,index)}
							/>
						})
						*/
					this.getItem()	

					}
				</ul>
			</div>


		)
	}
}

export default App;