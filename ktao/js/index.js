;(function($){

	function loadHtmlOnce($elem,callBack){
		var loadUrl = $elem.data('file');
		if(!loadUrl) return;
		var $layer = $elem.find('.dropdown-layer');
		//防止多次请求数据 设置一个变量控制是否请求
		var isLoaded = $elem.data('isLoaded');
		if(isLoaded) return ;//如果已经请求到数据 就终止
		$.getJSON(loadUrl, function(data) {
			typeof callBack == 'function' && callBack($elem,data);
		});		
	}
	var $menuDrop = $('.nav-side .dropdown');
	
	$menuDrop.dropdown({js:true,mode:'slideDownUp',delay:200});
	$menuDrop.on('dropdown-show',function(ev){

		loadHtmlOnce($(this),buildMenuLayer)

	});
	function buildMenuLayer($elem,data){
		var html = '';
		for(var i=0;i<data.length;i++){
			html += '<li class="dropdown-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
		}
		//模拟网络延时
		setTimeout(function(){
			$elem.find('.dropdown-layer').html(html);
			//第一次请求到数据 变量设为true
			$elem.data('isLoaded',true);
		},800);
						
	}
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



	//加载category
	var $categoryDrop = $('.category .dropdown');
	
	$categoryDrop.dropdown({js:true,mode:'slideLeftRight',delay:100});
	$categoryDrop.on('dropdown-show',function(ev){

		loadHtmlOnce($(this),buildCategoryLayer);
	});
	function buildCategoryLayer($elem,data){
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<dl class="category-details">';
					html += '	<dt class="category-details-title fl">';
					html += '		<a href="#" class="category-details-title-link">'+data[i].title+'</a>';
					html += '	</dt>';
					html += '	<dd class="category-details-item fl">';
					for(var j=0;j<data[i].items.length;j++){
						html += '<a href="#" class="link">'+data[i].items[j]+'</a>';
					}
					html += '</dl>';
				}
				//模拟网络延时
				setTimeout(function(){
					$elem.find('.dropdown-layer').html(html);
					//第一次请求到数据 变量设为true
					$elem.data('isLoaded',true);
				},800);		
	}
	//carousel轮播图部分
	var $carousel = $('.carousel .carousel-wrap');
	$carousel.carousel({
		slide:false,
		activeIndex:3,
		interval:1500		
	});
})(jQuery);