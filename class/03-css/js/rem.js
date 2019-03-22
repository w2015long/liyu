;(function(win,doc){
	var oRoot = document.getElementsByTagName('html')[0];
	function refresh(){
		var iWidth = doc.body.clientWidth || doc.documentElement.clientWidth;
		var iFontsize = iWidth / 10;
		oRoot.style.fontSize = iFontsize + 'px';
	}
	win.addEventListener('resize',refresh,false);
	win.addEventListener('DOMContentloaded',refresh,false);
})(window,document);