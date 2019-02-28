;(function($){
	function Dropdown($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.layer = $elem.find('.dropdown-layer');
		//2.初始化
		this.init();
		//3.绑定事件
	}
	Dropdown.prototype.init = {
		constructor:Dropdown,
		init:function(){
			//1.初始化显示隐藏的元素
			
			
			
		}
	}
	Dropdown.DEFAULTS = {js:true,mode:'slideDownUp'};


	//注册插件
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $elem = $(this);
				options = $extend({},Dropdown.DEFAULTS,options);
				new Dropdown($elem,options);
			});
		}
	})
})(jQuery);