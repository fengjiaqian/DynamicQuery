/**
 * 货位库存变更明细列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/WarehouseBatchInventoryService',
        ], function (app) {
    app.controller('BatchInventoryDetailController', ['$http','$scope','$filter', '$stateParams', '$rootScope', '$state','WarehouseBatchInventoryService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $stateParams, $rootScope, $state,WarehouseBatchInventoryService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.vo.state = 0;

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

            $scope.vo.warehouseId = $stateParams.warehouseId;
            $scope.vo.storeBatchId = $stateParams.storeBatchId;
            $scope.vo.changeRecordId = $stateParams.changeRecordId;

            $scope.productName = $stateParams.productName;
            $scope.productInfoSpecName = $stateParams.productInfoSpecName;
            $scope.warehouseName = $stateParams.warehouseName;

            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            //查询
            $scope.searchClick = function () {
                $scope.vm.pager.index=1;
                $scope.query();
            };

            //重置
            $scope.resetClick = function () {
                $scope.cityVo = {};
                $scope.vm.pager.index=1;
                $scope.query();
            };

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });
            
            $scope.query = function () {
                $scope.vo.pageNum=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                $scope.vm.items={};
                pagedataLoading.loading();
                console.log("货位库存变更明细参数:" + $scope.vo.storeBatchId + "-" + $scope.vo.warehouseId + "-" + $scope.vo.changeRecordId);
                WarehouseBatchInventoryService.getBatchInventoryDetail($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.items = response.data? response.data.dataList:null;
                        $scope.vm.pager.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pager.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pager.totalPage = response.data? response.data.pager.totalPage:0;
                    }else{
                    	 bootbox.alert(response.exception);
                    }
                });
            };

        }]);
});