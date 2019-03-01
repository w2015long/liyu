;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.searchBtn = $elem.find('.search-btn');
		this.searchForm = $elem.find('.search-form');
		this.searchInput = $elem.find('.search-keyword');
		//2.初始化
		this.init();
	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			//1.绑定事件
			this.searchBtn.on('click',$.proxy(this.submit,this));
		},
		submit:function(){
			if(getInputVal() == ''){
				//input为空就阻止默认提交
				return false;
			}
			this.searchForm.trigger('submit');
		},
		getInputVal:function(){
			return $.trim(this.searchInput.val());
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
					searchObj = new Search($elem,options);
					$elem.data('search',searchObj);
				}
				if(typeof searchObj[options] == 'function'){
					searchObj[options]();
				}
				
				
			});
		}
	})
})(jQuery);