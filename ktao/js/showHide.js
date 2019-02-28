;(function($){
	function init($elem,hiddenCB){
		if($elem.is(':hidden')){
			$elem.data('status','hidden');
			typeof hiddenCB == 'function' && hiddenCB();
		}else{
			$elem.data('status','shown');
		}
		
	};
	function show($elem,callback){
		if($elem.data('status') == 'show') return ;
		if($elem.data('status') == 'shown') return ;
		$elem.data('status','show').trigger('show');
		callback();
	};
	function hide($elem,callback){
		if($elem.data('status') == 'hidden') return ;
		if($elem.data('status') == 'hide') return ;
		$elem.data('status','hide').trigger('hide');
		callback();
	}
	var salient = {
		init:init,
		show:function($elem){
			show($elem,function(){
				$elem.show();
				$elem.trigger('shown').data('status','shown');				
			});
		},
		hide:function($elem){

			hide($elem,function(){
				$elem.hide();
				$elem.trigger('hidden').data('status','hidden');				
			});			
		}
	}
	var js = {
		fade:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'fadeIn');
			},
			hide:function($elem){
				js._hide($elem,'fadeOut');
			}		
		},
		slideDownUp:{
			init:function($elem){
				js._init($elem);
			},
			show:function($elem){
				js._show($elem,'slideDown');
			},
			hide:function($elem){
				js._hide($elem,'slideUp');
			}
		},
		slideLeftRight:{
			init:function($elem){
				//1.初始化
				js._customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0					
				});
			},
			show:function($elem){
				js._customShow($elem);		
			},
			hide:function($elem){
				js._customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0					
				});				
			}			

		},
		fadeSlideLeftRight:{
			init:function($elem){
				js._customInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0						
				});
			},
			show:function($elem){
				js._customShow($elem);			
			},
			hide:function($elem){
				js._customHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0						
				});		
			}			

		},				
	}  
	js._init = function($elem){
		$elem.removeClass('transition');
		init($elem);		
	}
	js._show = function($elem,mode){
		show($elem,function(){
			$elem.stop()
			[mode](function(){
				$elem.trigger('shown').data('status','shown');
			})					
		});		
	}
	js._hide = function($elem,mode){
		hide($elem,function(){
			$elem.stop()
			[mode](function(){
				$elem.trigger('hidden').data('status','hidden');
			})						
		});		
	}
	js._customInit = function($elem,options){
		$elem.removeClass('transition');
		//1.获取初始值	
		var styles = {};
		for(var key in options){
			//key = options[key]
			styles[key] = $elem.css(key);
		}
		//2.保存初始值	
		$elem.data('row',styles);
		//3初始化	
		init($elem,function(){
			$elem.css(options);
		});	
	}
	js._customShow = function($elem){
		show($elem,function(){
			$elem.show();//display:block
			$elem.stop()
			.animate($elem.data('row'),function(){
				$elem.trigger('shown').data('status','shown');
			});					
		});			
	}
	js._customHide = function($elem,options){
		hide($elem,function(){
			$elem.stop()
			.animate(options,function(){
				$elem.hide();//display:none;
				$elem.trigger('hidden').data('status','hidden');
			});						
		});		
	}


	function getShowHide($elem,options){//获取使用以上那种方法
		//默认方法
		var showHideFn = salient;
		//传入方法mode有
		//[fade,slideDownUp,slideLeftRight,fadeSlideLeftRight]
		if(options.js){
			showHideFn = js[options.mode];
		}
		//初始化
		showHideFn.init($elem);
		//返回方法
		return {
			show:showHideFn.show,
			hide:showHideFn.hide
		}
	}
	//1.注册插件
	$.fn.extend({
		showHide:function(options){
			//默认配置
			var DEFAULTS = {js:true,mode:'fade'};
			//1.隐式迭代
			
			return this.each(function(){
				var $elem = $(this);
				var showHideObj = $elem.data('objShowHide');

				//第一次调用先把showHideObj存起来
				if(!showHideObj){//单例模式
					options = $.extend({},DEFAULTS,options);
					showHideObj = getShowHide($elem,options);
					// console.log(showHideObj)
					showHideObj = $elem.data('objShowHide',showHideObj);
				}
				//第二次调用(传入的方法)
				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($elem);
				}
			})
		}
	});	
})(jQuery);