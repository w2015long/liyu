

import React,{Component,Fragment} from 'react';
import {
	// HashRouter as Router, 
	BrowserRouter as Router,
	Route,
	Link

} from "react-router-dom"


import './App.css';


class Index extends Component{
	render(){
		return <h1>this is Index page </h1>
	}
}

class About extends Component{
	render(){
		return <h2>this is About page </h2>
	}
}
// class Users extends Component{
// 	render(){
// 		return <h3>this is Users page </h3>
// 	}
// }

class App extends Component{

	render() {
		return (
			<Router>
				<div className = "app">
			       <nav>
			          <ul>
			            <li>
			              <Link to="/">Home</Link>
			            </li>
			            <li>
			              <Link to="/about/">About</Link>
			            </li>
			            <li>
			              <Link to="/users/">Users</Link>
			            </li>
			          </ul>
			        </nav>



			        <Route path="/" exact component={Index} />
			        <Route path="/about/" component={About} />

			        <Route path="/users/" render={() => <h3>Please select a topic</h3>} />

				</div>
			</Router>


		)
	}
}


export default App