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
	/*-------------------------------------------------------*/
	function carouselLazyLoad($elem){
		/*1.开始加载*/
		//懒加载优化
		var items = {};//0:loaded 1:loaded
		//防止多次触发carousel-show事件
		$elem.totalItemNum = $elem.find('.carousel-img').length;
		$elem.allLoadedNum = 0;
		$elem.loadFn = null;
		$elem.on('carousel-show',$elem.loadFn = function(ev,index,elem){
			
			console.log('carousel-show will trigger.....')
			//防止多次加载图片
			if(items[index] != 'loaded'){
				$elem.trigger('carousel-load',[index,elem]);
			}
		});
		/*2.执行加载*/
		$elem.on('carousel-load',function(ev,index,elem){
			console.log(index,'will load....');
			var $imgs = $(elem).find('.carousel-img');
			//加载elem元素里多张图片
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImg(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl);
				},function(imgUrl){
					$img.attr('src','imgs/quesheng.jpg');
				})
				$elem.allLoadedNum++;
				items[index] = 'loaded';
				
				if($elem.totalItemNum == $elem.allLoadedNum){
					$elem.trigger('carousel-loaded');
				}
			});
		});	
		/*3.加载完毕*/
		$elem.on('carousel-loaded',function(){
			$elem.off('carousel-show',$elem.loadFn);
		});
	}
	function loadImg(imgUrl,success,error){
		var image = new Image();
		image.onload = function(){
			// $img.attr('src',imgUrl);
			typeof success == 'function' && success(imgUrl);
		}		
		image.onerror = function(){
			// $img.attr('src','imgs/quesheng.jpg');
			typeof error == 'function' && error(imgUrl);
		}
		//模拟网络延时
		setTimeout(function(){
			image.src = imgUrl;
		},300)
				
	}
	/*1.开始加载*/
	var $bannerCarousel = $('.carousel .carousel-wrap');
	carouselLazyLoad($bannerCarousel);	
	$bannerCarousel.carousel({
		slide:true,
		activeIndex:0,
		interval:0		
	});


	/*今日热销轮播图*/
	var $todaysCarousel = $('.todays .carousel-wrap');
	carouselLazyLoad($todaysCarousel);	
	$todaysCarousel.carousel({
		slide:true,
		activeIndex:0,
		interval:0		
	});	



	/*floor选项卡------------------------------------*/
	var $floor = $('.floor');
	var $win = $(window);
	var $doc = $(document);	
	function floorHtmlLazyLoad($elem){
		
		//懒加载优化
		var items = {};//0:loaded 1:loaded
		//防止多次触发tab-show事件
		$elem.totalItemNum = $elem.find('.floor-img').length;
		$elem.allLoadedNum = 0;
		$elem.loadFn = null;
		/*1.开始加载*/
		$elem.on('floor-show',$elem.loadFn = function(ev,index,elem){
			
			console.log('floor-show will trigger.....')
			//防止多次加载图片
			if(items[index] != 'loaded'){
				$elem.trigger('floor-load',[index,elem]);
			}
		});
		/*2.执行加载*/
		$elem.on('floor-load',function(ev,index,elem){
			console.log(index,'will load floor html....');
			var $imgs = $(elem).find('.floor-img');
			//加载HTML

			$elem.allLoadedNum++;
			items[index] = 'loaded';
			
			if($elem.totalItemNum == $elem.allLoadedNum){
				$elem.trigger('floor-loaded');
			}			
		});	
		/*3.加载完毕*/
		$elem.on('floor-loaded',function(){
			$elem.off('floor-show',$elem.loadFn);
		});
	}	
	function floorTabLazyLoad($elem){
		/*1.开始加载*/
		//懒加载优化
		var items = {};//0:loaded 1:loaded
		//防止多次触发tab-show事件
		$elem.totalItemNum = $elem.find('.floor-img').length;
		$elem.allLoadedNum = 0;
		$elem.loadFn = null;
		$elem.on('tab-show',$elem.loadFn = function(ev,index,elem){
			
			console.log('tab-show will trigger.....')
			//防止多次加载图片
			if(items[index] != 'loaded'){
				$elem.trigger('tab-load',[index,elem]);
			}
		});
		/*2.执行加载*/
		$elem.on('tab-load',function(ev,index,elem){
			console.log(index,'will load....');
			var $imgs = $(elem).find('.floor-img');
			//加载elem元素里多张图片
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImg(imgUrl,function(imgUrl){
					$img.attr('src',imgUrl);
				},function(imgUrl){
					$img.attr('src','imgs/quesheng.jpg');
				})
				$elem.allLoadedNum++;
				items[index] = 'loaded';
				
				if($elem.totalItemNum == $elem.allLoadedNum){
					$elem.trigger('tab-loaded');
				}
			});
		});	
		/*3.加载完毕*/
		$elem.on('tab-loaded',function(){
			$elem.off('tab-show',$elem.loadFn);
		});
	}
	
	$floor.tab({});



	/*获取是否显示*/
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top)&&
		($elem.offset().top + $elem.height() > $win.scrollTop());
	}
	function floorIsShow(){
		$floor.each(function(index, elem) {
			if(isVisible($(elem))){
				// console.log('第 '+(index+1)+' 层 show....');
				$doc.trigger('floor-show',[index,elem]);
			}
			
		});		
	}
	$win.on('scroll resize load',function(){
		clearTimeout($floor.floorIsShowTimer);
		$floor.floorIsShowTimer = setTimeout(floorIsShow,300);
	});
	$doc.on('floor-show',function(ev,index,elem){
		// console.log(index,elem);
		floorHtmlLazyLoad($doc);
	})
	
})(jQuery);