(function(w){
	function kQuery(selector){
		return new kQuery.fn.init(selector);
	}
	kQuery.fn = kQuery.prototype = {
		constructor:kQuery,
		init:function(selector){
			//1.布尔值
			if(!selector){
				return this;
			}
			//2.函数
			else if(typeof selector == 'function'){
				window.addEventListener('DOMContentLoaded',selector);
				this[0] = document;
				this.length = 1;
				return this;
			}
			//3.字符串
			else if(kQuery.isString(selector)){
				//3.1 html代码
				if(kQuery.isHtml(selector)){
					var domTemp = document.createElement('div');
					dom.innerHTML = selector;
					for(var i=0;i<domTemp.children.length;i++){
						this[i] = domTemp.children[i];
						
					}
					this.length = domTemp.children.length;
				}//3.2 选择器
				else{
					var doms = document.querySelectorAll(selector);
					for(var i=0;)
				}
			}
		}
	}

	kQuery.isHtml = function(str){
		return /<[^<>]+>/.test(str);
	}
	kQuery.isString = function(str){
		return typeof str == 'string';
	}
	kQuery.isArray = function(str){
		return typeof str == 'object' && length in object;
	}
	kQuery.fn.init.prototype = kQuery.fn;
	w.kQuery = w.$ = kQuery;
})(window);