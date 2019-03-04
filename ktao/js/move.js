;(function($){
//公共函数
	function init($elem){
		this.$elem = $elem;
		this.$elem.removeClass('transition');
		this.currentX = parseFloat(this.$elem.css('left'));
		this.currentY = parseFloat(this.$elem.css('top'));		
	}
	function shift(x,y,callback){
		x = (typeof x == 'number') ? x : this.currentX;
		y = (typeof y == 'number') ? y : this.currentY;
		if(this.currentX == x && this.currentY == y) return;
		this.$elem.trigger('move');
		typeof callback == 'function' && callback();
		this.currentX = x;
		this.currentY = y;
	}


	function Salient($elem){
		init.call(this,$elem);
	}
	Salient.prototype = {
		constructor:Salient,
		to:function(x,y){

			shift.call(this,x,y,function(){
				this.$elem.css({
					left:x,
					top:y
				});
				this.$elem.trigger('moved');				
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	};
	/*----------------------------------------------------*/
	function Js($elem){
		init.call(this,$elem);
	}
	Js.prototype = {
		constructor:Js,
		to:function(x,y){

			shift.call(this,x,y,function(){
				this.$elem
				.stop()
				.animate({
					left:x,
					top:y
				},function(){
					this.$elem.trigger('moved');
				}.bind(this));				
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	};	
	/*----------------------------------------------*/
	function getMove($elem,options){//获取使用以上那种方法
		//默认方法
		var moveFn = null;
		//传入方法mode有
		//[to,x,y]
		if(options.js){//使用js动画
			moveFn = new Js($elem);
		}else{
			moveFn = new Salient($elem);
		}
		//返回方法
		/*
		return {
			to:moveFn.to.bind(moveFn),
			x:moveFn.x.bind(moveFn),
			y:moveFn.y.bind(moveFn)
		}
		*/
		return {
			to:$.proxy(moveFn.to,moveFn),
			x:$.proxy(moveFn.x,moveFn),
			y:$.proxy(moveFn.y,moveFn)
		}	
	}
	//1.注册插件
	$.fn.extend({
		move:function(options,n1,n2){
			//默认配置
			var DEFAULTS = {js:true};
			//1.隐式迭代
			return this.each(function(){
				var $elem = $(this);
				var moveObj = $elem.data('objmove');

				//第一次初始化先把moveObj存起来
				if(!moveObj){//单例模式
					options = $.extend({},DEFAULTS,options);
					moveObj = getMove($elem,options);
					// console.log(moveObj)
					moveObj = $elem.data('objmove',moveObj);
				}
				//第二次调用(传入的方法)
				if(typeof moveObj[options] == 'function'){
					moveObj[options](n1,n2);
				}
			})
		}
	});			
})(jQuery);