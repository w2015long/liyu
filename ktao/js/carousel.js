;(function($){

	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.activeIndex;
		this.carouselItems = this.$elem.find('.carousel-item');
		this.btns = this.$elem.find('.btns .btn-item');
		this.controls = this.$elem.find('.control');
		this.itemWidth = this.$elem.width();
		this.timer = null;
		//2.初始化
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			
			/*--------------------------------*/
			var _this = this;

			//显示默认的指示按钮
			this.btns.eq(this.now).addClass('active');
			this.$elem
			.hover(function() {
				this.controls.show();
			}.bind(this), function() {
				this.controls.hide();
			}.bind(this))
			.delegate('.control-left', 'click', function(ev) {//(事件代理)
				this.tab(this._correctIndex(this.now-1),-1);	
			}.bind(this))
			.delegate('.control-right', 'click', function(ev) {
				this.tab(this._correctIndex(this.now+1),1);	
			}.bind(this));	
			//自动播放
			if(this.options.interval){
				this.autoplay();
				//鼠标放上暂停 离开自动播放
				this.$elem.hover($.proxy(this.pause,this),$.proxy(this.autoplay,this));
			}
			//监听底部按钮事件
			
			this.btns.on('click',function(){
				_this.tab(_this.btns.index(this));
			});	
			//初始化加载图片
			this.$elem.trigger('carousel-show',[this.now,this.carouselItems[this.now]]);
			/*--------------------------------*/
			if(this.options.slide){//划入划出
				//隐藏所有
				this.$elem.addClass('slide');
				//默认显示
				this.carouselItems.eq(this.now).css('left',0);	
				//初始化移动插件
				this.carouselItems.move(this.options);	
				//监听懒加载
				
				this.carouselItems.on('move',function(ev,index,elem){
					var index = _this.carouselItems.index(this);
					if(_this.now != index){//只监听将要显示的图片
						_this.$elem.trigger('carousel-show',[index,this]);
					}

				})						
				//监听左右按钮事件
				this.tab = this._slide;																			
			}else{//淡入淡出
				//隐藏所有
				this.$elem.addClass('fade');
				//默认显示
				this.carouselItems.eq(this.now).show();
				//初始化显示隐藏插件
				this.carouselItems.showHide(this.options);
				//监听懒加载
				//只监听将要显示的图片
				this.carouselItems.on('show',function(ev,index,elem){
					var index = _this.carouselItems.index(this);
					_this.$elem.trigger('carousel-show',[index,this]);
					console.log(index,ev.type);
				})				
				this.tab = this._fade;
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
		_slide:function(index,direction){
			//向右滑动 方向为1 左滑方向-1
			if(this.now == index) return ;
			if(!direction){
				if(this.now < index){
					direction = 1;
				}else{
					direction = -1;
				}
			}
			//即将显示的放到指定位置
			this.carouselItems.eq(index)
			.css('left',direction * this.itemWidth);
			//划出当前张
			this.carouselItems.eq(this.now)
			.move('x',-1*direction * this.itemWidth);
			this.btns.eq(this.now).removeClass('active');			
			//划入将要显示的
			this.carouselItems.eq(index).move('x',0);
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