define(['app', 'services/CitySettingsService','services/service',], function (app) {

    app.controller('SettingsController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService', 'CitySettingsService', 'popupWinService',
            function ($modalInstance, $scope, $rootScope, args, UserService, CitySettingsService, popupWinService) {
               
                $scope.vo = {};
                $scope.data = args;
                $scope.cityVo = {};
                //获取登陆用户
                $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
              
                //提交
                $scope.ok = function () {
                    var arg = {
                       city_Id:$scope.cityVo.cityId?$scope.cityVo.cityId:null,
                       discardState: $scope.vo.discardState,
                       operateUser_Id:$scope.userInfo.userId
                    };
                    if(!arg.city_Id){
                    	bootbox.alert("请选择城市!");
                    	return false;
                    }
                    CitySettingsService.addCity(arg).then(function (response) {
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