
define(['app','services/WarehouseInventoryService',
        'services/CommonService', 
        'services/service'
       ], function (app) {
    app.controller('TransferInventoryController', ['$modalInstance','WarehouseInventoryService','args','popupWinService', '$state','$scope','$filter', '$http', '$rootScope', 'args','CommonService', 'WarehouseInventoryService','pagedataLoading',
        function ($modalInstance, WarehouseInventoryService, args,popupWinService,$state,$scope,$filter, $http, $rootScope, args,CommonService, WarehouseInventoryService,pagedataLoading) {
    	   
      
        $scope.vo = {};
        $scope.vo.packageCount=0;
        $scope.vo.unitCount=0;
        $scope.vo.warehouseId = args.warehouseId;
        $scope.vo.productSkuId = args.productSkuId;
        $scope.vo.beChannel = args.channel;
        //计算总库存
        $scope.totalCount = args.packageCount * parseInt(args.specName) + args.unitCount;
        //0 零售产品 1  大宗产品 2  微酒产品,剔除原本,默认选中一个
        if($scope.vo.beChannel==0){
        	$scope.vo.channel=1;
        }else if($scope.vo.beChannel==1){
        	$scope.vo.channel=0;
        }else{
        	$scope.vo.channel=0;
        }
        
       
        //获取登陆用户
        $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
    
        //处理
        $scope.ok = function () {
            $scope.query();
        };
        $scope.query = function () {
        	debugger;
        	if(($scope.vo.packageCount*parseInt(args.specName) + $scope.vo.unitCount)>$scope.totalCount){
        		bootbox.alert("转移库存不能大于原有库存!")
        		return false;
        	}
        	if($scope.vo.packageCount == 0 && $scope.vo.unitCount == 0){
        		bootbox.alert("转移库存不能为0!")
        		return false;
        	}
        	pagedataLoading.loading();
        	WarehouseInventoryService.transferInventory($scope.vo).then(function (response) {
        		pagedataLoading.unloading();
            	if (response.success == true) {
            		bootbox.alert("提交成功!", function () {
            			$modalInstance.close(response);
                    });
   	            }else{
                   bootbox.alert(response.error);
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