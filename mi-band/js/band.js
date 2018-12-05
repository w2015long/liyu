var aBtn = document.querySelectorAll('.com-nav a');
var aList = document.getElementById('children-list')
// console.log(aBtn);
/*header选项卡部分*/
/*
console.log(aList);
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
*/


/*top购物车*/
var oCartHover = document.getElementById('cart-hover');
var oCartMenu = document.getElementById('cart-menu');
oCartHover.onmouseover = function(){
	oCartMenu.style.display='block';
}
oCartHover.onmouseout = function(){
	oCartMenu.style.display='none';
}
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