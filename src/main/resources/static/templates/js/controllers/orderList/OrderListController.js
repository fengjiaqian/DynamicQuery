/**
 * 订单列表
 */
define(['app',
    'services/CommonService',
    'services/service',
    'services/OrderListService'
], function (app) {
    app.controller('OrderListController', ['$http', '$scope', '$filter', '$rootScope', '$stateParams', '$state', 'OrderListService', 'QueryDataService', 'CommonService', 'pagedataLoading', 'ExcelFileDownLoad',
        function ($http, $scope, $filter, $rootScope, $stateParams, $state, OrderListService, QueryDataService, CommonService, pagedataLoading, ExcelFileDownLoad) {

            $scope.vo = {};
            $scope.cityVo = {
                cityMode: "",
                cityId: "",
                cityIds: "",
                serviceObj: ""
            };
            $scope.vo.state = 0;

            //城市下拉数据
            $scope.allJiupiCityList = [];
            $scope.filterList = [];

            $scope.vm = {
                pager: {
                    "currentPage": 1,
                    "pageSize": 20,
                    "recordCount": 0,
                    "totalPage": 1,
                    "offset": 0,
                    "previousPage": 0,
                    'index': 1,
                },
                orderType: '',
                orderState: ''
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
            $scope.getPreMonth = function (date, isNext) {
                let arr = date.split(' ')[0].split('-');
                let year = arr[0];      //获取当前日期的年份
                let month = arr[1];     //获取当前日期的月份
                let day = arr[2];       //获取当前日期的日
                let days = new Date(year, month, 0);
                days = days.getDate();  //获取当前日期中月的天数
                let year2 = year;
                let month2 = !isNext ? parseInt(month) - 1 : parseInt(month) + 1;
                if (month2 === 0 || month2 === 13) {
                    year2 = !isNext ? parseInt(year2) - 1 : parseInt(year2) + 1;
                    month2 = !isNext ? 12 : 1;
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

            //获取登陆用户
            $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));

            $scope.$on('$viewContentLoaded', function () {
                // 初始化时间，间隔一个月
                $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                $scope.vm.orderCreateTimeStart = $scope.getPreMonth($scope.vm.orderCreateTimeEnd);
                $scope.query();
            });

            // 初始化数据
            QueryDataService.initSearchData($scope);

            //初始化酒批城市list
            $scope.getCityList = function () {
                OrderListService.listProvinceAllCitiesDTO().then(function (res) {
                    $scope.allJiupiCityList = (res || {}).list || [];
                })
            };
            $scope.getCityList();
            //城市控件change事件
            $scope.changeCityMode = function () {
                $scope.cityVo.serviceObj = null;
                $scope.cityVo.cityIds = [];
                $scope.cityVo.cityId = "";
                $scope.filterList = [];
                if ($scope.cityVo.cityMode && $scope.cityVo.cityMode != "") {
                    var tempArr = [], ids = [];
                    angular.forEach($scope.allJiupiCityList, function (item) {
                        var tempCity = [];
                        angular.forEach(item.jiupiCityList, function (obj) {
                            var modeValue = obj.cityModeValue || 0
                            if (modeValue == $scope.cityVo.cityMode) {
                                tempCity.push(obj);
                                ids.push(obj.id);
                            }
                        })
                        if (tempCity.length > 0) {
                            tempArr.push({
                                province: item.province,
                                jiupiCityList: tempCity
                            })
                        }
                    })
                    $scope.filterList = tempArr;
                    $scope.cityVo.cityIds = ids;
                }
            }
            $scope.changeService = function () {
                $scope.cityVo.cityIds = [];
                if ($scope.cityVo.serviceObj) {
                    var cities = ($scope.cityVo.serviceObj || {}).jiupiCityList || [];
                    $scope.cityVo.cityIds = [];
                    angular.forEach(cities, function (item) {
                        $scope.cityVo.cityIds.push(item.id);
                    })
                } else {
                    $scope.cityVo.cityId = "";
                    angular.forEach($scope.filterList, function (item) {
                        var list = (item || {}).jiupiCityList || [];
                        angular.forEach(list, function (obj) {
                            $scope.cityVo.cityIds.push(obj.id);
                        })
                    })
                }
            }
            $scope.changecity = function () { }

            // 下拉默认选项
            $scope.defaultStateOptions = [
                { name: '已取消', val: '2' },
                { name: '审核通过', val: '3' },
                { name: '审核不通过', val: '4' },
                { name: '待发货', val: '5' },
                { name: '已发货', val: '6' },
                { name: '待结账', val: '10' },
                { name: '待支付', val: '11' },
                { name: '延迟配送', val: '14' }
            ];

            $scope.stateChange = function () {
                if ($scope.vm.orderType == '15') {        // 兑奖订单 15
                    $scope.defaultStateOptions = [
                        { name: '待打印', val: '1' },
                        { name: '待发货', val: '2' },
                        { name: '待结账', val: '3' },
                        { name: '已完成', val: '4' },
                        { name: '已取消', val: '5' },
                        { name: '配送失败', val: '6' },
                        { name: '已发货', val: '7' },
                        { name: '延迟配送', val: '8' },
                        { name: '已标记', val: '9' },
                    ];
                } else if ($scope.vm.orderType == '20') {   // 退货单 20
                    $scope.defaultStateOptions = [
                        { name: '申请退货', val: '1' },
                        { name: '已取消退货', val: '2' },
                        { name: '区域审核通过', val: '3' },
                        { name: '区域审核拒绝', val: '4' },
                        { name: '运营审核通过', val: '5' },
                        { name: '运营审核拒绝', val: '6' },
                        { name: '待取货', val: '7' },
                        { name: '已取货', val: '8' },
                        { name: '拒绝取货', val: '9' },
                        { name: '已退货', val: '10' },
                        { name: '待结账', val: '11' },
                        { name: '取货中', val: '12' },
                        { name: '延迟退货', val: '13' },
                        { name: '已取货', val: '19' },
                        { name: '仓管确认出库', val: '30' },
                    ];
                } else if ($scope.vm.orderType == '') {
                    $scope.vm.orderState = '';
                    $scope.defaultStateOptions = [
                        { name: '已取消', val: '2' },
                        { name: '审核通过', val: '3' },
                        { name: '审核不通过', val: '4' },
                        { name: '待发货', val: '5' },
                        { name: '已发货', val: '6' },
                        { name: '待结账', val: '10' },
                        { name: '待支付', val: '11' },
                        { name: '延迟配送', val: '14' }];
                } else {                                   // 其他状态默认
                    $scope.defaultStateOptions = [
                        { name: '已取消', val: '2' },
                        { name: '审核通过', val: '3' },
                        { name: '审核不通过', val: '4' },
                        { name: '待发货', val: '5' },
                        { name: '已发货', val: '6' },
                        { name: '待结账', val: '10' },
                        { name: '待支付', val: '11' },
                        { name: '延迟配送', val: '14' },
                    ];
                }
            };

            //查询
            $scope.searchClick = function () {
                $scope.vm.pager.index = 1;
                // 处理默认查询时间
                if ($scope.vo.orderCreateTimeStart.length < 12) {
                    $scope.vo.orderCreateTimeStart = $scope.vm.orderCreateTimeStart + " 00:00:00";
                }
                if ($scope.vo.orderCreateTimeEnd.length < 12) {
                    $scope.vo.orderCreateTimeEnd = $scope.vm.orderCreateTimeEnd + " 23:59:59";
                }
                $scope.vo.orderTypes = [];
                $scope.vo.states = [];
                if ($scope.vm.orderType && $scope.vm.orderType !== '') {
                    $scope.vo.orderTypes.push(parseInt($scope.vm.orderType));
                } else {
                    $scope.vo.orderTypes = null;
                }
                if ($scope.vm.orderState && $scope.vm.orderState !== '') {
                    $scope.vo.states.push(parseInt($scope.vm.orderState));
                } else {
                    $scope.vo.states = null;
                }
                $scope.query();
            };

            //清空
            $scope.resetClick = function () {
                $scope.cityVo = {};
                $scope.cityVo.serviceObj = null;
                $scope.cityVo.cityIds = [];
                $scope.cityVo.cityId = "";
                $scope.cityVo.cityMode = "";
                $scope.filterList = [];
                $scope.vm.pager.index = 1;
                $scope.vm.orderType = '';
                $scope.vm.orderState = '';
                // 默认时间
                $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                $scope.vm.orderCreateTimeStart = $scope.getPreMonth($scope.vm.orderCreateTimeEnd);
                $scope.hasChangedType = false;
                $scope.hasChangedState = false;
                $scope.query();
            };

            // 时间控件失去焦点时默认时间
            $scope.onblur = function (isStartChange) {
                if ($scope.vm.orderCreateTimeEnd.length < 10) {
                    $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                }
                if ($scope.vm.orderCreateTimeStart.length < 10) {
                    $scope.vm.orderCreateTimeStart = $scope.getPreMonth($scope.vm.orderCreateTimeEnd);
                }
                if ($scope.vo.businessNo == undefined || $scope.vo.businessNo == "") {
                    if (isStartChange) {
                        setTimeout(() => {
                            if (!$('.datepicker-days').is(':visible')) {
                                $scope.vm.orderCreateTimeEnd = $scope.getPreMonth($scope.vm.orderCreateTimeStart, true);
                                $('.date-picker input[name="time_end"]').val($scope.vm.orderCreateTimeEnd)
                            }
                        }, 100)
                    }
                }
            };

            //导出
            $scope.exportExcel = function () {
                $scope.vo.currentPage = 1;
                $scope.vo.pageSize = $scope.vm.pager.recordCount;
                //处理日期
                if ($scope.vo.startTime) {
                    $scope.vo.startTime = $scope.vo.startTime.replace("-", "").substring(0, 6);
                }
                if ($scope.vo.endTime) {
                    $scope.vo.endTime = $scope.vo.endTime.replace("-", "").substring(0, 6);
                }
                ExcelFileDownLoad.downLoad("/templates/getOrderList/downloadExcel", $scope.vo, "订单列表");
            };

            $scope.query = function () {
                $scope.vo.currentPage = $scope.vm.pager.index;
                $scope.vo.pageSize = $scope.vm.pager.pageSize;
                // 处理查询时间
                if ($scope.vm.orderCreateTimeStart.length > 0) {
                    $scope.vo.orderCreateTimeStart = $scope.vm.orderCreateTimeStart + " 00:00:00";
                } else {
                    $scope.vm.orderCreateTimeStart = $scope.getPreMonth($scope.vm.orderCreateTimeEnd);
                }
                if ($scope.vm.orderCreateTimeEnd.length > 0) {
                    $scope.vo.orderCreateTimeEnd = $scope.vm.orderCreateTimeEnd + " 23:59:59";
                } else {
                    $scope.vm.orderCreateTimeEnd = $scope.currentDate();
                }

                $scope.vm.items = {};
                if ($scope.cityVo.cityMode == undefined || $scope.cityVo.cityMode == "") {
                    delete $scope.vo.orgId;
                    delete $scope.vo.fromCityIds;
                } else if ($scope.cityVo.cityId && $scope.cityVo.cityId != "") {
                    delete $scope.vo.fromCityIds;
                    $scope.vo.orgId = $scope.cityVo.cityId;
                } else if ($scope.cityVo.cityIds && $scope.cityVo.cityIds.length > 0) {
                    delete $scope.vo.orgId;
                    $scope.vo.fromCityIds = $scope.cityVo.cityIds;
                }

                pagedataLoading.loading();

                if ($scope.vo.orderTypes && $scope.vo.orderTypes[0] == 50) {
                    $scope.vo.orderTypes = [0]
                    $scope.vo.businessTypes = [8]
                }

                OrderListService.getList($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success === true) {
                        $scope.vm.items = response.data ? response.data.dataList : null;
                        $scope.vm.pager.recordCount = response.data ? response.data.pager.recordCount : 0;
                        $scope.vm.pager.currentPage = response.data ? response.data.pager.currentPage : 0;
                        $scope.vm.pager.totalPage = response.data ? response.data.pager.totalPage : 0;
                    } else {
                        bootbox.alert(response.error);
                    }
                });
            };

            /** 内配退可取消*/
            $scope.cancelVo={};
            $scope.cancelOrder = function (item) {
                $scope.cancelVo.cancelType = 2;
                $scope.cancelVo.remark = '';
                $scope.cancelVo.orderId = item.businessId;
                $scope.cancelVo.userId = $scope.userInfo.userId;
                OrderListService.orderCancle($scope.cancelVo).then(function (data) {
                    if (data.result == "success") {
                        bootbox.alert("取消成功!", function () {
                            $scope.query();
                        });
                    } else if(data.error){
                        bootbox.alert(data.error);
                    }
                })
            }

        }]);
});


