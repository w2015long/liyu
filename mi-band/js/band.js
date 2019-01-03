
/*header全部商品*/
(function(){
    var oCategoryHover = document.getElementById('category-hover');
    var oCategory = document.getElementById('category');
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
})();

//固定导航栏
(function(){
    window.onscroll=function(){
        //滚动的距离,距离顶部的距离
        var topScroll =document.body.scrollTop||document.documentElement.scrollTop;
        var bignav  = document.getElementById("bignav");//获取到导航栏id
        if(topScroll > 140){  //当滚动距离大于140px时执行下面的东西
            bignav.style.position = 'fixed';
            bignav.style.top = '0px';
            bignav.style.zIndex = '9999';
        }else{//当滚动距离小于140的时候执行下面的内容，也就是让导航栏恢复原状
            bignav.style.position = 'static';
        }
        console.log(topScroll);
        //固定carousel客户区
        var oMain=document.getElementById('main');
        console.log(oMain);
        //滚动的距离,距离顶部的距离
        if(topScroll>200&&topScroll<720){
            oMain.style.position = 'fixed';
            oMain.style.top = '1px';
            oMain.style.zIndex = '9988';
        }else{//当滚动距离不在区间范围时候执行下面的内容，也就是让导航栏恢复原状
            oMain.style.position = 'static';
        }
    }    
})();
/*headerNav*/
(function(){
    var oNavBox = document.querySelector('.header .header-nav-box');
    var oNavContent = oNavBox.querySelector('.container');
    var aLi = document.querySelectorAll('.header .header-nav .com-nav');
    var oLoading = oNavContent.querySelector('.loading');
    var hiddenTimer = null;
    var loadTimer = null;
    // console.log(aLi)
    oNavBox.style.overflow = 'hidden';
    for(var i=0;i<aLi.length;i++){
        (function(i){
            aLi[i].onmouseenter = function(){
                //移入此Li清除上一个定时器(不让contentBox隐藏)
                clearTimeout(hiddenTimer);
                //高度没出来先显示loading 和上边框
                oNavBox.style.borderTop = '1px solid #ccc';
                oLoading.style.display = 'block';
                animate(oNavBox,{height:202},true,function(){
                    
                    oNavBox.style.overflow = 'visible';
                });
                //模拟加载数据
                //每每加载一次数据 先清除上一次数据
                clearTimeout(loadTimer);
                loadTimer = setTimeout(function(){
                    oLoading.style.display = 'none';
                    loadData(i);
                },500);
            }
            aLi[i].onmouseleave =  hiddenContent            
        })(i);

    }
    oNavBox.onmouseenter = function(){
        clearTimeout(hiddenTimer);
    }
    oNavBox.onmouseleave = hiddenContent;
    function hiddenContent(){
        oNavBox.style.overflow = 'hidden';
        hiddenTimer = setTimeout(function(){
            animate(oNavBox,{height:0},true,function(){
                oNavBox.style.borderTop = 'none';
            });            
        },500)
    }
    function loadData(index){
        var data = navData[index]; 
        var html = '<ul>';
        for(var i=0;i<data.length;i++){
            html += "<li class="+"children-list-item"+">";          
            html += "<div class="+"img-box"+">" ;           
            html += "<a href="+data[i].url+">";                 
            html += "<img src="+data[i].img+">";                        
            html += "</a>"  ;               
            html += "</div>";               
            html += "<p class="+"product-title"+">"+data[i].title+"</p>";               
            html += "<p class="+"product-price"+">"+data[i].price+"</p>";   
            if(data[i].flag){
                html += "<sapn class="+"flag"+">"+data[i].flag+"</sapn>";
            }           
            html += "</li>" ;            
        }
        html += '</ul>';
        oNavContent.innerHTML = html;
    }
})();




















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
var timer=null;
//改变轮播图
function changesImg(){
    for(var i=0;i<aImg.length;i++){
       aImg[i].style.zIndex='0';
       aImg[i].style.opacity='0.2';
       aFollow[i].className=''; 
    }
    aImg[now].style.zIndex='89';
    aImg[now].style.opacity='1';
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
//左边按钮事件
oLeft.onclick=function(){
    now--
    if(now<0){
        now=aImg.length-1;
    }
    changesImg();
}
//点击follow切换图片
for(var i=0;i<aImg.length;i++){
    aFollow[i].index=i;//给每一个aFollow绑定一个事件
    aFollow.onclick=function(){
        now=this.index;
        changesImg(); 
    }
}
//自动播放轮播图
function startAutoPlay(){
    timer=setInterval(oRight.onclick,1000);
}
startAutoPlay();
//暂停播放
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}
//鼠标离开main区自动播放
oMain.onmouseout=function(){
    startAutoPlay();
}
//鼠标放到main区停止播放
oMain.onmouseover=function(){
    stopAutoPlay();
}