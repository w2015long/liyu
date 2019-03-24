
(function($){

	function getRandom(min,max) {	
		return Math.round(min + (max-min)*Math.random());
	}
	var $wish = $('.wish');
	var $wall = $('.wall');
	var wallWidth = $wall.width(),
		wallHeight = $wall.height(),
		wishWidth = $wish.width(),
		wishHeight = $wish.height();
	//1让卡片可拖拽
	$wish.pep({constrainTo:false});
	//2随机显示许愿卡片
	$wish.each(function() {
		var $this = $(this);
		let x = getRandom(0,wallWidth-wishWidth);
		let y = getRandom(0,wallHeight-wishHeight);
		$this.css({
			    transform: 'matrix(1, 0, 0, 1,'+x+','+ y+')'
		})
	});






})(jQuery);	
