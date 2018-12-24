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
	var hiddenTimer = null;
	oNavBox.style.overflow = 'hidden';
	for(var i=0;i<aNavLi.length-2;i++){
		aNavLi[i].index = i;
		aNavLi[i].onmouseenter = function(){
			//移入到其他Li时也清除定时器
			clearTimeout(hiddenTimer);
			oNavBox.style.borderTop = '1px solid #ccc';
			animate(oNavBox,{height:202},true,function(){
				oNavBox.style.overflow = 'visible';
			})
			//鼠标放上去时加载数据
			loadData(this.index);
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
		var data = navData[index];
		/*
		<!-- 	<ul class="children-list">
					<li class="children-list-item">
						<div class="img-box">
							<a href="#">
								<img src="images/yuntai.jpg" alt="">
							</a>
						</div>
						<p class="product-title">小米米家智能摄像机云台版</p>
						<p class="product-price">199元起</p>
						<sapn class="flag">热卖</sapn>
					</li>
					*/
		var html = 	"<ul class="children-list">";
		html += "<li class="children-list-item">";			
		html += "<div class="img-box">"	;			
		html += "<a href="+data[i].url+">";					
		html += "<img src="+data[i].img+" alt="">";						
		html += "</a>"	;				
		html += "</div>";				
		html += "<p class="product-title">"+data[i].title+"</p>";				
		html += "<p class="product-price">"+data[i].price+"</p>";	
		if(data[i].flag){
			html += "<sapn class="flag">"+data[i].flag+"</sapn>";
		}			
		html += "</li>"	;
		html += "</ul>"	;

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
	var endTime = new Date(2018, 12, 22, 8, 30, 0, 0);
	var endTimer = endTime.getTime();
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
	setInterval(handlerTimer,500);
	handlerTimer();
}
// handleFlashProduct();
// function handleFlashProduct(){
// 	var leftBtn = document.querySelector('more-but more-but-left');
// 	var rightBtn = document.querySelector('more-but more-but-right');
// 	leftBtn.onclick = function(){
		
// 	}
// }		