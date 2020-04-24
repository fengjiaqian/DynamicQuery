/**
 * 仓库库存校正记录-列表
 */
define(['app', 'directives/biz-Select',
    'services/CommonService',
    'services/service',
    'services/EarningReportService',
    'services/WarehouseInventoryCheckRecordService',
    'services/popup/markInventoryCheckRecord/PopupService',
    'services/popup/modInventoryByCheckRecord/PopupService'
], function (app) {
    app.controller('InventoryCheckRecordListController', ['$http', '$scope', '$filter', '$rootScope', '$state', 'ejpJiupiCityService', 'EarningReportService', 'MarkInventoryCheckRecordService', 'ModInventoryByCheckRecordService', 'WarehouseInventoryCheckRecordService', 'popupWinService', 'QueryDataService', 'BizSelectService', 'CommonService', 'pagedataLoading',
        function ($http, $scope, $filter, $rootScope, $state, ejpJiupiCityService, EarningReportService, MarkInventoryCheckRecordService, ModInventoryByCheckRecordService, WarehouseInventoryCheckRecordService, popupWinService, QueryDataService, BizSelectService, CommonService, pagedataLoading) {

            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.jiupiCityVo = [];

            $scope.vo.state = 1;//校正状态默认为 未处理 state=1

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
                    $scope.vm.orderCreateTimeStart = $scope.currentDate();
                }
            };

            $scope.$on('$viewContentLoaded', function () {
                // 初始化时间，间隔一个月
                $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                $scope.vm.orderCreateTimeStart = $scope.currentDate();
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

            //查询
            $scope.searchClick = function () {
                var reg = /^[0-9]*$/;
                if ($scope.vo.productSkuId && !reg.test($scope.vo.productSkuId)) {
                    bootbox.alert('产品SKU只能输入数字格式！');
                } else {
                    $scope.vm.pager.index = 1;
                    $scope.query();
                }
            };

            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.vm.pager.index = 1;
                $scope.query();
            };

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });

            $scope.query = function () {
                // 处理开始时间和结束时间
                if ($scope.vm.orderCreateTimeStart.length > 0) {
                    $scope.vo.startTime = $scope.vm.orderCreateTimeStart + " 00:00:00";
                } else {
                    $scope.vm.orderCreateTimeStart = $scope.currentDate();
                }
                if ($scope.vm.orderCreateTimeEnd.length > 0) {
                    $scope.vo.endTime = $scope.vm.orderCreateTimeEnd + " 23:59:59";
                } else {
                    $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                }

                $scope.vo.orgId = $scope.cityVo.cityId ? $scope.cityVo.cityId : null;
                $scope.vo.pageNum = $scope.vm.pager.index;
                $scope.vo.pageSize = $scope.vm.pager.pageSize;
                $scope.vm.items = {};
                pagedataLoading.loading();
                WarehouseInventoryCheckRecordService.listInventoryCheckRecord($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success == true) {
                        $scope.vm.items = response.data ? response.data.dataList : null;
                        $scope.vm.pager.recordCount = response.data ? response.data.pager.recordCount : 0;
                        $scope.vm.pager.currentPage = response.data ? response.data.pager.currentPage : 0;
                        $scope.vm.pager.totalPage = response.data ? response.data.pager.totalPage : 0;
                    } else {
                        bootbox.alert(response.exception);
                    }
                });
            };

            //校正库存
            $scope.editStore = function (item) {
                ModInventoryByCheckRecordService.popup(item).then(function (data) {
                    if (data.success == true) {
                        $scope.query();
                    } else {
                        bootbox.alert(data.error);
                    }
                })
            };

            // 标记已处理
            $scope.markRecord = function (item) {
                MarkInventoryCheckRecordService.popup(item).then(function (data) {
                    if (data.success == true) {
                        $scope.query();
                    } else {
                        bootbox.alert(data.error);
                    }
                })
            };

        }]);
});