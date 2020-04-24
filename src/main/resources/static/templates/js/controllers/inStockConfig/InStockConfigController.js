/**
 * 收货配置-列表
 */
define(['app', 'directives/biz-Select',
    'services/InStockConfigService',
    'services/service',
    'services/CommonService',
    'services/EarningReportService',
], function (app) {
    app.controller('InStockConfigController', ['$http', '$scope', '$filter', '$rootScope', '$state', 'ejpJiupiCityService', 'EarningReportService', 'InStockConfigService', 'QueryDataService', 'BizSelectService', 'pagedataLoading',
        function ($http, $scope, $filter, $rootScope, $state, ejpJiupiCityService, EarningReportService, InStockConfigService, QueryDataService, BizSelectService, pagedataLoading) {

            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.jiupiCityVo = [];
            $scope.vm = {
                pager: {
                    "currentPage": 1,
                    "pageSize": 20,
                    "recordCount": 0,
                    "totalPage": 1,
                    "offset": 0,
                    "previousPage": 0,
                    'index': 1
                }
            };

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
                            bootbox.alert(response.error);
                        }
                    })
                } else {
                    bootbox.alert('请选择城市!');
                }
            };


            //查询
            $scope.searchClick = function () {
                $scope.vm.pager.index = 1;
                $scope.query();
            };

            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.vo.status = "";
                $scope.cityVo = {};
                $scope.warehouseArr = {};
                $scope.jiupiCityVo = [];
                $scope.vm.pager.index = 1;
                $scope.query();
            };


            QueryDataService.initSearchData($scope);//初始化查询数据


            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });

            $scope.query = function () {
                QueryDataService.storeSearchData($scope);
                $scope.vo.city_Id = $scope.cityVo.cityId ? $scope.cityVo.cityId : null;
                $scope.vo.pageNum = $scope.vm.pager.index;
                $scope.vo.pageSize = $scope.vm.pager.pageSize;
                $scope.vm.items = [];
                pagedataLoading.loading();
                InStockConfigService.getList($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success == true) {
                        $scope.vm.items = response.data ? response.data.dataList : null;
                        if (response.data.dataList.length > 0) {
                            angular.forEach($scope.vm.items, function (item) {
                                $scope.items
                                angular.forEach(item.constraintCondition, function (i) {

                                    if (i == 1) {
                                        item.constraintCondition = item.constraintCondition.replace(i, "强制录入生产日志");
                                    }
                                    if (i == 2) {
                                        item.constraintCondition = item.constraintCondition.replace(i, "强制拍生产日期照片");
                                    }
                                    if (i == 3) {
                                        item.constraintCondition = item.constraintCondition.replace(i, "强制填写保质期");

                                    }
                                    if (i == 4) {
                                        item.constraintCondition = item.constraintCondition.replace(i, "强制要求扫码");

                                    }
                                })
                            })

                        }
                        $scope.vm.pager.recordCount = response.data ? response.data.pager.recordCount : 0;
                        $scope.vm.pager.currentPage = response.data ? response.data.pager.currentPage : 0;
                        $scope.vm.pager.totalPage = response.data ? response.data.pager.totalPage : 0;
                    } else {
                        bootbox.alert(response.error);
                        alert("加载失败")
                    }
                });

            };

            //启用/停用状态
            $scope.pa = {};
            $scope.btnSetting = function (item) {
                $scope.pa.id = item.id;
                if (item.status == 1) {
                    $scope.pa.status = 0;
                } else {
                    $scope.pa.status = 1;
                }
                $scope.pa.lastUpdateUser = $scope.userInfo.userId;
                InStockConfigService.editStatus($scope.pa).then(function (data) {
                    if (data.success == true) {
                        $scope.vm.items.forEach(function (v) {
                            if (v.id == item.id) {
                                v.status = $scope.pa.status;
                            }
                        });

                    } else {
                        bootbox.alert(data.error);
                    }
                })

            };


            //删除
            $scope.del = function ($index, id) {
                if ($index != null) {
                    if (confirm("是否删除")) {
                        InStockConfigService.del(id).then(function (data) {
                            if (data.success == true) {
                                $scope.query();
                            } else {
                                bootbox.alert(data.error);
                            }
                        })

                    }
                }
            };

        }]);
});