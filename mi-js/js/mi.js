//封装一个代替getElementById()的方法
function byId(id){
    return typeof(id) === "string" ? document.getElementById(id) : id;
}
 /*头部购物车*/
handleCart();
function handleCart(){ 
	var oCart = document.querySelector('.cart');
	var oCartBox = document.querySelector('.cart-box');
	var oContent = document.querySelector('.cart-content');
	var oCartA = oCartBox.children[0];
	var oLoading = oContent.querySelector('.loading');
	var oEmpty = oContent.querySelector('.empty');
	oCart.onmouseenter = function(){
		oCartBox.style.backgroundColor = '#fff';
		oCartA.style.color = '#ff6700';
		//获取数据时先加载loading图标
		oLoading.style.display = 'block';
		animate(oContent,{height:100},true,function(){
			//加载完毕隐藏loading图标
			oLoading.style.display = 'none';
			//后台购物车数据
			oEmpty.style.display = 'block';
		})
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242';
		oCartA.style.color = '#b0b0b0';
		//鼠标移开先把loading隐藏
		oLoading.style.display = 'none';
		animate(oContent,{height:0},true,function(){
			//收回去再让数据隐藏
			oEmpty.style.display = 'none';
		})	
	}
}
/*下拉header-nav*/
handleNav();
function handleNav(){
	var oNavBox = document.querySelector('.header-nav-children');
	var aNavLi = document.querySelectorAll('.header-nav .header-nav-item');
	var oNavContent = oNavBox.querySelector('.container');
	var oLoading = oNavContent.querySelector('.loading');
	var hiddenTimer = null;
	var loadTimer = null;
	oNavBox.style.overflow = 'hidden';
	for(var i=0;i<aNavLi.length-2;i++){
		aNavLi[i].index = i;
		aNavLi[i].onmouseenter = function(){
			//移入到其他Li时也清除定时器
			clearTimeout(hiddenTimer);
			oNavBox.style.borderTop = '1px solid #ccc';
			//高度没出来时先显示loading
			oLoading.style.display = 'block';
			animate(oNavBox,{height:202},true,function(){
				oNavBox.style.overflow = 'visible';
			})
			//鼠标放上去时模拟加载数据（有延迟）
			var index = this.index;
			//每每加载下一项数据之前先清除上一项定时器
			clearTimeout(loadTimer);
			loadTimer = setTimeout(function(){
				oLoading.style.display = 'none';
				loadData(index);
			},500)
			
		}
		//鼠标移除事件
		aNavLi[i].onmouseleave = hiddenContent;
	}
	oNavBox.onmouseenter = function(){
		clearTimeout(hiddenTimer);
	}
	oNavBox.onmouseleave = hiddenContent;
	function hiddenContent(){
		hiddenTimer = setInterval(function(){
			oNavBox.style.overflow = 'hidden';
			animate(oNavBox,{height:0},true,function(){
				oNavBox.style.borderTop = 'none';
			})
		}, 500)
	}
	function loadData(index){
		//data对应的是每一项导航栏的内容（相当于手机是一项，家电是一项）
		var data = navData[index];
		var html = 	"<ul class="+"children-list"+">";			
		for(var i=0;i<data.length;i++){
			// console.log(data.length);
			// console.log(data[i].title);
			html += "<li class="+"children-list-item"+">";			
			html += "<div class="+"img-box"+">"	;			
			html += "<a href="+data[i].url+">";					
			html += "<img src="+data[i].img+">";						
			html += "</a>"	;				
			html += "</div>";				
			html += "<p class="+"product-title"+">"+data[i].title+"</p>";				
			html += "<p class="+"product-price"+">"+data[i].price+"</p>";	
			if(data[i].flag){
				html += "<sapn class="+"flag"+">"+data[i].flag+"</sapn>";
			}			
			html += "</li>"	;
		}
		html += "</ul>"	;
		oNavContent.innerHTML = html;

	}

}
/*category动态商品列表*/
handleCategory();
function handleCategory(){
	var aCategory = document.querySelectorAll('.banner .category .category-item');
	var ocategoryContent = document.querySelector('.category-box .category-content');
	var ocategoryBox = document.querySelector('.banner .category-box');
	for(var i=0;i<aCategory.length;i++){
		aCategory[i].index = i;
		aCategory[i].onmouseenter = function(){
			for(var j=0;j<aCategory.length;j++){
				aCategory[j].className = 'category-item';
			}			
			this.className = 'category-item active';
			ocategoryContent.style.display = 'block';
			var index = this.index;
			loadCategoryData(index);
		}
	}
	ocategoryBox.onmouseleave = function(){
		ocategoryContent.style.display = 'none';
	}
	function loadCategoryData(index){
		var varietyData = categoryData[index];
		console.log(varietyData.length);

		var html = '<ul>';
		for(var i=0;i<varietyData.length;i++){
			html += '<li>';
			html += '<a href='+varietyData[i].url+'>';
			html += '<img src='+varietyData[i].img+ '>';
			html += '<span>'+varietyData[i].name+'</span>';
			html += '</a>';
			html += '</li>';
		}
		html += '</ul>';
		ocategoryContent.innerHTML = html;
	}
}
/*carousel轮播图*/
handleCarousel();
function handleCarousel(){
	var timer=null;
	var now=0;
	var aImgs=document.getElementsByClassName('carousel-imgs-item');
	var aBtn=document.querySelectorAll('.carousel-btn-item');
	var oCarousel=document.getElementById('carousel');
	var oRight=document.querySelector('.right-arrow');
	var oLeft=document.querySelector('.left-arrow');
	//改变轮播图
	function changesImg(){
		for(var i=0;i<aImgs.length;i++){
			aImgs[i].style.zIndex = '0';
			aImgs[i].style.opacity='0';
			aBtn[i].className='';
		}
		aImgs[now].style.zIndex = '9';
		aImgs[now].style.opacity='1';		
		aBtn[now].className='active';
	}
	//鼠标放上main区暂停播放
	oCarousel.onmouseover=function(){
		stopAutoPlay()
	}
	//鼠标离开main区自动播放
	oCarousel.onmouseout=function(){
		startAutoPlay()
	}
	//点击小圆点切换图片
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i; //给每一个btn绑定一个事件
		aBtn[i].onclick=function(){
			now=this.index;
			changesImg();
		}
	}
	//右边按钮事件
	oRight.onclick=function(){
		now++
		if(now>=aImgs.length){
			now=0;
		}
		changesImg();
	}
	//左边按钮事件
	oLeft.onclick=function(){
		now--
		if(now<0){
			now=aImgs.length-1
		}
		changesImg();
	}

	//播放轮播图
	function startAutoPlay(){
		timer=setInterval(oRight.onclick,2000);
	}
	startAutoPlay();
	//暂停播放
	function stopAutoPlay(){
		if(timer){
			clearInterval(timer);
		}
	}
}
/*flash闪购倒计时*/
handleFlashTimer();
function handleFlashTimer(){
	var sHour = byId(hour),sMinute = byId(minute),sSecond = byId(second);
	var endTime = new Date('2019-06-01 00:00:59');
	var endTimer = endTime.getTime();
	var timer = null;
	function to2Str(num){
		return num<10 ? '0'+num : ''+num;
	}

	function handlerTimer(){

		var allMilliSeconds = endTimer - Date.now();
		if(allMilliSeconds<=0){
			allMilliSeconds=0;
			clearInterval(timer);
		}
		var allSeconds = allMilliSeconds/1000;
		var iHour = parseInt(allSeconds/3600), iMinute = parseInt((allSeconds%3600)/60),iSecond = parseInt(allSeconds%60);
		sHour.innerHTML = to2Str(iHour);
		sMinute.innerHTML = to2Str(iMinute);
		sSecond.innerHTML = to2Str(iSecond);
	}
	timer = setInterval(handlerTimer,500);
	handlerTimer();
}
handleFlashProduct();
function handleFlashProduct(){
	var leftBtn = document.querySelector('.flash .hd .more-but.more-but-left');
	var rightBtn = document.querySelector('.flash .hd .more-but.more-but-right');
	var oUl = document.querySelector('.flash .clo2.porduct-list>ul');
	rightBtn.onclick = function(){
		oUl.style.left = "-978px";
	}
	leftBtn.onclick = function(){
		oUl.style.left = "0px";
	}	
}
handleTab();	
function handleTab(){
	
	var aElecBtn = document.querySelectorAll('.elec .hd .hd-list-item');
	var oElecUl = document.querySelector('.elec .bd .clo2 .ul1');
	console.log(oElecUl)
	for(var i=0;i<aElecBtn.length;i++){
		aElecBtn[i].index = i;
		aElecBtn[i].onmouseenter = function(){
			for(var j=0;j<aElecBtn.length;j++){
				aElecBtn[j].className = 'hd-list-item';
			}
			this.className = 'hd-list-item hd-list-active';
			loadTabData(this.index);
		}
	}
	function loadTabData(index){
		var data = tabData[index];
		var html = '';
		for(var i=0;i<data.length-1;i++){
			html +=	'<li class="product-item product-item-m">';
			html +=		'<a href="'+data[i].url+'">';
			html +=			'<div class="porduct-bg"></div>';
			html +=		'</a>';
			html +=		'<div class="content">';
			html +=			'<img src="'+data[i].img+'" class="product-img" alt="">';
			html +=			'<h3 class="porduct-name">'+data[i].name+'</h3>';
			html +=			'<p class="porduct-desc">'+data[i].desc+'</p>';
			html +=			'<div class="porduct-price">';
			html +=				'<strong>'+data[i].price+'</strong>';
			html +=				'<span>&nbsp;元</span>';
			html +=				'<del>'+data[i].del+'元</del>';
			html +=			'</div>';
			if(data[i].evaluate){
				html +=	'<div class="evaluate">';
				html +=		'<p class="evaluate-item">'+data[i].evaluate.content+'</p>';
				html +=		'<p class="evaluate-author">来至于<span>'+data[i].evaluate.author+'</span>的评价</p>';
				html +=	'</div>';				
			}
			html += 	'</div>';
			if(data[i].flag){
				html += '<span class="flag '+data[i].flag.classTitle+'">'+data[i].flag.title+'</span>';
			}
			
			html +=	'</li>';
		}
		var lastData = data[data.length-1];
		html +=	'<li class="product-item product-item-s">';
		html +=	'	<a href="'+lastData.top.url+'">';
		html +=	'		<div class="porduct-bg"></div>';
		html +=	'	</a>';
		html +=	'	<div class="content">';
		html +=	'		<img src="'+lastData.top.img+'" alt="" class="product-item-s-img">';
		html +=	'		<p class="product-item-s-name">'+lastData.top.name+'</p>';
		html +=	'		<p class="product-item-s-price"><span>'+lastData.top.price+'</span>元</p>';
		html +=	'	</div>	';
		html +=	'</li>			';
		html +=	'<li class="product-item product-item-s">';
		html +=	'	<a href="'+lastData.bottom.url+'">';
		html +=	'		<div class="porduct-bg"></div>';
		html +=	'	</a>';
		html +=	'	<div class="content">';
		html +=	'		<div class="icon"><i class="iconfont">'+lastData.bottom.icon+'</i></div>';
		html +=	'		<p class="icon-name">'+lastData.bottom.name+'</p>';
		html +=	'		<p class="icon-desc">'+lastData.bottom.desc+'</p>';
		html +=	'	</div>	';
		html +=	'</li>';

		oElecUl.innerHTML = html;
	}
	loadTabData(0);
}	