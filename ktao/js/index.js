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
/*-----------------------------------------------------------------*/
	/*
	options = {
		$elem:$elem,
		totalItemNum:5,
		eventName:'carousel-show',
		eventPrefix:'carousel'
	}
	 */
	
	function lazyLoad(options){
		/*1.开始加载*/
		//懒加载优化
		var items = {},
			$elem = options.$elem,
			totalItemNum = options.totalItemNum,
			allLoadedNum = 0,
			loadFn = null,
			eventName = options.eventName,
			eventPrefix = options.eventPrefix;
		$elem.on(eventName,loadFn = function(ev,index,elem){
			//防止多次加载图片
			if(items[index] != 'loaded'){
				$elem.trigger(eventPrefix+'-load',[index,elem,function(){
					allLoadedNum++;
					items[index] = 'loaded';
					if(totalItemNum == allLoadedNum){
						$elem.trigger(eventPrefix+'-loaded');
					}					
				}]);
			}
		});
		/*3.加载完毕*/
		$elem.on(eventPrefix+'-loaded',function(){
			console.log('all done.........')
			$elem.off(eventName,loadFn);
		});
	}
	



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
	/*2.banner轮播图执行加载*/
	$bannerCarousel.on('carousel-load',function(ev,index,elem,success){
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
			success();
		});
	});	
	lazyLoad({
		$elem:$bannerCarousel,
		totalItemNum:$bannerCarousel.find('.carousel-img').length,
		eventName:'carousel-show',
		eventPrefix:'carousel'		
	});

	$bannerCarousel.carousel({
		slide:true,
		activeIndex:0,
		interval:2000		
	});


	/*今日热销轮播图*/
	var $todaysCarousel = $('.todays .carousel-wrap');
	/*2.ad轮播图执行加载*/
	$todaysCarousel.on('carousel-load',function(ev,index,elem,success){
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
			});
			success();
		});
	});		
	lazyLoad({
		$elem:$todaysCarousel,
		totalItemNum:$todaysCarousel.find('.carousel-img').length,
		eventName:'carousel-show',
		eventPrefix:'carousel'		
	});	
	
	$todaysCarousel.carousel({
		slide:true,
		activeIndex:0,
		interval:1600		
	});	



	/*floor选项卡-----------------------------------------------*/
	//获取json数据并存储
	function getDataOnce($elem,url,callback){
		var data = $elem.data(url);
		if(!data){
			console.log('get data once....')
			$.getJSON(url,function(resData){
				$elem.data(url,resData);
				callback(resData);
			})
		}else{
			callback(data);
		}
	}

	//楼层HTML懒加载
	function buildFloorHtml(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeadHtml(oneFloorData);
		html += buildFloorBodyHtml(oneFloorData);
		html += '</div>';
		return html;
	}
	function buildFloorHeadHtml(oneFloorData){
		var html = '';
			html +=	'<div class="floor-hd">';
			html +=	'	<h2 class="floor-title fl">';
			html +=	'		<span class="floor-title-num">'+oneFloorData.num+'F</span>';
			html +=	'		<span class="floor-title-text">'+oneFloorData.text+'</span>';
			html +=	'	</h2>';
			html +=	'	<ul class="tab-item-wrap fr">';
			for(var i=0; i<oneFloorData.items.length;i++){
				html +=	'		<li class="fl">';
				html +=	'			<a class="tab-item" href="javascript:;">'+oneFloorData.tabs[i]+'</a>';
				html +=	'		</li>';
				if(i != oneFloorData.tabs.length){
					html +=	'<li class="fl tab-divider"></li>';
				}	
			}
			html +=	'	</ul>';
			html +=	'</div>';

		return html;	
	}
	function buildFloorBodyHtml(oneFloorData){
		var html = '';
		html +=	'<div class="floor-bd">';
		for(var i=0;i<oneFloorData.items.length;i++){
			html +=	'	<ul class="tab-panel clearfix">';
			for(var j=0;j<oneFloorData.items[i].length;j++){
				html +=	'		<li class="floor-item fl">';
				html +=	'			<p class="floor-item-pic">';
				html +=	'				<a href="#">';
				html +=	'					<img class="floor-img" src="imgs/floor/loading.gif" data-src="imgs/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
				html +=	'				</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-name">';
				html +=	'				<a class="link" href="#">'+oneFloorData.items[i][j].name+'</a>';
				html +=	'			</p>';
				html +=	'			<p class="floor-item-price">￥'+oneFloorData.items[i][j].price+'</p>';
				html +=	'		</li>';	
			}
			html +=	'	</ul>';
		}
		html +=	'</div>';
		return html;
	}


	var $floor = $('.floor');
	var $win = $(window);
	var $doc = $(document);
	//楼层懒加载在此监听
	$floor.on('tab-load',function(ev,index,elem,success){
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
			success();
		});
	});		
	//楼层懒加载	
	$doc.on('floor-load',function(ev,index,elem,success){
		console.log(index+' will load floor html....');
		//加载HTML
		//1.生成HTML
		getDataOnce($doc,'data/floor/floorData.json',function(data){
			console.log(data)
			var html = buildFloorHtml(data[index]);
			//2.加载HTML
			$(elem).html(html);
			//3.图片懒加载
				//floorTabLazyLoad($(elem));
				//楼层懒加载在上面监听
			lazyLoad({
				$elem:$(elem),
				totalItemNum:$(elem).find('.floor-img').length,
				eventName:'tab-show',
				eventPrefix:'tab'						
			})
			//4.激活选项卡
			$(elem).tab({});
		});
		success()	
	});

	$doc.on('floor-loaded',function(){
		console.log('here .........')
		$win.off('scroll resize',$floor.floorShowFn);
	});	
	//楼层懒加载	
	lazyLoad({
		$elem:$doc,
		totalItemNum:$floor.length,
		eventName:'floor-show',
		eventPrefix:'floor'			
	});



	/*获取是否显示*/
	function isVisible($elem){
		return ($win.height() + $win.scrollTop() > $elem.offset().top)&&
		($elem.offset().top + $elem.height() > $win.scrollTop());
	}
	function floorIsShow(){
		$floor.each(function(index, elem) {
			if(isVisible($(elem))){
				console.log('第 '+(index)+' 层 show....');
				$doc.trigger('floor-show',[index,elem]);
			}
			
		});		
	}
	$win.on('scroll resize load', $floor.floorShowFn = function(){
		console.log('floor is shown .........');
		clearTimeout($floor.floorIsShowTimer);
		$floor.floorIsShowTimer = setTimeout(floorIsShow,200);
	});
	//电梯
	//获取楼层号
	function getFloorNum(){
		var num = -1;
		$floor.each(function(index, elem) {
			//如果是最后一页(if条件不满足) 就让num 等于index
			num = index;
			if($(elem).offset().top > $win.scrollTop()+$win.height()/2){
				num = index - 1;
				//条件满足终止循环
				return false;
			}
		});
		return num;
	}
	//设置动态电梯
	var $elevator = $('#elevator');
	var $elevatorItems = $elevator.find('.elevator-item');
	function setElevator(){
		var num = getFloorNum();
		if(num == -1){
			$elevator.fadeOut();
		}else{
			$elevator.fadeIn();
			$elevatorItems.removeClass('elevator-active');
			$elevatorItems.eq(num).addClass('elevator-active');
		}
	}
	$win.on('scroll resize load',function(){
		clearTimeout($elevator.ElevatorTimer);
		$elevator.ElevatorTimer = setTimeout(setElevator,200);
	})
	//点击电梯直达楼层
	$elevator.on('click','.elevator-item',function(){
		var num = $elevatorItems.index(this);
		$('html,body').animate({
			scrollTop:$floor.eq(num).offset().top
		})	
	});

	//toolbar回顶部
	
	$('#backToTop').on('click',function(){
		$('html,body').animate({
			scrollTop:0
		})
	})



})(jQuery);