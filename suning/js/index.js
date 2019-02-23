$(function(){
	$('.dropdown').hover(function(){
		var $this = $(this);
		$this.find('.fa').removeClass('normal').addClass('rotate');
		$this.find('.dropdown-layer').stop().slideDown(500);
	},function(){
		var $this = $(this);
		$this.find('.fa').removeClass('rotate').addClass('normal');
		$this.find('.dropdown-layer').stop().slideUp(50);
	})
})
