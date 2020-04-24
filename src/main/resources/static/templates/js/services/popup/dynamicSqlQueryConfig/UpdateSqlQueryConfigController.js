define(['app', 'services/dynamicSqlQueryConfigService','services/service',], function (app) {

    app.controller('UpdateSqlQueryConfigController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService', 'UpdateSqlQueryConfigService', 'popupWinService','DynamicSqlQueryConfigService',
            function ($modalInstance, $scope, $rootScope, args, UserService, UpdateSqlQueryConfigService, popupWinService,DynamicSqlQueryConfigService) {
               
                $scope.vo = {};
                $scope.data = args;
                $scope.cityVo = {};
                //获取登陆用户
                $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
                //加载
                $scope.updateIndex = -1;
                $scope.vo =args;
                $scope.filtersBox = [];
                //初始化过滤条件
                angular.forEach(args.columnStr.split(","), function(newWarehouse,index){
                	if($scope.vo.filters && $scope.vo.filters.indexOf(index+",") > -1) {
                		$scope.filtersBox.push({name: newWarehouse, id: index, flag: true})
                	} else {
                		$scope.filtersBox.push({name: newWarehouse, id: index, flag: false})
                	}
                	
          		});
               
                //提交
                $scope.ok = function () {
                    var arg = {
                        id:$scope.vo.id,
                        taskName:$scope.vo.taskName,
                        parameters:$scope.vo.parameters,
                    	columnStr:$scope.vo.columnStr,
                    	taskStr:$scope.vo.taskStr,
                        lastupdateuser:$scope.userInfo.userId,
                        filters:$scope.vo.filters
                    };

                    DynamicSqlQueryConfigService.edit(arg).then(function (response) {
                    	if(response.success==true){
                    		$modalInstance.close(response);
                    	}else{
                    		bootbox.alert(response.error);
                    	}
                    }, function (data) {
                        $modalInstance.dismiss(data);
                    });
                };
                //勾选或移除集合数据
                $scope.updateFiltersBox = function () {
                	$scope.vo.filters = "";
                	//初始化过滤条件
                    angular.forEach($scope.filtersBox, function(filter, index){
                    	if (filter.flag) {
                    		$scope.vo.filters += filter.id + ",";
                    	}
              		});
                };
                // 取消按钮
                $scope.cancel = function () {
                    $modalInstance.dismiss();
                };
            }]);



});