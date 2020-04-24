define(['app', 'services/contentConfigurationService','services/service',], function (app) {

    app.controller('UpdateConfigurationController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService', 'UpdateConfigurationService', 'popupWinService','ContentConfigurationService',
            function ($modalInstance, $scope, $rootScope, args, UserService, UpdateConfigurationService, popupWinService,ContentConfigurationService) {
               
                $scope.vo = {};
                $scope.data = args;
                $scope.cityVo = {};
                //获取登陆用户
                $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
                //加载
                $scope.updateIndex = -1;

                $scope.vo =args;
                //提交
                $scope.ok = function () {
                    var arg = {
                        id:$scope.vo.id,
                        orgid:$scope.vo.orgid,
                        contentKey:$scope.vo.contentKey,
                        contentValue:$scope.vo.contentValue,
                        contentType:$scope.vo.contentType,
                        remark:$scope.vo.remark,
                        createuser:$scope.vo.createuser,
                        lastupdateuser:$scope.userInfo.userId,
                    };

                    ContentConfigurationService.edit(arg).then(function (response) {
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