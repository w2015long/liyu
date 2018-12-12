function animate (obj,options,isLinear,endFn) {
	clearInterval(obj.timer);
	var step=null;
	
	obj.timer=setInterval(function(){
		var isStopAll=true;
		for(var attr in options){
			var isStopcurrent=false;
			var current=parseFloat(getComputedStyle(obj, false)[attr]);
			//线性动画
			if(isLinear){
				if(attr=='opacity'){
					current=Math.round(current*100);
				}
				

			//非线性动画
			}else{






			}




		}
		if(isStopAll){
			clearInterval(obj.timer);
			typeof endFn == 'function' && endFn();
		}
	},30);







}