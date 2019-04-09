/*
const a = 1;
const b= 2;
export {a,b}
*/

import React,{Component,Fragment} from 'react';
import './App.css'

class App extends Component{
	handleVal(ev){
		console.log(ev.target.value)
	}
	render() {
		return (
			// 在返回组件内容时,如果不想有多余的标签,可以使用React.Fragment来代替html标签
			<div className = "app">
				<input onChange={this.handleVal}/>
				<button>新增</button>
				<ul>
					<li></li>
					<li></li>
				</ul>
			</div>


		)
	}
}

export default App;