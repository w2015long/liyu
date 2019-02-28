;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		//2.初始化
		this.init();
	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			
		}
	}
	Search.DEFAULTS = {

	};


	//注册插件
	$.fn.extend({
		search:function(options){
			return this.each(function(){
				var $elem = $(this);
				var searchObj = $elem.data('search');
				if(!searchObj){//单例模式
					options = $.extend({},Search.DEFAULTS,options);
					searchObj = new search($elem,options);
					$elem.data('search',searchObj);
				}
				if(typeof searchObj[options] == 'function'){
					searchObj[options]();
				}
				
				
			});
		}
	})
})(jQuery);