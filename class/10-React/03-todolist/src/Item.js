
import React ,{Component} from 'react'
import PropTypes from 'prop-types'

class Item extends Component{
	constructor(props){
		console.log('02 Item constructor')
		super(props);
	}
/*
	static getDerivedStateFromProps(nextProps, prevState){
		console.log('getDerivedStateFromProps (nextProps, prevState)',nextProps, prevState)
		return {
			// list:['打豆豆']
		}
	}
	componentDidMount(){
		//组件挂载完毕执行,多用于发送ajax获取数据
		console.log(' Item componentDidMount')
	}
	*/
	shouldComponentUpdate(nextProps,nextState){
		console.log('Item shouldComponentUpdate',nextProps,nextState);
		// console.log(this.props.content)
		if(nextProps.content != this.props.content){
			return true
		}else{
			return false
		}
		
	}
	/*----------------------update--------------------------*/
/*
	static getDerivedStateFromProps(props,state){
		console.log('Item getDerivedStateFromProps (props,state)',props,state);
		return {}
	}
	shouldComponentUpdate(nextProps,nextState){
		console.log('Item shouldComponentUpdate',nextProps,nextState);
		// return false
		return true
	}
	getSnapshotBeforeUpdate(prevProps,prevState){
		console.log('Item getSnapshotBeforeUpdate',prevProps,prevState);
		return 'custom snapshot'
	}
	componentDidUpdate(prevProps, prevState,snapshot){
		console.log('Item componentDidUpdate',prevProps, prevState,snapshot)
	}



	componentWillUnmount(){
		//卸载,当组件从 DOM 中移除时会调用
		console.log('Item componentWillUnmount')
	}
*/
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