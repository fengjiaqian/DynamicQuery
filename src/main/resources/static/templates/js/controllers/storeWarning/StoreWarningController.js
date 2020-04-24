/**
 * 销售库存预警
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/StoreWarningService',
        ], function (app) {
    app.controller('StoreWarningController', ['$http','$scope','$filter', '$stateParams',  '$rootScope', '$state','StoreWarningService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','ExcelFileDownLoad','pagedataLoading',
        function ($http,$scope,$filter, $stateParams, $rootScope, $state,StoreWarningService, popupWinService, QueryDataService, BizSelectService,  CommonService, ExcelFileDownLoad, pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
            $scope.vo.cityId = $stateParams.cityId;
            $scope.vo.mobileNo = $stateParams.mobileNo;
            $scope.vo.storeWarningType = $stateParams.storeWarningType;

            if ($stateParams.storeWarningType == 1) {
                $scope.warningType = "零库存预警" + "（" + $stateParams.mobileNo + "）";
            } else {
                $scope.warningType = "畅销品库存预警" + "（" + $stateParams.mobileNo + "）";
            }

            $scope.vm = {
                pager: {
                    "currentPage": 1,
                    "pageSize": 20,
                    "recordCount": 0,
                    "totalPage": 1,
                    "offset": 0,
                    "previousPage": 0,
                    'index':1
                }
            };

            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

           //查询
            $scope.searchClick = function () {
            	$scope.vm.pager.index=1;
                $scope.query();
            };
            
            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.vm.pager.index=1;
                $scope.query();
            };

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });

            $scope.query = function () {
                $scope.vm.items={};
                pagedataLoading.loading();
                StoreWarningService.getList($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.items = response.data ? response.data : [];
                    }else{
                    	 bootbox.alert(response.exception);
                    }
                });
            
            };

        }]);
});