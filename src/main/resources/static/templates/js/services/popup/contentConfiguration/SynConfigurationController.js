define(['app', 'services/contentConfigurationService','services/service',], function (app) {

    app.controller('SynConfigurationController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService', 'SynConfigurationService', 'popupWinService','ContentConfigurationService',
            function ($modalInstance, $scope, $rootScope, args, UserService,SynConfigurationService,  popupWinService,ContentConfigurationService) {
               
                $scope.vo = {};
                $scope.data = args;
                $scope.cityVo = {};
                //获取登陆用户
                $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
                //加载
                $scope.updateIndex = -1;

                $scope.vo =args;
                var listStoreIds = $scope.vo.contentValue.split("、");
                $scope.selectList = [];
                listStoreIds.forEach(function(v){
                    var keyValue = {};
                    keyValue.id=v;
                    keyValue.name=v;
                    $scope.selectList.push(keyValue)
                });



                //提交
                $scope.ok = function () {
                    if($scope.vo.synApply != true){
                        $scope.vo.synApply=false;
                    }
                    if($scope.vo.synInStock != true){
                        $scope.vo.synInStock=false;
                    }
                    if($scope.vo.storehouseId==null){
                        bootbox.alert("请选择合适的值");
                        $modalInstance.close();
                    }
                    var arg = {
                        storehouseId:$scope.vo.storehouseId,
                        synApply:$scope.vo.synApply,
                        synInStock:$scope.vo.synInStock,
                    };

                    ContentConfigurationService.syn(arg).then(function (response) {
                    	if(response.success==true){
                    		$modalInstance.close(response);
                    	}else{
                    		bootbox.alert(response.error);
                            $modalInstance.close(response);
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