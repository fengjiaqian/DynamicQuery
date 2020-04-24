
define(['app','services/WarehouseInventoryService',
        'services/CommonService', 
        'services/service'
       ], function (app) {
    app.controller('ModifyWarehouseInvertoryRecordController', ['$modalInstance','WarehouseInventoryService','args','popupWinService', '$state','$scope','$filter', '$http', '$rootScope', 'CommonService','pagedataLoading',
        function ($modalInstance, WarehouseInventoryService, args,popupWinService,$state,$scope,$filter, $http, $rootScope, CommonService ,pagedataLoading) {
    	   
      
            $scope.vo = {};

            $scope.vo.id = args.id;
            $scope.vo.orderType = args.orderType == null ? '': args.orderType;
            $scope.vo.orderNo = args.orderNo;
            $scope.vo.jiupiEventType = args.jiupiEventType == null ? '': args.jiupiEventType;
            $scope.vo.erpEventType = args.erpEventType == null ? '': args.erpEventType;
            $scope.vo.createUser = args.createUser;
            $scope.vo.description = args.des;

            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            //处理
            $scope.ok = function () {
                $scope.query();
            };
            $scope.query = function () {
                pagedataLoading.loading();
                WarehouseInventoryService.modWarehouseInventoryRecord($scope.vo).then(function (response) {
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