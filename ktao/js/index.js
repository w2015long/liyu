;(function($){
	var $menuDrop = $('.dropdown')
	$menuDrop.dropdown({js:true,mode:'slideDownUp'});

	$menuDrop.on('dropdown-show',function(ev){
		var loadUrl = $menuDrop.data('file');
		if(!loadUrl) return;
		$.getJSON(loadUrl, function(data) {
				/*optional stuff to do after success */
				console.log(data);
		});
	});


})(jQuery);