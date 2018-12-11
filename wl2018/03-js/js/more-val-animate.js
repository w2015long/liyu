/**
 * [匀速或减速动画]
 * @param  {[object]}  	obj     [Dom对象]
 * @param  {[object]}  options  [属性和目标值的对象]
 * @param  {Boolean}  isLinear 	[是否做线性动画]
 * @param  {function}  fnEnd 	[动画结束后执行的函数]
 */
/*匀速动画与减速缓冲动画只有速度和动画终止条件不同*/	
function animate(obj,options,isLinear,fnEnd){
	//设置默认为匀速动画
	if(isLinear==undefined){
		isLinear=true;
	}
	//防止多次操作开启多个定时器,每次操作前就关闭定时器
	clearInterval(obj.timer);

	var iSpeed=null;
	obj.timer=setInterval(function(){
		//代表是否终止所有的动画
		var isStopAll=true;
		for(var attr in options){
			//isStopCurrent是否终止当前动画，每次动画前定义为false代表不终止当前动画
			var isStopCurrent=false;
			var current=parseFloat(getComputedStyle(obj,false)[attr]);
			if(attr=='opacity'){
				current = Math.round(current*100);
			}
			/*对速度做判断看分别是什么动画*/
			//线性匀速动画的处理
			if(isLinear){
			//确定匀速动画的速度
				if(current>options[attr]){
					iSpeed = -10;
				}else{
					iSpeed = 10;
				}
				//匀速动画终止条件处理
				if(Math.abs(options[attr]-current)<Math.abs(iSpeed)){//当目标值与当前值的差不够一个步长时，一步到位
					if(attr=='opacity'){
						obj.style.opacity =	options[attr]/100 
					}else{
						obj.style[attr]=options[attr]+'px'
					}
					//当前动画已完成，终止当前动画
					isStopCurrent=true;
				}else{
					//不终止当前动画，也不能终止所有动画
					isStopAll=false;
				}				

			//缓冲减速动画
			}else{
			//确定减速动画的速度
				iSpeed=(options[attr]-current)/10;  
				iSpeed = iSpeed>0 ? Math.ceil(iSpeed) :Math.floor(iSpeed);
			//减速动画终止条件处理
				if(!iSpeed){
					//代表终止当前的动画
					isStopCurrent=true;
				}else{
					//代表当前的动画还没有结束,所以不能终止所有的动画
					isStopAll=false;
				}				
			}
			//线性与非线性动画运动处理
			if(!isStopCurrent){//不终止当前动画,就运动
				if(attr=='opacity'){
					obj.style.opacity=(current+iSpeed)/100;
				}else{
					obj.style[attr]=current+iSpeed+'px';
				}	
			}
		}
		//如果此条件不满足，继续循环遍历需要变化的对象进行运动
		//出了遍历for循环，满足当前终止条件，就清除定时器
		if(isStopAll){//如果终止所有动画，清除定时器
			clearInterval(obj.timer);
			//动画执行完毕后的执行函数
			//与逻辑运算 A不成立返回A A成立返回B
			typeof fnEnd == 'function' && fnEnd();			
		}						
	},30)
}
