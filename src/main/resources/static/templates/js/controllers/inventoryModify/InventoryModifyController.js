/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/InventoryModifyService',
        ], function (app) {
    app.controller('InventoryModifyController', ['$http','$window','$scope','$filter', '$rootScope', '$state','InventoryModifyService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$window,$scope,$filter, $rootScope, $state,InventoryModifyService,popupWinService,QueryDataService , BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vo.packageCount=0;
            $scope.vo.unitCount=0;
            $scope.vo.hasUpdateOPInventory = false;
            
            
            //处理
            $scope.send = function () {
                $scope.query();
            };
            $scope.query = function () {
            	
            	if($scope.vo.hasUpdateOPInventory == true){
            		$scope.vo.hasUpdateOPInventory = 1;
            	}else{
            		$scope.vo.hasUpdateOPInventory = 0;
            	}
            	pagedataLoading.loading();
            	InventoryModifyService.send($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show('提交成功！');
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                	if($scope.vo.hasUpdateOPInventory == 1){
                		$scope.vo.hasUpdateOPInventory = true;
                	}else{
                		$scope.vo.hasUpdateOPInventory = false;
                	}
                });
            	$scope.warehouseInventoryCount=undefined;
            
            };
            $scope.queryInventory=function(){
            	pagedataLoading.loading();
            	InventoryModifyService.queryInventory($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                   $scope.warehouseInventoryCount=response.data;
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                	if($scope.vo.hasUpdateOPInventory == 1){
                		$scope.vo.hasUpdateOPInventory = true;
                	}else{
                		$scope.vo.hasUpdateOPInventory = false;
                	}
                });
            }
         
        }]);
});