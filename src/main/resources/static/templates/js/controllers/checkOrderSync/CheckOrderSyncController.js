/**
 * 同步盘点单
 */
define(['app', 'directives/biz-Select',
    'services/OrderListService',
    'services/service',
    'services/CommonService',
    'services/EarningReportService',
], function (app) {
    app.controller('CheckOrderSyncController', ['$http', '$scope', '$filter', '$rootScope', '$state', 'ejpJiupiCityService', 'EarningReportService', 'OrderListService', 'QueryDataService', 'BizSelectService', 'pagedataLoading',
        function ($http, $scope, $filter, $rootScope, $state, ejpJiupiCityService, EarningReportService, OrderListService, QueryDataService, BizSelectService, pagedataLoading) {

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


            /**
             * 获取当天日期
             * @date 格式为yyyy-mm-dd的日期
             */
            $scope.currentDate = function () {
                let d = new Date();
                let month = '' + (d.getMonth() + 1);
                let day = '' + d.getDate();
                let year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            };

            /**
             * 获取上一个月的日期
             * @date 格式为yyyy-mm-dd的日期
             */
            $scope.getPreMonth = function (date) {
                let arr = date.split(' ')[0].split('-');
                let year = arr[0];      //获取当前日期的年份
                let month = arr[1];     //获取当前日期的月份
                let day = arr[2];       //获取当前日期的日
                let days = new Date(year, month, 0);
                days = days.getDate();  //获取当前日期中月的天数
                let year2 = year;
                let month2 = parseInt(month) - 1;
                if (month2 === 0) {
                    year2 = parseInt(year2) - 1;
                    month2 = 12;
                }
                let day2 = day;
                let days2 = new Date(year2, month2, 0);
                days2 = days2.getDate();
                if (day2 > days2) {
                    day2 = days2;
                }
                if (month2 < 10) {
                    month2 = '0' + month2;
                }
                return year2 + '-' + month2 + '-' + day2;
            };

            // 时间控件失去焦点时默认时间
            $scope.onblur = function () {
                if ($scope.vm.orderCreateTimeEnd.length < 10) {
                    $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                }
                if ($scope.vm.orderCreateTimeStart < 10) {
                    $scope.vm.orderCreateTimeStart = $scope.getPreMonth($scope.vm.orderCreateTimeEnd);
                }
            };

            $scope.$on('$viewContentLoaded', function () {
                // 初始化时间，间隔一个月
                $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                $scope.vm.orderCreateTimeStart = $scope.getPreMonth($scope.vm.orderCreateTimeEnd);
            });


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


            // 同步盘点单
            $scope.synchroClick = function () {
                // cityId warehouseId 为必填项目
                if (!$scope.vo.warehouseId) {
                    bootbox.alert('请选择仓库！');
                    return false;
                }
                $scope.query(true);
            };

            // 同步盘盈盘亏单
            $scope.synchroLossClick = function () {
                // cityId warehouseId 为必填项目
                if (!$scope.vo.warehouseId) {
                    bootbox.alert('请选择仓库！');
                    return false;
                }
                $scope.query(false);
            };


            $scope.query = function (flag) {
                $scope.vo.cityId = $scope.cityVo.cityId ? $scope.cityVo.cityId : null;
                $scope.vo.state = $scope.vo.state ? $scope.vo.state : '';
                // 处理开始时间和结束时间
                if ($scope.vm.orderCreateTimeStart.length > 0) {
                    $scope.vo.startTime = $scope.vm.orderCreateTimeStart + " 00:00:00";
                } else {
                    $scope.vm.orderCreateTimeStart = $scope.getPreMonth($scope.vm.orderCreateTimeEnd);
                }
                if ($scope.vm.orderCreateTimeEnd.length > 0) {
                    $scope.vo.endTime = $scope.vm.orderCreateTimeEnd + " 23:59:59";
                } else {
                    $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                }
                pagedataLoading.loading();
                console.log($scope.vo)
                if (flag) {
                    OrderListService.orderSync($scope.vo).then(function (response) {
                        pagedataLoading.unloading();
                        if (response.success == true) {
                            bootbox.alert('同步盘点单完成！');
                        } else {
                            bootbox.alert(response.error);
                        }
                    });
                } else {
                    OrderListService.orderLossSync($scope.vo).then(function (response) {
                        pagedataLoading.unloading();
                        if (response.success == true) {
                            bootbox.alert('同步盘盈盘亏单完成！');
                        } else {
                            bootbox.alert(response.error);
                        }
                    });
                }
            };

        }]);
});