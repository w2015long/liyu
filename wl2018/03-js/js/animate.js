/**
 * @param  {[object]} obj     {DOM节点对象}
 * @param  {[string]} attr    {属性名}
 * @param  {[number]} target  {目标值}
 */
function animate(obj,attr,target){
	//防止同时开启多个定时器,在设置定时器前需要清除定时器
	clearInterval(obj.timer)
	//定义变量iSpeed
	var iSpeed=null;
	obj.timer=setInterval(function(){
		var current=parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr=='opacity'){
			current=Math.round(current*100);
			console.log(current);
		}		
		console.log('当前第'+obj.timer+'个定时器')
		if(current>target){
			iSpeed = -10;
		}else{
			iSpeed = 10;
		}			
		if(Math.abs(target-current)<Math.abs(iSpeed)){
			if(attr=='opacity'){
				obj.style.opacity =	target/100 
			}else{
				obj.style[attr]=target+'px'
			}
			clearInterval(obj.timer);
		}else{
			if(attr=='opacity'){
				obj.style.opacity=(current+iSpeed)/100;
			}else{
				obj.style[attr]=current+iSpeed+'px';
			}
		}
	},30)
}		