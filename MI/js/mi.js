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
	timer=setInterval(oRight.onclick,1000);
}
//暂停播放
function stopAutoPlay(){
	if(timer){
		clearInterval(timer);
	}
}