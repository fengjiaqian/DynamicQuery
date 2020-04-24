(function () {
  'use strict';

    var YJP_Service = angular.module('yjp.service', []);
    /*******************************************************************************
    * GLobal Services
    ******************************************************************************/

	/**
	 * 承诺请求(Promise Request)
	 */
  	var _promiseRequest =['$http', '$q', '$cacheFactory'];
	function promiseRequest($http, $q, $cacheFactory) {
		var self = this;
		//var lruCache = $cacheFactory('lruCache',{ capacity : 10 });
		
		this.formRequest = function(requestConfig){
        	requestConfig.headers = {
        		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        	};
        	requestConfig.transformRequest = [function (obj) {
                var str = [];
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                }                        
                return str.join("&");
            }];
        	var promise = self.request(requestConfig);
        	promise.then(function(){},function(response){
        		//TODO bjw 修改为规范的提示
    			//bootbox.alert("统一错误处理请求异常！");
        	});
        	return promise;
		},
		
		this.request = function(requestConfig) {
			return $q(function(resolve, reject) {
	
				if (angular.isUndefined(requestConfig.method)) {
					requestConfig.method = "POST";/* 默认post提交 */
				//}else{
					//requestConfig.cache = true;	
				}

                if (requestConfig.isMulti) {
                	requestConfig.headers ={
                		'Content-Type' : undefined
                	};
                	requestConfig.transformRequest = [function (obj) {
                        if (obj instanceof FormData) {
                            return obj;
                        } else if (angular.isObject(obj)) {
                            var formData = new FormData();
                            for (var p in obj) {
                                if (obj.hasOwnProperty(p)) {
                                    formData.append(p, obj[p]);
                                }
                            }
                            return formData;
                        }
                    }];
                }
                
				$http(requestConfig)
	
				.success(function(data) {
					resolve(data);
				}).error(function(reson) {
					reject(reson);
				})
			});
		}
	}
	promiseRequest.$inject = _promiseRequest;
	YJP_Service.service('QHttp', promiseRequest);
	
	/**
	 * 递归编译服务
	 */
	YJP_Service.factory('RecursionService', ['$compile', function($compile) {
	    return {
	        /**
	         * Manually compiles the element, fixing the recursion loop.
	         * @param element
	         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
	         * @returns An object containing the linking functions.
	         */
	        compile: function(element, link) {
	            // Normalize the link parameter
	            if (angular.isFunction(link)) {
	                link = {
	                    post: link
	                };
	            }

	            // Break the recursion loop by removing the contents
	            var contents = element.contents().remove();
	            var compiledContents;
	            return {
	                pre: (link && link.pre) ? link.pre : null,
	                /**
	                 * Compiles and re-adds the contents
	                 */
	                post: function(scope, element) {
	                    // Compile the contents
	                    if (!compiledContents) {
	                        compiledContents = $compile(contents);
	                    }
	                    // Re-add the compiled contents to the element
	                    compiledContents(scope, function(clone) {
	                        element.append(clone);
	                    });
	                    // Call the post-linking function, if any
	                    if (link && link.post) {
	                        link.post.apply(null, arguments);
	                    }
	                }
	            };
	        }
	    };
	}]);
	
	/**
	 * 查询数据服务<br>
	 * 1.提供查询数据的初始化功能<br>
	 * 2.提供查询数据的存放功能<br>
	 * <br>
	 * 查询数据结构<br>
	 * 
	 * <pre>
	 * //查询条件数据对象
	 * $scope.vo = {};
	 * //列表数据对象
	 * $scope.vm = {
	 * 	pages : {},//翻页数据对象
	 * 	items : []
	 * //查询结果数据集合
	 * }} 
	 * </pre>
	 */
	YJP_Service.service('QueryDataService', function() {
		/**
		 * 通过当前路由的URL,计算出哈希值，作为关键字
		 */
		function generateSchema($scope) {
			var hashCode = $scope.$state.current.templateUrl.hashcode();
			return Number(hashCode).toString(36);
		}

		function getKeys(config) {
			var cfg = {
				voKey : ["vo"],
				pageKey : ["vm","pages"],
				itemKey : ["vm","items"]
			}
			if (config != null) {
				cfg.voKey = (config.vo || "vo").split(".");
				cfg.pageKey = (config.page || "vm.pages").split(".");
				cfg.itemKey = (config.item || "vm.items").split(".");
			}
			return cfg;
		}

		function getValue(dataObj, keys) {
			if (angular.isObject(dataObj) && angular.isArray(keys)) {
				var key = keys.shift();
				if (key == null || key.trim() == "") {
					return dataObj;
				} else {
					return getValue(dataObj[key.trim()], keys);
				}
			} else {
				return null;
			}
		}

		function bindingValue(dataObj, keys, value) {
			var key = keys.shift();
			if (keys.length == 0) {
				dataObj[key.trim()] = value;
			} else {
				key = key.trim();
				if (dataObj[key] == null) {
					dataObj[key] = {};
				}
				return bindingValue(dataObj[key], keys, value);
			}
		}

		this.getDataValue = function(scope, key) {
			if (angular.isObject(scope)) {
				if (angular.isArray(key)) {
					return getValue(scope, key);
				} else if (angular.isString(key)) {
					return getValue(scope, key.split("."));
				} else {
					return null;
				}
			} else {
				return null;
			}
		}

		var self = this; // Save reference
		this.dataService = {
			default_page : {
				itemsPerPage : 20,
				index : 1,
				totalResult : 0,
				totalPage : 0
			}
		// 存储所以查询页的查询条件数据，手动刷新页面后数据会清空。
		};

		/**
		 * 初始化数据
		 */
		this.initSearchData = function($scope, config) {
			var keys = getKeys(config);

			var ds = self.dataService[generateSchema($scope)] || {};

			bindingValue($scope, keys.voKey, ds.vo || {});

			bindingValue($scope, keys.pageKey, ds.pages || self.dataService.default_page);

			bindingValue($scope, keys.itemKey, []);
		};
		/**
		 * 存储数据
		 */
		this.storeSearchData = function($scope, config) {
			var keys = getKeys(config);
			var schema = generateSchema($scope);
			if(null == self.dataService[schema]){
				self.dataService[schema] = {};
			}
			self.dataService[schema].vo = getValue($scope, keys.voKey);
			self.dataService[schema].pages = getValue($scope, keys.pageKey);
		}

		/**
		 * 清除数据
		 */
		this.clearSearchData = function($scope) {
			delete self.dataService[generateSchema($scope)];
		};

		this.getSearchData = function($scope) {
			return self.dataService[generateSchema($scope)] || {};
		};

		this.setSearchData = function($scope, data) {
			self.dataService[generateSchema($scope)] = data;
		}
	});	
})();
