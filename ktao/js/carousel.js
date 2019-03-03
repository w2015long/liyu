;(function($){
	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.activeIndex;
		this.carouselItems = this.$elem.find('.carousel-item');
		this.btns = this.$elem.find('.btns .btn-item');
		this.controls = this.$elem.find('.control');
		this.timer = null;
		//2.初始化
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			if(this.options.slide){//划入划出

			}else{//淡入淡出
				//隐藏所有
				this.$elem.addClass('fade');
				//默认显示
				this.carouselItems.eq(this.now).show();
				//初始化显示隐藏插件
				this.carouselItems.showHide(this.options);
				//显示默认的指示按钮
				this.btns.eq(this.now).addClass('active');

				//监听左右按钮事件
				this.$elem
				.hover(function(){//显示隐藏左右按钮
					this.controls.show();
				}.bind(this),function(){
					this.controls.hide();
				}.bind(this))
				.delegate('.control-left', 'click', function(ev) {//(事件代理)
					this._fade(this._correctIndex(this.now-1));	
				}.bind(this))
				.delegate('.control-right', 'click', function(ev) {
					this._fade(this._correctIndex(this.now+1));	
				}.bind(this));
				//监听底部按钮事件
				var _this = this;
				this.btns.on('click',function(){
					_this._fade(_this.btns.index(this));
				});
				//自动播放
				if(this.options.interval){
					this.autoplay();
					//鼠标放上暂停 离开自动播放
					this.$elem.hover($.proxy(this.pause,this),$.proxy(this.autoplay,this));
				}

			}
		},
		_fade:function(index){
			//防止多次点击同一个index 再次触发事件
			if(this.now == index) return;
			// console.log('will fade....');
			//1.隐藏当前
			this.carouselItems.eq(this.now).showHide('hide');
			this.btns.eq(this.now).removeClass('active');
			//2.显示下一张
			this.carouselItems.eq(index).showHide('show');
			this.btns.eq(index).addClass('active');
			this.now = index;
		},
		_correctIndex:function(index){
			if(index<0) return this.carouselItems.length - 1;
			if(index>this.carouselItems.length - 1) return 0;
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
	Carousel.DEFAULTS = {
		js:true,
		mode:'fade',
		slide:false,
		activeIndex:2,
		interval:1000
	};


	//注册插件
	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				var $elem = $(this);
				var carouselObj = $elem.data('carousel');
				if(!carouselObj){//单例模式
					options = $.extend({},Carousel.DEFAULTS,options);
					carouselObj = new Carousel($elem,options);
					$elem.data('carousel',carouselObj);
				}
				if(typeof carouselObj[options] == 'function'){
					carouselObj[options]();
				}
				
				
			});
		}
	})
})(jQuery);