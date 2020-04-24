define(['app', 'services/dynamicSqlQueryConfigService','services/service',], function (app) {

    app.controller('AddSqlQueryConfigController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService', 'DynamicSqlQueryConfigService', 'popupWinService',
            function ($modalInstance, $scope, $rootScope, args, UserService, DynamicSqlQueryConfigService, popupWinService) {
                $scope.vo = {};
                //获取登陆用户
                $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));
                //提交
                $scope.ok = function () {
                    var sqlStr = $scope.vo.taskStr; 
                    sqlStr = sqlStr.toLowerCase().replace(/\r\n/ig," ").replace(/\s+/ig," ").replace(/(^\s*)|(\s*$)/g, "");
                    if(sqlStr.indexOf('insert') > -1){
                	   alert("该语句有插入操作，系统禁止插入!");
                	   return;
                    }
                    if(sqlStr.indexOf('update') > -1){
                	   alert("该语句有更新操作，系统禁止更新!");
                	   return;
                    }
                    if(sqlStr.indexOf('delete') > -1){
                	   alert("该语句有删除操作，系统禁止删除!");
                	   return;
                    }
                    var arg = {
                        	taskName:$scope.vo.taskName,
                        	parameters:$scope.vo.parameters,
                        	columnStr:$scope.vo.columnStr,
                        	taskStr:$scope.vo.taskStr,
                        	createUser:$scope.userInfo.userId,

                    };
                    DynamicSqlQueryConfigService.addSqlReport(arg).then(function (response) {
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