;(function($){
	$('.dropdown').dropdown({js:true,mode:'slideDownUp'});
	$('.dropdown')
	.on('dropdown-show dropdown-shown dropdown-hide dropdown- hidden',function(ev){
		console.log('!:::',ev.type);
	});
	$('.btn-show').click(function(){
		$('.dropdown').dropdown('show');
	});
	$('.btn-hide').click(function(){
		$('.dropdown').dropdown('hide');
	})	
})(jQuery);