;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.elem = $elem;
		this.options = options;
		this.searchBtn = $elem.find('.search-btn');
		this.searchForm = $elem.find('.search-form');
		this.searchInput = $elem.find('.search-keyword');
		this.layer = $elem.find('.search-layer');

		this.isLoaded = false;
		this.timer = null;
		this.jqXHR = null;
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
			// this.searchInput.on('input',$.proxy(this.getData,this));
			this.searchInput.on('input',function(){
				//防止多次获取后台数据 设置一个延时定时器
				if(this.options.getDataDelay){
					clearTimeout(this.timer)
					this.timer = setTimeout($.proxy(this.getData,this),this.options.getDataDelay);
				}else{
					this.getData();
				}
			}.bind(this));
			//点击其他隐藏下拉
			$(document).on('click',$.proxy(this.hideLayer,this));
			//获取焦点显示
			this.searchInput.on('focus',$.proxy(this.showLayer,this));
			//阻止获取焦点时的click事件冒泡
			this.searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			//事件代理下拉层每一项点击事件
			// this.layer.delegate('selector','eventType', function(event) {selector});
			var _this = this;
			this.layer.on('click','.search-layer-hots',function(){
				// console.log(this)
				//1.获取下拉层当前点击值
				var val = $(this).html();
				//2.下拉层点击值赋到input框
				_this.setInputVal(val);
				//3.触发提交事件
				_this.searchForm.trigger('submit');
			});
		},
		appendHtml:function(html){
			this.layer.html(html);

			this.isLoaded = !!html;//如果html为空  此值为false
		},
		showLayer:function(){
			
			//若isLoaded 为false 就直接return 不再往下走
			if(!this.isLoaded) return;
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
				//数据为空 不应该发送ajax请求 直接return 不在朝下走
				return ;
			}
			console.log('will get data....');
			//保证获取最新的ajax请求
			if(this.jqXHR){
				this.jqXHR.abort();
			}
			this.jqXHR = $.ajax({
				url:this.options.url+inputVal,
				dataType:'jsonp',
				json:'callback'
			})
			.done(function(data){
				this.elem.trigger('readData',[data]);
			}.bind(this))
			.fail(function(err){

				this.elem.trigger('readNoData');
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
			}.bind(this));
		},
		setInputVal:function(val){
			//替换里边的html标签
			this.searchInput.val(val.replace(/<[^<>]+>/g,''));
		}
	}
	Search.DEFAULTS = {
		autoComplete:true,
		url:'https://suggest.taobao.com/sug?code=utf-8&q=',
		js:true,
		mode:'slideDownUp',
		getDataDelay:200
	};


	//注册插件
	$.fn.extend({
		search:function(options,val){
			return this.each(function(){
				var $elem = $(this);
				var searchObj = $elem.data('search');
				if(!searchObj){//单例模式
					options = $.extend({},Search.DEFAULTS,options);
					searchObj = new Search($elem,options);
					$elem.data('search',searchObj);
				}
				if(typeof searchObj[options] == 'function'){
					searchObj[options](val);
				}
				
				
			});
		}
	})
})(jQuery);