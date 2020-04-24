/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/DeliveryFactorService',
        'services/popup/deliveryFactor/FactorService'
        ], function (app) {
    app.controller('DeliveryFactorController', ['$http','$scope','$filter', '$rootScope', '$state','DeliveryFactorService','FactorService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','ExcelFileDownLoad','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,DeliveryFactorService,FactorService,popupWinService, QueryDataService, BizSelectService,  CommonService,ExcelFileDownLoad,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.vo.precise=false;
            $scope.isDisabled=false;
         
            $scope.vm = {
                    pager: {
                        "currentPage": 1,
                        "pageSize": 20,
                        "recordCount": 0,
                        "totalPage": 1,
                        "offset": 0,
                        "previousPage": 0,
                        'index':1
                    }
            };
            
            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
            //若为城市管理员\出纳    城市固定
            $scope.initCity=function(){
            	if($scope.userInfo.userRole=='CityAdmin' || $scope.userInfo.userRole=='Cashier'){
            	    $scope.isDisabled=true;
            		$scope.cityVo.cityObj={};
                	$scope.cityVo.provinceObj = $scope.userInfo.city.province;
                	$scope.cityVo.cityId = $scope.userInfo.city.cityId;
                }
            }
            $scope.initCity();

           //查询
            $scope.searchClick = function () {
            	$scope.vm.pager.index=1;
                $scope.query();
            };
            
            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.vo.precise=false;
                if($scope.userInfo.userRole!='CityAdmin'){
                	 $scope.cityVo = {};
                }
                $scope.vm.pager.index=1;
                $scope.query();
            };

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });
            $scope.query = function () {
                QueryDataService.storeSearchData($scope);
                if($scope.vo.precise){
                	$scope.vo.precise=1;
                }else{
                	$scope.vo.precise=0;
                }
                $scope.ids=[]; 
                $scope.vo.master=false;
                $scope.vo.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                $scope.vo.pageNum=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                $scope.vm.items={};
                pagedataLoading.loading();
                DeliveryFactorService.getSkuList($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.items = response.data? response.data.dataList:null;
                        $scope.vm.pager.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pager.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pager.totalPage = response.data? response.data.pager.totalPage:0;
                    }else{
                    	 bootbox.alert(response.error);
                    }
                    if($scope.vo.precise==1){
                    	$scope.vo.precise=true;
                    }else{
                    	$scope.vo.precise=false;
                    }
                });
            
            };
            
            
            //复选框 操作*********************************************************
            $scope.ids=[];
            $scope.checkAll = function (c, v) {//全选************
                if (c == true) {
                    angular.forEach(v, function (item) {
                	    	item.flag=true;
                            updateSelected('add', item, '');
                    });
                } else {
                    angular.forEach(v, function (item) {
                    		item.flag=false;
                            updateSelected('remove', item, '');
                    });
                }
            };//全选 end **************************************

            var updateSelected = function (action, item, name) {
                if (action == 'add' && $scope.ids.indexOf(item.skuId) == -1) {
                    $scope.ids.push(item.skuId);
                }
                if (action == 'remove' && $scope.ids.indexOf(item.skuId) != -1) {
                    var idx = $scope.ids.indexOf(item.skuId);
                    $scope.ids.splice(idx, 1);
                }
            }

            $scope.updateSelection = function ($event, item) {
                var checkbox = $event.target;
                var action = (checkbox.checked ? 'add' : 'remove');
                updateSelected(action, item, checkbox.name);
            }
            
            
            //复选框 操作 end******************************************************
          
            //单个编辑和批量编辑
            $scope.editFactor=function(skuId){
            	$scope.pa={};
            	$scope.pa.ids=[];
            	if(skuId){
            		$scope.pa.ids.push(skuId);
            		$scope.pa.type='si';
            	}else{
            		$scope.pa.ids=$scope.ids;
            		$scope.pa.type='mu';
            	}
            	if($scope.pa.ids.length==0){
            		popupWinService.show("请选择需处理的产品！");
            		return false;
            	}
            	
            	//编辑配送系数弹窗
            	FactorService.popup($scope.pa).then(function(data){
            		  if(data.success==true){
            			  bootbox.alert("编辑成功!", function () {
            				  $scope.query();
                          });
            		  }else{
            			  bootbox.alert(response.error);
            		  }
            	})
            	
            }
            /**
             * 导出excel表格
             */
            $scope.data={}
            $scope.exportExcel = function () {
            	if($scope.vo.precise){
                	$scope.data.precise=1;
                }else{
                	$scope.data.precise=0;
                }
            	$scope.data.productName=$scope.vo.productName
                $scope.data.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                $scope.data.pageNum=$scope.vm.pager.index;
                $scope.data.pageSize=$scope.vm.pager.recordCount;
                ExcelFileDownLoad.downLoad("/templates/distributionReportDetail/downloadExcel",$scope.data,"配送系数");
            };
        }]);
});