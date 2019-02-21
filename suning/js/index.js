$(function(){
	$('.dropdown').hover(function(){
		$(this).find('.dropdown-layer').stop().slideDown(500);
	},function(){
		$(this).find('.dropdown-layer').stop().slideUp();
	})
})
