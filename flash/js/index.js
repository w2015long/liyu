
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
    window.onscroll=function(){
        var topScroll =document.body.scrollTop||
                    document.documentElement.scrollTop;
        var bignav  = document.querySelector(".home .hd .timer");
        if(topScroll>243){
            bignav.style.position = 'fixed';
            bignav.style.top = '-80px';
            bignav.style.left = '58.5px';
            bignav.style.zIndex = '999';
        }else{
            bignav.style.position = 'static';
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
            if((!((i+1)%6) && (i != 0)) || i == classify.length){
                html +=    '</ul>'; 
            }  
        }
        oContent.innerHTML = html;            
    }

}
//倒计时部分
(function(){
    var oSpan = document.getElementById('timer');
    var endTime = new Date('2019-01-18 08:30:30');
    var endTimer = endTime.getTime();
    var timer = null;

    function toDouble(num){
        return num<10 ? "0"+num : ''+num; 
    }
    function handleTimer(){
        var allTime = endTimer - Date.now();
        if(allTime<=0){
            clearInterval(timer);
            allTime = 0;
        }
        var allSeconds = allTime/1000;
        var iHour = parseInt(allSeconds/3600);
        var iMinute = parseInt((allSeconds%3600)/60);
        var iSecond = parseInt(allSeconds%60);
        oSpan.innerHTML = '抢购中<br>距离结束'+toDouble(iHour)+':'+toDouble(iMinute)+':'+toDouble(iSecond);
        /*抢购中<br>
        距离结束 00:52:13*/           
    }
    timer = setInterval(handleTimer, 500);
    handleTimer();
})();

