;(function($){
	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;

		//2.初始化
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			if(this.options.slide){//划入划出

			}else{//淡入淡出

			}
		},

	}
	Carousel.DEFAULTS = {
		js:true,
		mode:'fade',
		slide:false
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