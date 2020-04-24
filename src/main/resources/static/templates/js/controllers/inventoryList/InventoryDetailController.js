/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/WarehouseInventoryService',
        'services/popup/modifyWarehouseInvertoryRecord/PopupService',
        ], function (app) {
    app.controller('InventoryDetailController', ['$http','$scope','$filter','$stateParams', '$rootScope', '$state','ModifyWarehouseInvertoryRecordService','WarehouseInventoryService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $stateParams,$rootScope, $state, ModifyWarehouseInvertoryRecordService, WarehouseInventoryService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            $scope.vo = {};
            $scope.vo.productStoreRecordSO={}
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.vo.state = 0;
            $scope.vo.productStoreRecordSO.storeId=$stateParams.storeId;
         
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
            
            $scope.warehouseId = $stateParams.warehouseId;
            $scope.warehouseName = $stateParams.warehouseName;
            $scope.cityName = $stateParams.cityName;
            $scope.ownerName = $stateParams.ownerName;
            $scope.productInfoSpecName = $stateParams.productInfoSpecName;
            
            $scope.productName = $stateParams.productName;
            $scope.vo.productSkuId = $stateParams.id;

           //查询
            $scope.searchClick = function () {
            	$scope.vm.pager.index=1;
                $scope.query();
            };
            
            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.cityVo = {};
                $scope.vm.pager.index=1;
                $scope.query();
            };

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });
            
            $scope.query = function () {
                $scope.vo.currentPage=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                $scope.vm.items={};
                pagedataLoading.loading();
                WarehouseInventoryService.inventoryDetail($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.items = response.data? response.data.dataList:null;
                        angular.forEach($scope.vm.items,function (item) {
                                // 原库存数
                                item.sourceStorelarge = item.sourceStoreCountDTO.storeCountMaxUnit;
                                item.sourceStoreSmall = item.sourceStoreCountDTO.storeCountMinUnit;
                                // 变更数量
                                item.addStorelarge = item.addStoreCountDTO.storeCountMaxUnit;
                                item.addStoreSmall = item.addStoreCountDTO.storeCountMinUnit;
                                // 新库存数
                                item.newStorelarge = item.newStoreCountDTO.storeCountMaxUnit;
                                item.newStoreSmall = item.newStoreCountDTO.storeCountMinUnit;

                            });
                        $scope.vm.pager.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pager.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pager.totalPage = response.data? response.data.pager.totalPage:0;
                       
                    }else{
                    	 bootbox.alert(response.error);
                    }
                });
            
            };

            //编辑库存变更记录
            $scope.editStoreRecord=function(item){
                ModifyWarehouseInvertoryRecordService.popup(item).then(function(data){
                    if(data.success==true){
                        $scope.query();
                    }else{
                        bootbox.alert(data.error);
                    }
                })
            }
            
        }]);
});