
import React ,{Component} from 'react'
import PropTypes from 'prop-types'

class Item extends Component{
	constructor(props){
		console.log('02 Item constructor')
		super(props);
	}
	componentWillUnmount(){
		//卸载,当组件从 DOM 中移除时会调用
		console.log('Item componentWillUnmount')
	}
	render(){
		console.log("2 : Item render...")
		const {content,handleDle} = this.props
		return (
			// 父组件的方法以及值都通过 this.props.属性名  来接收
			
			<li onClick = {handleDle}>
				{content}
			</li>

		)
	}

}


Item.propTypes = {
	content:PropTypes.string.isRequired,
	handleDle:PropTypes.func
}

Item.defaultProps = {
	content:'打豆豆'
}

export default Item;