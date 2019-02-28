;(function($){
	function Dropdown($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer = $elem.find('.dropdown-layer');
		this.activeClass = $elem.data('active') + '-active' ; 
		this.timer = null;
		//2.初始化
		this.init();
	}
	Dropdown.prototype = {
		constructor:Dropdown,
		init:function(){
			//1.初始化显示隐藏的元素
			this.$layer.showHide(this.options);
			//2.监听显示隐藏事件			
			this.$elem.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropdown-' + ev.type);
			}.bind(this));
			//3.绑定事件
			this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			
		},
		show:function(){
			//显示下拉层
			if(this.options.delay){
				this.timer = setTimeout(function(){
					this.$layer.showHide('show');
					this.$elem.addClass(this.activeClass);
				}.bind(this),this.options.delay);
			}else{
				this.$layer.showHide('show');
				this.$elem.addClass(this.activeClass);				
			}

		},
		hide:function(){
			if(this.options.delay){
				clearTimeout(this.timer);
			}
			//隐藏下拉层
			this.$layer.showHide('hide');
			this.$elem.removeClass(this.activeClass);
		}
	}
	Dropdown.DEFAULTS = {js:true,mode:'slideDownUp',delay:200};


	//注册插件
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $elem = $(this);
				options = $.extend({},Dropdown.DEFAULTS,options);
				new Dropdown($elem,options);
			});
		}
	})
})(jQuery);