$(function(){
	$('.dropdown').hover(function(){
		var $this = $(this);
		$this.find('.fa').removeClass('normal').addClass('rotate');
		$this.find('.dropdown-layer').stop().slideDown(500);
	},function(){
		var $this = $(this);
		$this.find('.fa').removeClass('rotate').addClass('normal');
		$this.find('.dropdown-layer').stop().slideUp(50);
	})
});
/*面向对象轮播图*/
(function(w){
	function Carousel(options){
		//1.罗列属性
		this.oBox = document.getElementById(options.id);
		this.aImg = options.aImg;
		this.oImgUl  = null ;
		this.oLeftArrow = null;
		this.oRightArrow = null;
		this.oBtnUl = null;
		this.width = options.width;
		this.height = options.height;
		this.imgWidth = options.imgWidth;
		this.now = 0;
		this.playDuration = options.playDuration ;
		//2初始化DOM
		this.init();
		//!3绑定事件
		this.bindEvent() ;
		if(this.playDuration){
			this.autoPlay();
		}
	};
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			var bgColor = ['#7701A1','#99cce1','#9D5CFE',
			'#FFFFFF','#EBEFFB','#6539E6'];
			//1.创建图片容器
			this.oImgUl = document.createElement('ul');
			this.oBox.style.position = 'relative'
			this.oBox.style.width = this.width + 'px';
			this.oBox.style.height = this.height + 'px';

			//4创建左右箭头
			this.oLeftArrow = document.createElement('span');		
			this.oRightArrow = document.createElement('span');
			//4-左右按钮添加到顶层父容器中
			this.oBox.appendChild(this.oLeftArrow);
			this.oBox.appendChild(this.oRightArrow);
			//4-左右箭头的样式		
			this.oLeftArrow.className = 'leftBtn' ;		
			this.oRightArrow.className = 'rightBtn' ;
			this.oLeftArrow.innerHTML = '&lt;' ;	
			this.oRightArrow.innerHTML = '&gt;' ;
			this.oLeftArrow.style.zIndex = '88';
			this.oRightArrow.style.zIndex = '88';
			//5创建下方圆圈按钮
			this.oBtnUl = document.createElement('ul');

			//2动态生成li>img
			//3动态结构样式
			for(var i=0;i<this.aImg.length;i++){
				var oLi = document.createElement('li');
				var oImg = document.createElement('img');
				var oBtnLi = document.createElement('li');

				//2-oLi和oImg添加到oImgUl中
				this.oImgUl.appendChild(oLi);
				//2-图片的容器li的样式
				oLi.style.position = 'absolute';
				oLi.style.left = 0;
				oLi.style.top = 0;
				oLi.style.width = this.width + 'px';
				oLi.style.height = this.height + 'px';
				oLi.style.backgroundColor = bgColor[i];
				//每一个Img放到li里
				oLi.appendChild(oImg);
				//oImg的样式
				// oImg.style.position = 'absolute';
				oImg.style.width = this.imgWidth + 'px';
				oImg.style.height = this.height + 'px';
				oImg.style.marginLeft = "auto";
				oImg.style.marginRight = "auto";
				oImg.style.display = "block";
				// oImg.style.left = (oLi.offsetWidth - oImg.offsetWidth)/2 +'px';
				oImg.src = this.aImg[i] ;
				// console.log(oImg.offsetWidth);

				//显示第一张
				if(i==0){
					oLi.style.zIndex = '66' ;
					oLi.style.opacity = '1' ;
					oBtnLi.className = 'active';

				}
				else{
					oLi.style.zIndex = '0' ;
					oLi.style.opacity = '0.5' ;	
					oBtnLi.className = '';			
				}			
				//底部圆圈按钮放到this.oBtnUl中
				this.oBtnUl.appendChild(oBtnLi);


			}


			//1-图片容器添加到外层父容器中
			this.oBox.appendChild(this.oImgUl);

			//5-下方圆圈按钮添加到父容器中
			this.oBox.appendChild(this.oBtnUl);
			//5-下方圆圈按钮添加样式
			this.oBtnUl.className = 'bottomBtn' ;
			this.oBtnUl.style.marginLeft = -this.oBtnUl.offsetWidth*0.5 + 'px';
			this.oBtnUl.style.zIndex = '88';

			console.log(this.oLeftArrow.offsetParent)			
		},
		switchImgs:function(){
			for(var i=0;i<this.aImg.length;i++){
				this.oImgUl.children[i].style.zIndex = '0';
				this.oImgUl.children[i].style.opacity = '0.5';
				this.oBtnUl.children[i].className = '' ;
			}
			this.oImgUl.children[this.now].style.zIndex = '66';
			// this.oImgUl.children[this.now].style.opacity = '1';
			animate(this.oImgUl.children[this.now],{opacity:100});
			this.oBtnUl.children[this.now].className = 'active' ;				
		},
		bindEvent:function(){
			var _this = this ;
			this.oRightArrow.onclick = function(){
				// console.log('click',this);
				_this.now++ ;
				if(_this.now>=_this.aImg.length){
					_this.now = 0;
				}
				_this.switchImgs();
			}
			this.oLeftArrow.onclick = function(){
				_this.now-- ;
				if(_this.now<=0){
					_this.now = _this.aImg.length -1;
				}
				_this.switchImgs();			

			}
			//点击下方小圆圈切换图片
			for(var j=0;j<this.aImg.length;j++){
				this.oBtnUl.children[j].index = j ;//每一个小圆点绑定一个事件
				this.oBtnUl.children[j].onclick = function(){
					_this.now = this.index ;
					_this.switchImgs();	
				}
			}
		},
		autoPlay:function(){
			var timer = null;
			var _this = this;
			// console.log('autoPlay',this)
			timer = setInterval(this.oRightArrow.onclick,this.playDuration) ;
			this.oBox.onmouseenter = function(){
				if(timer){
					clearInterval(timer);
				}
			}
			this.oBox.onmouseleave = function(){
				timer = setInterval(_this.oRightArrow.onclick,_this.playDuration);
			}
		}
	};
	w.Carousel = Carousel;
})(window);

new Carousel({
	id:"carousel",
	aImg:[
	'images/1-1.jpg',
	'images/2-1.jpg',
	'images/3-1.jpg',
	'images/4-1.jpg',
	'images/5-1.jpg',
	'images/6-1.jpg',
	],
	width:1343,
	height:480,
	imgWidth:750,
	playDuration:3000,
});

