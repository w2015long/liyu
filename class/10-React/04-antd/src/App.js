

import React,{Component,Fragment} from 'react';
import './App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

class App extends Component{
	constructor(props){
		super(props);
	}

	render() {
		console.log('1 : App render...')
		return (
			<div className = "app">
				<DatePicker />
			</div>


		)
	}
}

export default App;