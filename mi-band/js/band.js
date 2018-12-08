
/*header全部商品*/
var oCategoryHover = document.getElementById('category-hover');
var oCategory = document.getElementById('category');
// alert(oCategoryHover);
oCategoryHover.onmouseover=function(){
	oCategory.style.display="block";
}
oCategoryHover.onmouseout=function(){
	oCategory.style.display="none";
}
oCategory.onmouseover=function(){
	oCategory.style.display="block";
}
oCategory.onmouseout=function(){
	oCategory.style.display="none";
}
//固定导航栏
window.onscroll=function(){
    var topScroll =document.body.scrollTop||document.documentElement.scrollTop;//滚动的距离,距离顶部的距离
    var bignav  = document.getElementById("bignav");//获取到导航栏id
    if(topScroll > 140){  //当滚动距离大于140px时执行下面的东西
        bignav.style.position = 'fixed';
        bignav.style.top = '0px';
        bignav.style.zIndex = '9999';
    }else{//当滚动距离小于140的时候执行下面的内容，也就是让导航栏恢复原状
        bignav.style.position = 'static';
    }
}
//carousel轮播图
//封装一个获取元素ID的函数
function byId(id){
    return typeof(id) === "string"?document.getElementById(id):id;
}
var oMain=byId('main');
var oLeft=byId('left-arrow');
var oRight=byId('right-arrow');
var aImg=document.querySelectorAll('#imgs');
var aFollow=document.querySelectorAll('#follow');
var now=0;
//改变轮播图
function changesImg(){
    for(var i=0;i<aImg.length;i++){
       aImg[i].style.zIndex='0';
       aFollow[i].className=''; 
    }
    aImg[now].style.zIndex='89';
    aFollow[now].className='active';
}
//右边按钮添加事件
oRight.onclick=function(){
    now++
    if(now>=aImg.length){
        now=0;
    }
    changesImg();
}