define(['app', 'services/InStockConfigService','services/service', 'services/popup/inStockConfig/AddInStockService'], function (app) {

    app.controller('AddInStockController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService', 'InStockConfigService', 'popupWinService',
            function ($modalInstance, $scope, $rootScope, args, UserService, InStockConfigService, popupWinService) {
               
                $scope.vo = {};
                $scope.data = args;
                $scope.cityVo = {};
                //获取登陆用户
                $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

                $scope.vo.contentType=0;
                //提交
                $scope.ok = function () {
                    var arg = {
                        // orgid:$scope.vo.orgid,
                        contentKey:$scope.vo.contentKey,
                        contentValue:$scope.vo.contentValue,
                        contentType:$scope.vo.contentType,
                        remark:$scope.vo.remark,
                        // createuser:$scope.userInfo.userId,

                    };

                    InStockConfigService.addInStockConfig(arg).then(function (response) {
                    	if(response.success==true){
                    		$modalInstance.close(response);
                    	}else{
                    		bootbox.alert(response.error);
                    	}
                    }, function (data) {
                        $modalInstance.dismiss(data);
                    });
                };

                // 取消按钮
                $scope.cancel = function () {
                    $modalInstance.dismiss();
                };
            }]);



});