/**
 * 货位库存同步
 */
define(['app', 'directives/biz-Select',
    'services/BatchInventoryTransferService',
    'services/service',
    'services/CommonService',
    'services/EarningReportService',
], function (app) {
    app.controller('BatchInventoryTransferController', ['$http', '$scope', '$filter', '$rootScope', '$state', 'ejpJiupiCityService', 'EarningReportService', 'BatchInventoryTransferService', 'QueryDataService', 'BizSelectService', 'pagedataLoading',
        function ($http, $scope, $filter, $rootScope, $state, ejpJiupiCityService, EarningReportService, BatchInventoryTransferService, QueryDataService, BizSelectService, pagedataLoading) {

            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.jiupiCityVo = [];

            //获取登陆用户
            $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));

            // 获取酒批城市
            var getJiupiCity = function () {
                var cityId = $scope.userInfo.city.cityId
                ejpJiupiCityService.listProvinceAllCitiesDTO(cityId).then(function (data) {
                    if (data.result === 'success') {
                        $scope.allJiupiCityList = data.list;
                    }
                })
            };
            getJiupiCity();

            $scope.initWarehouse = function () {
                $scope.vo.warehouseId = null;
            };

            //获取仓库
            $scope.getWareHouseData = function (cityId) {
                $scope.cityVo.cityId = cityId;
                if ($scope.cityVo.cityId) {
                    pagedataLoading.loading();
                    EarningReportService.getWareHouseList($scope.cityVo).then(function (response) {
                        pagedataLoading.unloading();
                        if (response.success == true) {
                            if (response.data.dataList.length > 0) {
                                $scope.warehouseArr = response.data.dataList;
                            } else {
                                bootbox.alert('无仓库列表!');
                            }
                        } else {
                            0
                            bootbox.alert(response.error);
                        }
                    })
                } else {
                    bootbox.alert('请选择城市!');
                }
            };

            // 同步货位库存
            $scope.transferClick = function () {
                // cityId warehouseId 为必填项目
                if (!$scope.vo.warehouseId) {
                    bootbox.alert('请选择仓库！');
                    return false;
                }
                pagedataLoading.loading();
                BatchInventoryTransferService.send($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success == true) {
                        bootbox.alert('货区库存转移！');
                    } else {
                        bootbox.alert(response.error);
                    }
                });
            };

            // 新增退货移库单
            $scope.addStoreTransferOrderClick = function () {
                if (!$scope.vo.warehouseId) {
                    bootbox.alert('请选择仓库！');
                    return false;
                }
                pagedataLoading.loading();
                BatchInventoryTransferService.addStoreTransferOrder($scope.vo.warehouseId).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success == true) {
                        bootbox.alert('新增退货移库单成功！');
                    } else {
                        bootbox.alert(response.error);
                    }
                });
            };

        }]);
});