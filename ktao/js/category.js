;(function($){
	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.activeIndex;
		this.carouselItems = this.$elem.find('.carousel-item');

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
			}
		},

	}
	Carousel.DEFAULTS = {
		js:true,
		mode:'fade',
		slide:false,
		activeIndex:2,
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