/**
 * [匀速或减速动画]
 * @param  {[object]}  	obj     [Dom对象]
 * @param  {[object]}  options  [属性和目标值的对象]
 * @param  {Boolean}  isLinear 	[是否做线性动画]
 * @param  {function}  endFn 	[动画结束后执行的函数]
 */
function animate (obj,options,isLinear,endFn) {
	//默认为线性动画
	(isLinear == undefined) && (isLinear = true);
	//防止多次操作开启多个定时器,每次操作前就关闭定时器
	clearInterval(obj.timer);
	var step=null;
	
	obj.timer=setInterval(function(){

		var isStopAll=true;
		for(var attr in options){
			var isStopcurrent=false;
			var current=parseFloat(getComputedStyle(obj, false)[attr]);
				
			if(attr=='opacity'){
				current=Math.round(current*100);
			}			
			//线性动画
			if(isLinear){
				//线性速度处理
				if(current>options[attr]){
					step=-10;
				}else{
					step=10;
				}
				//线性终止条件处理
				if(Math.abs(options[attr]-current)<Math.abs(step)){
					if(attr=='opacity'){
						obj.style[attr]=options[attr]/100;
					}else{
						obj.style[attr]=options[attr]+'px';
					}
					isStopcurrent=true;
				}
			//非线性动画
			}else{
				//非线性速度处理
				step=(options[attr]-current)/10
				step= step>0 ? Math.ceil(step) : Math.floor(step);
				//非线性终止条件处理
				if(!step){
					isStopcurrent=true;
				}
			}
			//线性与非线性共同点
			if(!isStopcurrent){
				if(attr=='opacity'){
					obj.style[attr]=(current+step)/100;
				}else{
					obj.style[attr]=current+step+'px';
				}
			}
			//如果目标值不等于当前值就不终止所有动画
			if(options[attr] != current){
				isStopAll=false;
			}

		}
		if(isStopAll){
			clearInterval(obj.timer);
			typeof endFn == 'function' && endFn();
		}
	},30);

}