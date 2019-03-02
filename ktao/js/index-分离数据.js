;(function($){
	var $menuDrop = $('.dropdown');
	
	$menuDrop.dropdown({js:true,mode:'slideDownUp'});
	$menuDrop.on('dropdown-show',function(ev){
		var $elem = $(this);
		var loadUrl = $elem.data('file');
		if(!loadUrl) return;
		var $layer = $elem.find('.dropdown-layer');
		//防止多次请求数据 设置一个变量控制是否请求
		var isLoaded = $elem.data('isLoaded');
		if(isLoaded) return ;//如果已经请求到数据 就终止
		$.getJSON(loadUrl, function(data) {
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="dropdown-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				//模拟网络延时
				setTimeout(function(){
					$layer.html(html);
					//第一次请求到数据 变量设为true
					$elem.data('isLoaded',true);
				},800);
				
		});
	});

	//search
	var $search = $('.main-search');
	$search.on('readData',function(ev,data){
		// console.log('get data:::',data);
		//由后台数据生成html
		var html = getSearchlayer(data,8);
		//加载下拉层
		$search.search('appendHtml',html);	
		//根据数据是否显示下拉层
		if(html == ''){
			$search.search('hideLayer');
		}else{
			$search.search('showLayer');
		}			
	});
	$search.on('readNoData',function(){
		$search.search('appendHtml','');
		$search.search('hideLayer');
	});
	function getSearchlayer(data,maxNum){
		
		var html = '';
		for(var i=0;i<data.result.length;i++){
			if(i>=maxNum) break;
			html += '<li class="search-layer-hots">'+data.result[i][0]+'</li>'
		}
		return html;		
	}
	$search.search();
})(jQuery);