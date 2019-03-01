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
		if(this.options.autoComplete){
			this.autoComplete();
		}
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
		},
		autoComplete:function(){
			//初始化显示隐藏下拉层
			this.layer.showHide(this.options);
			//监听input框事件
			this.searchInput.on('input',$.proxy(this.getData,this));
			//点击其他隐藏下拉
			$(document).on('click',$.proxy(this.hideLayer,this));
			//获取焦点显示
			this.searchInput.on('focus',$.proxy(this.showLayer,this))
			//阻止获取焦点时的click事件冒泡
			this.searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			//事件代理下拉层每一项点击事件
		},
		appendHtml:function(html){
			this.layer.html(html);
		},
		showLayer:function(){
			this.layer.showHide('show');
		},
		hideLayer:function(){
			this.layer.showHide('hide');
		},		
		getData:function(){
			var inputVal = this.getInputVal();
			if(inputVal == ''){
				//数据为空 下拉层数据也为空
				this.appendHtml('');
				//数据为空隐藏下拉层
				this.hideLayer();
				return ;
			}
			//用户动态获取数据
			// var url = 'https://suggest.taobao.com/sug?code=utf-8&q='+this.getInputVal()
			$.ajax({
				url:this.options.url+inputVal,
				dataType:'jsonp',
				json:'callback'
			})
			.done(function(data){
				//由后台数据生成html
				var html = '';
				for(var i=0;i<data.result.length;i++){
					html += '<li class="search-layer-hots">'+data.result[i][0]+'</li>'
				}
				//加载下拉层
				this.appendHtml(html);
				//根据数据是否显示下拉层
				if(html == ''){
					this.hideLayer();
				}else{
					this.showLayer();
				}
				
			}.bind(this))
			.fail(function(err){
				this.appendHtml('');
				this.hideLayer();
			}.bind(this))
			.always(function(){
				
			})
		}
	}
	Search.DEFAULTS = {
		autoComplete:true,
		url:'https://suggest.taobao.com/sug?code=utf-8&q=',
		js:true,
		mode:'slideDownUp'
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