//封装一个获取元素ID的函数
function byId(id){
    return typeof(id) === "string"?document.getElementById(id):id;
}
/*购物车*/
(function(){
    var oCart = document.querySelector('.top .cart');
    var oCartBox = oCart.querySelector('.cart-box');
    var oA = oCartBox.children[0];
    var oCartMenu = oCart.querySelector('#cart-menu');
    var oLoading = oCartMenu.querySelector('.loading');
    var oEmpty = oCartMenu.querySelector('.empty');
    oCart.onmouseenter = function(){
        oCartBox.style.background = '#fff';
        oA.style.color = '#ff6700';
        oLoading.style.display = 'block';
        animate(oCartMenu,{height:100},true,function(){
            oLoading.style.display = 'none';
            oEmpty.style.display = 'block';
        })
    }
    oCart.onmouseleave = function(){
        oCartBox.style.background = '#424242';
        oA.style.color = '#b0b0b0';
        oLoading.style.display = 'none';
        animate(oCartMenu,{height:0},true,function(){
            oEmpty.style.display = 'none';
        })                
    }
})();

//固定导航栏
(function(){
    var isShow = false;
    var isCenter = false;

    window.onscroll=function(){
        var topScroll =document.body.scrollTop||
                       document.documentElement.scrollTop;
        var oMain = byId(main);
        if(topScroll>150&&topScroll<260){
            if(!isCenter){
                // oMain.style. = ''
                animate(oMain,{top:80},false);
                isCenter = true;
            }

        }else{
            if(isCenter){
                animate(oMain,{top:-10},false);
                isCenter = false;
            }
        }


        var bignav  = document.querySelector(".home .nav-fixed");
        if(topScroll>143){
            if(!isShow){
               animate(bignav,{height:62},true);
               isShow = true; 
            }
        }else{
            if(isShow){
                animate(bignav,{height:0},true);
                isShow = false;
            }
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
                },300);
            }
            aLi[i].onmouseleave =  hiddenContent ;          
        })(i);
    }
    oNavBox.onmouseenter = function(){
        clearTimeout(hiddenTimer);
    }
    oNavBox.onmouseleave = hiddenContent;
    function hiddenContent(){
        hiddenTimer = setTimeout(function(){
            oNavBox.style.overflow = 'hidden';
            animate(oNavBox,{height:0},true,function(){
                oNavBox.style.borderTop = 'none';
            });            
        },300) 
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

/*全部商品动态列表*/
handleCategory();
function handleCategory(){
    var oBox = document.querySelector('.home .category-box');
    var oContent = document.querySelector('.home .category-content');
    var aCategory = document.querySelectorAll('.home .category .category-item');
    var oCategoryHover = document.getElementById('category-hover');
    var oCategory = document.getElementById('category');    
    var lastIndex = 0;
    var noneTimer = null;
    oCategoryHover.onmouseenter = oCategory.onmouseenter = oContent.onmouseenter = function(){
        clearTimeout(noneTimer);
        oCategory.style.display="block";
    }
    oCategoryHover.onmouseleave = oCategory.onmouseleave = oContent.onmouseleave = function(){
        noneTimer = setTimeout(function(){
            oCategory.style.display="none";
            oContent.style.display="none";
        },500)
    }
    for(var i=0;i<aCategory.length;i++){
        (function(i){
            aCategory[i].onmouseenter = function(){
                oCategory.style.display="block";
                aCategory[lastIndex].className = 'category-item';
                this.className = 'category-item active';
                lastIndex = i;
                oContent.style.display = 'block';
                loadData(i);
            }
            oBox.onmouseleave = function(){
                aCategory[lastIndex].className = 'category-item';
            }            
        })(i);
    }
    function loadData(index){
        var classify = categoryData[index];
        var html =  '';
        for(var i=0;i<classify.length;i++){
            if(!(i%6)){
                html += '<ul class="children-list">';
            }
            html += '<li>';
            html += '    <a href="'+classify[i].url+'">';
            html += '        <img src="'+classify[i].img+'" alt="">';
            html += '        <span>'+classify[i].name+'</span>';
            html += '    </a>';
            html += '</li>';
            if(!((i+1)%6) || i == classify.length){
                html +=    '</ul>'; 
            }  
        }
        oContent.innerHTML = html;            
    }

}

handleCarousel();
//carousel轮播图
function handleCarousel(){
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
        timer=setInterval(oRight.onclick,2000);
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
}    

