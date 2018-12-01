var aBtn = document.querySelectorAll('.header-nav-item a');
var aList = document.querySelectorAll('.children-list');

// console.log(aBtn);
for(var i=0; i<aBtn.length;i++){
	aBtn[i].index=i;
	aBtn[i].onmouseover=function(){
		for(var j=0;j<aList.length;j++){
			aBtn[j].className='';
			aList[j].style.display='none';
		}
		this.className='active';
		aList[this.index].style.display='block';
	}
}
for(var i=0; i<aBtn.length;i++){
	aBtn[i].index=i;
	aBtn[i].onmouseout=function(){
		for(var j=0;j<aList.length;j++){
			// aBtn[j].className='active';
			aList[j].style.display='display';
		}
		this.className='';
		aList[this.index].style.display='';
	}
}
var oCartHover = document.getElementById('cart-hover');
var oCartMenu = document.getElementById('cart-menu');
oCartHover.onmouseover=function(){
	oCartMenu.style.display='block';
}
oCartHover.onmouseout=function(){
	oCartMenu.style.display='none';
}