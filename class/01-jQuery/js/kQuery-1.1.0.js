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
			else if(kQuery.isFunction(selector)){
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
					domTemp.innerHTML = selector;
					for(var i=0;i<domTemp.children.length;i++){
						this[i] = domTemp.children[i];
					}
					this.length = domTemp.children.length;
				}//3.2 选择器
				else{
					var doms = document.querySelectorAll(selector);
					for(var i=0;i<doms.length;i++){
						this[i] = doms[i];
					}
					this.length = doms.length;
				}
			}
			//4.数组
			else if(kQuery.isArray(selector)){
				for(var i=0;i<selector.length;i++){
					this[i] = selector[i];
				}
				this.length = selector.length;
			}
			//5.对象
			else{
				this[0] = selector;
				this.length = 1;
			}
		},
		get:function(num){

			if(num){//是否传参
				if(kQuery.isNumber(num)){//参数是否是num
					if(num >= 0){
						return this[num];
					}else{
						//0 1 2 3 
						//3 = 4 + -1
						return this[this.length + num];
					}
				}
			}else{
				var arr = [];
				for(var i=0;i<this.length;i++){
					arr.push(this[i]);
				}
				return arr;
			}

		}

	}
	kQuery.fn.extend = kQuery.extend= function(options){
		// console.log(this == kQuery.fn);//true
		for(key in options){
			this[key] = options[key];
		}
	}
	kQuery.fn.extend({
		set:function(){
			console.log('set extend');
		}
	})
	kQuery.extend({
		setExtend:function(){
			console.log('set setExtend');
		}
	})
	kQuery.extend({
		isFunction : function(str){
			return typeof str == 'function';
		},
		isNumber : function(str){
			return typeof str == 'number';
		},
		isHtml : function(str){
			return /<[^<>]+>/.test(str);
		},
		isString : function(str){
			return typeof str == 'string';
		},
		isArray : function(str){
			return typeof str == 'object' && length in str;
		},
		each:function(arr,fn){
			if(kQuery.isArray(arr)){
				for(var i=0;i<arr.length;i++){
					var res = fn.call(arr[i],i,arr[i]);
					if(res == false){
						break
					}else if(res == true){
						continue
					}						
				}
			}else{
				for(var key in arr){
					var res = fn.call(arr[key],key,arr[key])
					if(res == false){
						break
					}else if(res == true){
						continue
					}	

				}
			}
			return arr;
		},
		map:function(arr,fn){
			var result = [];
			if(kQuery.isArray(arr)){
				for(var i=0;i<arr.length;i++){
					var res = fn.(arr[i],i);
					if(res){
						result.push(res)
					}
				}
			}else{
				for(var key in arr){
					var res = fn.(arr[key],key);
					if(res){
						result.push(res)
					}
				}
			}
			return result
		}				
	})	

	kQuery.fn.init.prototype = kQuery.fn;
	w.kQuery = w.$ = kQuery;
})(window);