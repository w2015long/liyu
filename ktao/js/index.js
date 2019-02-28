;(function($){
	var $menuDrop = $('.dropdown');
	var $layer = $('.dropdown-layer');
	$menuDrop.dropdown({js:true,mode:'slideDownUp'});
	$menuDrop.on('dropdown-show',function(ev){
		var $elem = $(this);
		var loadUrl = $elem.data('file');
		if(!loadUrl) return;
		$.getJSON(loadUrl, function(data) {
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="dropdown-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				$layer.html(html);
		});
	});


})(jQuery);