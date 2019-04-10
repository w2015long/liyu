
import React ,{Component} from 'react';

class Item extends Component{
	constructor(props){
		super(props);
	}
	/*
父组件给子组件传递参数
	父组件定义属性并赋值
	子组件通过 this.props.属性名  来接收
	注意点
		this.props存放组件的外部数据	
	 */
	render(){
		return (
			// 父组件的方法以及值都通过 this.props.属性名  来接收
			<li onClick = {this.props.handleDle}>
				{this.props.content}
			</li>

		)
	}

}





export default Item;