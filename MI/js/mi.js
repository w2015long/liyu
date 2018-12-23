//封装一个代替getElementById()的方法
function byId(id){
    return typeof(id) === "string" ? document.getElementById(id) : id;
}
 /*头部购物车*/
var oCart = document.querySelector('.cart');
var oCartBox = document.querySelector('.cart-box');
var oContent = document.querySelector('.cart-content');
var oCartA = oCartBox.children[0];
oCart.onmouseenter = function(){
	oContent.style.display = 'block';
	oCartBox.style.backgroundColor = '#fff';
	oCartA.style.color = '#ff6700';
}
oCart.onmouseleave = function(){
	oContent.style.display = 'block';
	oCartBox.style.backgroundColor = '#fff';
	oCartA.style.color = '#b0b0b0'; 	
}
/*carousel轮播图*/
var timer=null;
var now=0;
var aImgs=document.getElementsByClassName('carousel-imgs-item');
var aBtn=document.querySelectorAll('.carousel-btn-item');
var oCarousel=document.getElementById('carousel');
var oRight=document.querySelector('.right-arrow');
var oLeft=document.querySelector('.left-arrow');
console.log(aBtn);
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
/*flash闪购倒计时*/
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