

import React,{Component,Fragment} from 'react';
import './App.css';
import Todolist from './pages/todolist'

//容器组件
class App extends Component{

	render() {
		return (
			<div className = "app">
				<Todolist/>
			</div>


		)
	}
}


export default App