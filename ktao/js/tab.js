;(function($){

	function Tab($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.tabItems = this.$elem.find('.tab-item');
		this.tabPanels = this.$elem.find('.tab-panel');
		this.now = this._correctIndex(options.activeIndex);
		this.timer = null;
		//2.初始化
		this.init();
	}
	Tab.prototype = {
		constructor:Tab,
		init:function(){
			var _this = this;
			//1.初始化
			this.tabItems.eq(this.now).addClass('tab-item-active');
			this.tabPanels.eq(this.now).show();
			//传递消息
			/*
			this.tabPanels.on('show shown hide hidden',function(ev){
				console.log(_this.tabPanels.index(this),ev.type);
			})
			*/
			this.$elem.trigger('tab-show',[this.now,this.tabPanels[this.now]]);
			this.tabPanels.on('show',function(ev){
				// console.log(_this.tabPanels.index(this),ev.type);
				_this.$elem.trigger('tab-show',[_this.tabPanels.index(this),this])
			})		
			//2.初始化显示隐藏插件
			this.tabPanels.showHide(this.options);
			//3.监听事件
			var eventName = this.options.eventName == 'click' ? 'click':'mouseenter';
			this.$elem.on(eventName,'.tab-item',function(){
				var index = _this.tabItems.index(this)
				_this._toggle(index);
			})
			//自动播放
			if(this.options.interval){
				this.autoplay();
				//鼠标放上暂停 离开自动播放
				this.$elem.hover($.proxy(this.pause,this),$.proxy(this.autoplay,this));
			}			
		},
		_toggle:function(index){
			if(this.now == index) return ;
			//隐藏当前
			this.tabItems.eq(this.now).removeClass('tab-item-active');
			this.tabPanels.eq(this.now).showHide('hide');
			//显示下一页
			this.tabItems.eq(index).addClass('tab-item-active');
			this.tabPanels.eq(index).showHide('show');	

			this.now = index;		
		},
		_correctIndex:function(index){
			if(index<0) return this.tabItems.length - 1;
			if(index>this.tabItems.length - 1) return 0;
			return index;
		},
		autoplay:function(){
			this.timer = setInterval(function(){
				this.controls.eq(1).trigger('click');
			}.bind(this),this.options.interval);
		},
		pause:function(){
			clearInterval(this.timer);
		}

	}
	Tab.DEFAULTS = {
		js:true,
		mode:'fade',
		activeIndex:0,
		interval:0,
		eventName:'click'
	};


	//注册插件
	$.fn.extend({
		tab:function(options){
			return this.each(function(){
				var $elem = $(this);
				var tabObj = $elem.data('tab');
				if(!tabObj){//单例模式
					options = $.extend({},Tab.DEFAULTS,options);
					tabObj = new Tab($elem,options);
					$elem.data('tab',tabObj);
				}
				if(typeof tabObj[options] == 'function'){
					tabObj[options]();
				}
				
				
			});
		}
	})
})(jQuery);