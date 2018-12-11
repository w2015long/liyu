	/**
	 * [匀速或减速动画]
	 * @param  {[object]}  obj      [Dom对象]
	 * @param  {[string]}  attr     [对象的属性]
	 * @param  {[number]}  target   [属性的目标值]
	 * @param  {Boolean}  isLinear 	[是否做线性动画]
	 * @param  {function}  fnEnd 	[动画结束后执行的函数]
	 */
/*匀速动画与减速缓冲动画只有速度和动画终止条件不同*/	
	function animate(obj,attr,target,isLinear,fnEnd){
		//设置默认为匀速动画
		if(isLinear==undefined){
			isLinear=true;
		}
		//防止多次操作开启多个定时器,每次操作前就关闭定时器
		clearInterval(obj.timer);

		var iSpeed=null;
		obj.timer=setInterval(function(){
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
				if(current>target){
					iSpeed = -10;
				}else{
					iSpeed = 500;
				}
			//匀速动画终止条件处理
					
				if(Math.abs(target-current)<Math.abs(iSpeed)){//当目标值与当前值的差不够一个步长时，一步到位
					if(attr=='opacity'){
						obj.style.opacity =	target/100 
					}else{
						obj.style[attr]=target+'px'
					}
					isStopCurrent=true;
				}				

			//缓冲减速动画
			}else{
			//确定减速动画的速度
				iSpeed=(target-current)/10;  
				iSpeed = iSpeed>0 ? Math.ceil(iSpeed) :Math.floor(iSpeed);
			//减速动画终止条件处理
				if(!iSpeed){
					isStopCurrent=true;
				}				
			}
			if(isStopCurrent){//如果终止当前动画，清除定时器
				clearInterval(obj.timer);
				/*
				if(typeof fnEnd == 'function'){
					fnEnd();
				}*/
				//与逻辑运算 A不成立返回A A成立返回B
				typeof fnEnd == 'function' && fnEnd();
				
			}
			else{//不终止动画,就运动
				if(attr=='opacity'){
					obj.style.opacity=(current+iSpeed)/100;
				}else{
					obj.style[attr]=current+iSpeed+'px';
				}
			}					
		},30)

	}