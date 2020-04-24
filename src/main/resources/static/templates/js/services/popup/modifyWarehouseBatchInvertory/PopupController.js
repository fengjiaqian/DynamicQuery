
define(['app','services/WarehouseBatchInventoryService',
        'services/CommonService', 
        'services/service'
       ], function (app) {
    app.controller('ModifyWarehouseBatchInvertoryController', ['$modalInstance','WarehouseBatchInventoryService','args','popupWinService', '$state','$scope','$filter', '$http', '$rootScope', 'CommonService','pagedataLoading',
        function ($modalInstance, WarehouseBatchInventoryService, args,popupWinService,$state,$scope,$filter, $http, $rootScope, CommonService ,pagedataLoading) {
    	   
      
        $scope.vo = {};
        $scope.vo.packageCount = 0;
        $scope.vo.unitCount = 0;
        $scope.isAdd=false;

        $scope.vo.id = args.storeBatchId;
        $scope.vo.packageQuantity = args.packageQuantity;
        $scope.vo.batchAttributeInfoNo = args.batchAttributeInfoNo;

        //获取登陆用户
        $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
    
        //处理
        $scope.ok = function () {
            $scope.query();
        };
        $scope.query = function () {
            $scope.vo.totalCount = $scope.vo.packageCount * $scope.vo.packageQuantity + $scope.vo.unitCount;
            console.log("变更数量：" + $scope.vo.totalCount);
        	pagedataLoading.loading();

            WarehouseBatchInventoryService.modWarehouseBatchInventory($scope.vo).then(function (response) {
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