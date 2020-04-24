
define(['app','services/WarehouseInventoryCheckRecordService',
        'services/CommonService', 
        'services/service'
       ], function (app) {
    app.controller('MarkInventoryCheckRecordController', ['$modalInstance','WarehouseInventoryCheckRecordService','args','popupWinService', '$state','$scope','$filter', '$http', '$rootScope', 'CommonService','pagedataLoading',
        function ($modalInstance, WarehouseInventoryCheckRecordService, args,popupWinService,$state,$scope,$filter, $http, $rootScope, CommonService ,pagedataLoading) {
    	   
      
            $scope.vo = {};
            $scope.vo.id = args.id;
            $scope.vo.remark = args.remark;

            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            //处理
            $scope.ok = function () {
                $scope.query();
            };
            $scope.query = function () {
                pagedataLoading.loading();
                WarehouseInventoryCheckRecordService.markInventoryCheckRecord($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success == true) {
                        bootbox.alert("处理成功!", function () {
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