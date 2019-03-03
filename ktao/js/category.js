;(function($){
	function Category($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;

		//2.初始化
		this.init();
	}
	Category.prototype = {
		constructor:Category,
		init:function(){
			if(this.options.slide){//划入划出

			}else{//淡入淡出

			}
		},

	}
	Category.DEFAULTS = {
		js:true,
		mode:'fade',
		slide:false
	};


	//注册插件
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $elem = $(this);
				var categoryObj = $elem.data('category');
				if(!categoryObj){//单例模式
					options = $.extend({},Category.DEFAULTS,options);
					categoryObj = new Category($elem,options);
					$elem.data('category',categoryObj);
				}
				if(typeof categoryObj[options] == 'function'){
					categoryObj[options]();
				}
				
				
			});
		}
	})
})(jQuery);