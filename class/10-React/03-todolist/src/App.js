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
	}
	handleAdd(ev){
		// console.log('>>>',this.state.val)
		this.setState({
			list:[...this.state.list,this.state.val],
			val:''
		})

	}	
	handleVal(ev){
		// console.log(this)
		// console.log(ev.target.value)
		this.setState({
			val:ev.target.value
		})
	}

	handleDle(index){
		// console.log(index)
		const list = [...this.state.list];
		list.splice(index,1);
		// console.log(list)
		//删除后再更新一遍state里的值
		this.setState({
			list
		}) 
		
	}
	render() {
		return (
			// 在返回组件内容时,如果不想有多余的标签,可以使用React.Fragment来代替html标签
			<div className = "app">
				<input onChange={this.handleVal.bind(this)} value={this.state.val}/>
				<button onClick={this.handleAdd.bind(this)}>新增</button>
				<ul>
					{
						// console.log(this.state.list)
						this.state.list.map((item,index)=>{
							/*
							return(

								<li
								key = {index}
								onClick = {this.handleDle.bind(this,index)}
								>{item}</li>

							)
							*/
							return <Item 
								key = {index}
								content={item}
								handleDle={this.handleDle.bind(this,index)}
							/>
						})

					}
				</ul>
			</div>


		)
	}
}

export default App;