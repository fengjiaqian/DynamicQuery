
define(['app','services/WarehouseInventoryService',
        'services/CommonService', 
        'services/service'
       ], function (app) {
    app.controller('ModifyWarehouseInvertoryController', ['$modalInstance','WarehouseInventoryService','args','popupWinService', '$state','$scope','$filter', '$http', '$rootScope', 'args','CommonService', 'WarehouseInventoryService','pagedataLoading',
        function ($modalInstance, WarehouseInventoryService, args,popupWinService,$state,$scope,$filter, $http, $rootScope, args,CommonService, WarehouseInventoryService,pagedataLoading) {
    	   
      
        $scope.vo = {};
        $scope.vo.packageCount=0;
        $scope.vo.unitCount=0;
        $scope.vo.hasUpdateOPInventory = true;
        $scope.vo.secOwnerId = args.secOwnerId;
        $scope.isAdd=false;
        if(args.type==1){
        	$scope.isAdd=true
        }
        if(args.type==1){
        	 $scope.vo.productSkuId = args.productSkuId;
        	 $scope.vo.warehouseId = null;
        }else{
        	 $scope.vo.warehouseId = args.warehouseId;
             $scope.vo.productSkuId = args.productSkuId;
        }
        
        if(args.type==1){
        	$scope.vo.channel = 0;
        }else{
        	$scope.vo.channel = args.channel;
        }
        
        //获取登陆用户
        $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
    
        //处理
        $scope.ok = function () {
            $scope.query();
        };
        $scope.query = function () {
        	
        	if($scope.vo.hasUpdateOPInventory == true){
        		$scope.vo.hasUpdateOPInventory = 1;
        	}else{
        		$scope.vo.hasUpdateOPInventory = 0;
        	}
        	pagedataLoading.loading();
        	WarehouseInventoryService.modWarehouseInventory($scope.vo).then(function (response) {
        		pagedataLoading.unloading();
            	if (response.success == true) {
            		bootbox.alert("提交成功!", function () {
            			$modalInstance.close(response);
                    });
   	            }else{
                   bootbox.alert(response.error);
                }
            	if($scope.vo.hasUpdateOPInventory == 1){
            		$scope.vo.hasUpdateOPInventory = true;
            	}else{
            		$scope.vo.hasUpdateOPInventory = false;
            	}
            });
        
        };
       
        // 取消按钮
        $scope.cancel = function () {
            // 跳转到列表页面
            $modalInstance.dismiss('cancel');
        };
        
        
         
        }]);

});