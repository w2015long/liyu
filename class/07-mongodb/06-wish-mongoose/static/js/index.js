
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
	function handleWishPep($elem){
		//1让卡片可拖拽
		$elem.pep({constrainTo:false});
		//2随机显示许愿卡片
		$elem.each(function() {
			var $this = $(this);
			let x = getRandom(0,wallWidth-wishWidth);
			let y = getRandom(0,wallHeight-wishHeight);
			$this.css({
				    transform: 'matrix(1, 0, 0, 1,'+x+','+ y+')'
			})
		});
		$elem.hover(function(){
			$(this).css({
				zIndex:99
			})
		},function(){
			$(this).css({
				zIndex:0
			})
		})
	}
	handleWishPep($wish);	
	//监听许愿事件
	$('.sub-btn').on('click',function(){
		$.ajax({
			url:'/Wish/add',
			type:'post',
			dataType:'json',
			data:{
				content:$('#content').val()
			}
		})
		.done(function(result){
			if(result.status==0){
				var $dom = $(`<div class="wish" style="background: ${result.data.color}">
					<a href="javascript:;" class="close" data-id='${result.data._id}'></a>
						${result.data.content}</div>`);
				$wall.append($dom);//插入新的dom节点
				handleWishPep($dom)
				$('#content').val('')//插入后把输入框内容置空
			}else{
				alert(result.message);
			}
		})
	})
	//监听删除事件
	$wall.on('click','.close',function(){
		$.ajax({
			url:'/Wish/del/'+$(this).data('id'),
			dataType:'json',
			// data:'id='+$(this).data('id')
		})
		.done(function(result){
			//console.log(result);
			if(result.status==0){
				$(this.parentNode).remove();
			}else{
				alert(result.message);
			}
		}.bind(this))
	})





})(jQuery);	
