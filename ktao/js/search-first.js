;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.elem = $elem;
		this.options = options;
		this.searchBtn = $elem.find('.search-btn');
		this.searchForm = $elem.find('.search-form');
		this.searchInput = $elem.find('.search-keyword');
		this.layer = $elem.find('.search-layer');
		//2.初始化
		this.init();
	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			//1.绑定事件
			this.searchBtn.on('click',$.proxy(this.submit,this));
			this.searchInput.on('input',$.proxy(this.getData,this));
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
		},
		getData:function(){
			//用户动态获取数据
			var url = 'https://suggest.taobao.com/sug?code=utf-8&q='+this.getInputVal()
			+'&_ksTS=1551425739455_330&callback=jsonp331&k=1&area=c2c&bucketid=11';
			$.ajax({
				url:url,
				dataType:'jsonp',
				json:'callback'
			})
			.done(function(data){
				var html = '';
				for(var i=0;i<data.result.length;i++){
					html += '<li class="search-layer-hots">'+data.result[i][0]+'</li>'
				}
				this.layer.html(html).show();
			}.bind(this))
		},
		showLayer:function(){

		},
		hideLayer:function(){
			
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