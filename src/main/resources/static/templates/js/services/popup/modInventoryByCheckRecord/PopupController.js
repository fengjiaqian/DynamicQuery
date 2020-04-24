
define(['app','services/WarehouseInventoryCheckRecordService',
        'services/CommonService', 
        'services/service'
       ], function (app) {
    app.controller('ModInventoryByCheckRecordController', ['$modalInstance','WarehouseInventoryCheckRecordService','args','popupWinService', '$state','$scope','$filter', '$http', '$rootScope', 'CommonService','pagedataLoading',
        function ($modalInstance, WarehouseInventoryCheckRecordService, args,popupWinService,$state,$scope,$filter, $http, $rootScope, CommonService ,pagedataLoading) {
    	   
      
            $scope.vo = {};
            $scope.vo.channel = 0;
            $scope.vo.warehouseId = args.warehouseId;
            $scope.vo.productSkuId = args.productSkuId;
            $scope.vo.packageCount = args.diffMaxCount;
            $scope.vo.unitCount = args.diffMinCount;
            $scope.vo.orderType = 98; // 单据类型默认“矫正库存”
            $scope.vo.jiupiEventType = 98; // 酒批事件类型默认“手动修改”

            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            //处理
            $scope.ok = function () {
                $scope.query();
            };
            $scope.query = function () {
                pagedataLoading.loading();
                WarehouseInventoryCheckRecordService.modWarehouseInventoryByCheckRecord($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success == true) {
                        bootbox.alert("修改成功!", function () {
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