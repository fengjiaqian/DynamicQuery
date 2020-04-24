/**
 * 收货配置-列表
 */
define(['app', 'directives/biz-Select',
    'services/InStockConfigService',
    'services/EarningReportService',
    'services/CommonService',
    'services/service',
    'services/WarehouseInventoryService',
], function (app) {
    app.controller('InStockConfigAddController', ['$http', '$scope', 'findDictionaryByCodeService', 'productDisplayCategoryService', 'InStockConfigService','EarningReportService','pagedataLoading','WarehouseInventoryService',
        function ($http, $scope, findDictionaryByCodeService, productDisplayCategoryService, InStockConfigService, EarningReportService, pagedataLoading,WarehouseInventoryService) {
            $scope.vo = {};
            $scope.vo.status = 0;
            //仓库集合
            $scope.vo.warehouseList = [];
            //一级类目集合
            $scope.vo.oneCategoryList = [];
            //二级类目集合
            $scope.vo.twoCategoryList = [];
            //特殊产品集合
            $scope.vo.productList = [];
            $scope.cityVo = {};
            $scope.vm = {};
            $scope.vm = {
            	pages: {
                    "pageIndex": 1,
                    "pageSize": 20,
                    "totalCount": 0,
                    "totalPage": 1,
                    "offset": 0,
                    "previousPage": 0,
                    'index': 1
                }
            };
            $scope.constraintArr = [
                                   {name: '强制录入生产日期', id: 1, flag: false},
                                   {name: '强制拍生产日期照片', id: 2, flag: false},
                                   {name: '强制填写保质期', id: 3, flag: false},
                                   {name: '强制要求扫码', id: 4, flag: false}
                               ];
            //获取登陆用户
            $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));
            $scope.getWarehouse = function () {
            	if($scope.cityVo.cityId){
            		pagedataLoading.loading(); 
                	EarningReportService.getWareHouseList($scope.cityVo).then(function (response) {
                		  pagedataLoading.unloading();
                          if (response.success == true) {
	                          	if(response.data.dataList.length>0){
	                          		if ($scope.warehouseArr && $scope.warehouseArr.length > 0) {
	                          			angular.forEach(response.data.dataList, function(newWarehouse){
	                          				var oldWarehouse = $scope.warehouseArr.find(function(v,i,arr){
	                          					return v.id == newWarehouse.id;
	                          				});
	                          				if (!oldWarehouse) {
	                          					$scope.warehouseArr.push(newWarehouse);
	                          				}
		                          		});
	                          		} else {
	                          			$scope.warehouseArr = response.data.dataList;
	                          		}
	                          	} else {
	                          		bootbox.alert('无仓库列表!');
	                          	}
                          }else{
                        	  bootbox.alert(response.error);
                          }
                    })
            	} else {
            		bootbox.alert('请选择城市!');
            	}
            }
            
            $scope.save = function () {
               if (!$scope.vo.configName) {
     			   bootbox.alert('策略名称不能为空！');
     			   return false;
     		   }
               if ($scope.vo.oneCategoryList.length == 0 
            		   && $scope.vo.twoCategoryList.length == 0 
            		   && $scope.vo.productList.length == 0) {
     			   bootbox.alert('一级类目、二级类目、特殊产品必须要配置一项！');
     			   return false;
     		   }
               if (($scope.vo.remindType1 && $scope.vo.remindType2) 
            		   || (!$scope.vo.remindType1 && !$scope.vo.remindType2)) {
            	   bootbox.alert('入库提醒只能二填一！');
     			   return false;
               }
               if ($scope.vo.remindType1 && !$scope.vo.remindType1.match('^\\d+[/]\\d+$')) {
            	   bootbox.alert('入库提醒比例填写不符合规范！');
     			   return false;
               }
               if ($scope.vo.banType1 && !$scope.vo.banType1.match('^\\d+[/]\\d+$')) {
            	   bootbox.alert('禁止入库比例填写不符合规范！');
     			   return false;
               }
               $scope.vo.remindCondition = $scope.vo.remindType1?$scope.vo.remindType1:$scope.vo.remindType2;
               
               if (($scope.vo.banType1 && $scope.vo.banType2) 
            		   || (!$scope.vo.banType1 && !$scope.vo.banType2)) {
            	   bootbox.alert('禁止入库只能二填一！');
     			   return false;
               }
               $scope.vo.banCondition = $scope.vo.banType1?$scope.vo.banType1:$scope.vo.banType2;
               $scope.vo.createUser=$scope.userInfo.userId;
               $scope.vo.status=1;
               InStockConfigService.addInStockConfig($scope.vo).then(function (response) {
	               	if(response.success==true){
	               		bootbox.alert('入库校验策略添加成功！');
	               		window.location='index.html#/inStockConfig';
	               	} else {
	               		bootbox.alert(response.error);
	               	}
               });
            }
            
           //全选
           $scope.checkAll = function (c, v, type) {//全选
                if (c == true) {
                	//全选一级类目时
             	    if (type == 2) {
             	       if ($scope.vo.productList.length > 0) {
             			   bootbox.alert('已选择产品无法再选择一级类目');
             			   return false;
             		   }
             	    }
                	//全选二级类目时
             	    if (type == 3) {
             	       if ($scope.vo.productList.length > 0) {
             			   bootbox.alert('已选择产品无法再选择二级类目');
             			   return false;
             		   }
             		   var checkindex = $scope.vo.oneCategoryList.findIndex(function(x){
             			   return x.onecategoryId == $scope.onecategoryIdTab;
             		   });
             		   if (checkindex != -1) {
             			   bootbox.alert('已选择这些二级类目的一级类目【' + $scope.onecategoryNameTab+'】');
             			   return false;
             		   }
             	    }
                    angular.forEach(v, function (item) {
                	    	item.flag=true;
                	    	$scope.updateSelection(item, type);
                    });
                } else {
                    angular.forEach(v, function (item) {
                    		item.flag=false;
                    		$scope.updateSelection(item, type);
                    });
                }
            }
           //勾选或移除集合数据
           $scope.updateSelection = function (item, type) {
               if (item.flag == true) {
            	   //勾选仓库
            	   if (type == 1) {
            		   var index = $scope.vo.warehouseList.findIndex(function(x){
            			   return x.warehouseId == item.id;
            		   });
                	   if (index == -1) {
                		   $scope.vo.warehouseList.push({warehouseId:item.id, warehouseName:item.name});
                	   }
            	   }
            	   //勾选一级类目
            	   if (type == 2) {
            		   if ($scope.vo.productList.length > 0) {
            			   item.flag = false;
            			   bootbox.alert('已选择产品无法再选择一级类目');
            			   return false;
            		   }
            		   var checkindex = $scope.vo.twoCategoryList.findIndex(function(x){
            			   return x.onecategoryId == item.id;
            		   });
            		   if (checkindex != -1) {
            			   item.flag = false;
            			   bootbox.alert('已选择一级类目【' + item.name + '】的二级类目!');
            			   return false;
            		   }
            		   var index = $scope.vo.oneCategoryList.findIndex(function(x){
            			   return x.onecategoryId == item.id && x.twocategoryId == null;
            		   });
                	   if (index == -1) {
                		   $scope.vo.oneCategoryList.push({onecategoryId:item.id, onecategoryname:item.name});
                	   }
            	   }
            	   //勾选二级类目
            	   if (type == 3) {
            		   if ($scope.vo.productList.length > 0) {
            			   item.flag = false;
            			   bootbox.alert('已选择产品无法再选择二级类目');
            			   return false;
            		   }
            		   var checkindex = $scope.vo.oneCategoryList.findIndex(function(x){
            			   return x.onecategoryId == $scope.onecategoryIdTab;
            		   });
            		   if (checkindex != -1) {
            			   item.flag = false;
            			   bootbox.alert('已选择二级类目【' + item.name + '】的一级类目【' + $scope.onecategoryNameTab+'】');
            			   return false;
            		   }
            		   var index = $scope.vo.twoCategoryList.findIndex(function(x){
            			   return x.twocategoryId == item.id;
            		   });
                	   if (index == -1) {
                		   $scope.vo.twoCategoryList.push({onecategoryId:$scope.onecategoryIdTab, onecategoryname:$scope.onecategoryNameTab, twocategoryId:item.id, twocategoryname:item.name});
                	   }
            	   }
            	   //勾选产品
            	   if (type == 4) {
            		   if ($scope.vo.oneCategoryList.length > 0 || $scope.vo.twoCategoryList.length > 0) {
            			   item.flag = false;
            			   bootbox.alert('已选择类目无法再选择产品');
            			   return false;
            		   }
            		   var index = $scope.vo.productList.findIndex(function(x){
            			   return x.productskuspecId == item.productSkuId;
            		   });
                	   if (index == -1) {
                		   $scope.vo.productList.push({
                			   categoryname:item.cityName,
                			   brandname:item.productBrand,
                			   productskuspecId:item.productSkuId, 
                			   productname:item.productName,
                			   supplier:item.specName});
                	   }
            	   }
            	   //勾选强制校验条件
            	   if (type == 5) {
            		   $scope.vo.constraintCondition="";
            		   $scope.constraintArr.forEach(function(v){
            			   if (v.flag) {
            				   $scope.vo.constraintCondition = $scope.vo.constraintCondition + v.id + ",";
            			   }
            		   });
            		   if ($scope.vo.constraintCondition) {
            			   $scope.vo.constraintCondition = $scope.vo.constraintCondition.substring(0,$scope.vo.constraintCondition.length-1)
            		   }
            	   }
               } else {
            	   //移除仓库
            	   if (type == 1) {
            		   var index = $scope.vo.warehouseList.findIndex(function(x){
            			   return x.warehouseId == item.id;
            		   });
            		   if (index > -1){
            			   $scope.vo.warehouseList.splice(index, 1);
            		   }
            	   }
            	   //移除一级类目
            	   if (type == 2) {
            		   var index = $scope.vo.oneCategoryList.findIndex(function(x){
            			   return x.onecategoryId == item.id && x.twocategoryId == null;
            		   });
            		   if (index > -1){
            			   $scope.vo.oneCategoryList.splice(index, 1);
            		   }
            	   }
            	   //移除二级类目
            	   if (type == 3) {
            		   var index = $scope.vo.twoCategoryList.findIndex(function(x){
            			   return x.twocategoryId == item.id;
            		   });
            		   if (index > -1){
            			   $scope.vo.twoCategoryList.splice(index, 1);
            		   }
            	   }
            	   //移除产品
            	   if (type == 4) {
            		   var index = $scope.vo.productList.findIndex(function(x){
            			   return x.productskuspecId == item.productSkuId;
            		   });
            		   if (index > -1){
            			   $scope.vo.productList.splice(index, 1);
            		   }
            	   }
            	   //勾选强制校验条件
            	   if (type == 5) {
            		   $scope.vo.constraintCondition="";
            		   $scope.constraintArr.forEach(function(v){
            			   if (v.flag) {
            				   $scope.vo.constraintCondition = $scope.vo.constraintCondition + v.id + ",";
            			   }
            		   });
            		   if ($scope.vo.constraintCondition) {
            			   $scope.vo.constraintCondition = $scope.vo.constraintCondition.substring(0,$scope.vo.constraintCondition.length-1)
            		   }
            	   }
               }
               
           };

            // 一级类目tab页签切换
		    $scope.selectOne = function (id) {
		    	var levelOneVO = $scope.levelOneArr.find(function(v){
		    		return v.id == id;
		    	})
		    	$scope.levelTwoArr = levelOneVO.childs;
		    	//设置tab页签一级类目ID和名称
				$scope.onecategoryIdTab = levelOneVO.id;
				$scope.onecategoryNameTab = levelOneVO.name;
		    }
		    
			//获取产品展示类目列表
			var findProductDisplayCategoryList = function(){
				InStockConfigService.findCategorys().then(function(response){
					if(response.success){
						$scope.levelOneArr = response.data;
						$scope.levelTwoArr = response.data[0].childs;
						//设置默认的tab页签一级类目ID和名称
						$scope.onecategoryIdTab = response.data[0].id;
						$scope.onecategoryNameTab = response.data[0].name;
						//查询策略信息并初始化到界面
					}
				})
			}
			findProductDisplayCategoryList();
			
			//查询
            $scope.searchClick = function () {
            	$scope.vm.pages.index=1;
            	if ($scope.vo.secondCategoryId) {
                    $scope.vo.categoryId = $scope.vo.secondCategoryId;
                } else if ($scope.vo.firstCategoryId) {
                    $scope.vo.categoryId = $scope.vo.firstCategoryId;
                } else {
                    $scope.vo.categoryId = "";
                }
                $scope.query();
            };
            
            //重置
            $scope.resetClick = function () {
                $scope.queryvo = {};
                $scope.categoryVo = {};
                $scope.vm.pages.index=1;
                $scope.query();
            };
            
            //查询特殊产品
            $scope.query = function () {
            	if ($scope.vo.secondCategoryId) {
                    $scope.vo.categoryId = $scope.vo.secondCategoryId;
                } else if ($scope.vo.firstCategoryId) {
                    $scope.vo.categoryId = $scope.vo.firstCategoryId;
                } else {
                    $scope.vo.categoryId = "";
                }
                $scope.vo.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                $scope.vo.currentPage=$scope.vm.pages.index;
                $scope.vo.pageSize=$scope.vm.pages.pageSize;
                $scope.vo.pageSize=5;
                $scope.vm.items={};
                pagedataLoading.loading();
                WarehouseInventoryService.getList($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        var trItems = [];
                        var seq = 0;
                        $scope.vm.items = response.data? response.data.dataList:null;
                        $scope.vm.pages.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pages.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pages.totalPage = response.data? response.data.pager.totalPage:0;
                        $scope.vm.pages.itemsPerPage = response.data? response.data.pager.pageSize:0;
                        $scope.levelSpecialArr = response.data.dataList;
                        //重新查询后把之前勾选的数据再勾选上
                        $scope.levelSpecialArr.forEach(function(item){
                        	var index = $scope.vo.productList.findIndex(function(x){
                  			   return x.productskuspecId == item.productSkuId;
                  		    });
                  		    if (index > -1){
                  		    	item.flag=true;
                  		    }
                        });
                    }else{
                    	 bootbox.alert(response.exception);
                    }
                });
            
            };
        }]);
});