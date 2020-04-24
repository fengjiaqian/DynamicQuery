/**
 * 订单异常查询及下载
 */
define(['app', 'directives/biz-Select',
    'services/CommonService',
    'services/service',
    'services/OrderListService'
], function (app) {
    app.controller('ExcetpionOrderListController', ['$http','$scope','$filter', '$rootScope','$stateParams', '$state','OrderListService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading','ExcelFileDownLoad',
        function ($http,$scope,$filter, $rootScope,$stateParams, $state,OrderListService, QueryDataService, BizSelectService, CommonService,pagedataLoading, ExcelFileDownLoad) {

            $scope.vo = {};
            $scope.cityVo = {};
            $scope.vm = {
                pager: {
                    "currentPage": 1,
                    "pageSize": 20,
                    "recordCount": 0,
                    "totalPage": 1,
                    "offset": 0,
                    "previousPage": 0,
                }
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
            $scope.getPreMonth = function(date) {
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

            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            $scope.$on('$viewContentLoaded', function () {
                // 初始化时间，间隔一个月
                $scope.vm.endTime = $scope.currentDate();
                $scope.vm.startTime = $scope.getPreMonth($scope.vm.endTime);
                $scope.query();
            });

            // 初始化数据
            QueryDataService.initSearchData($scope);


            //查询
            $scope.searchClick = function () {
                $scope.vm.pager.currentPage = 1;
                if($scope.cityVo.cityId){
                    $scope.vo.orgId = $scope.cityVo.cityId;
                }
                if($scope.vm.deliveryMarkState){
                    $scope.vo.deliveryMarkState = $scope.vm.deliveryMarkState - 0;
                }

                // 处理默认查询时间
                if($scope.vm.startTime.length < 12){
                    $scope.vo.startTime = $scope.vm.startTime + " 00:00:00";
                }
                if($scope.vm.endTime.length < 12){
                    $scope.vo.endTime = $scope.vm.endTime + " 23:59:59";
                }
                $scope.query();
            };

            //清空
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.cityVo = {};
                $scope.vm.pager.currentPage=1;
                $scope.vm.deliveryMarkState = '';
                // 默认时间
                $scope.vm.endTime = $scope.currentDate();
                $scope.vm.startTime = $scope.getPreMonth($scope.vm.endTime);
                $scope.hasChangedType = false;
                $scope.hasChangedState = false;
                $scope.query();
            };

            // 时间控件失去焦点时默认时间
            $scope.onblur= function () {
                if($scope.vm.endTime.length < 10){
                    $scope.vm.endTime = $scope.currentDate();
                }
                if($scope.vm.startTime < 10){
                    $scope.vm.startTime = $scope.getPreMonth($scope.vm.endTime);
                }
            };

            //导出
            $scope.exportExcel = function () {
                $scope.vo.currentPage = 1;
                $scope.vo.pageSize = $scope.vm.pager.recordCount;
                ExcelFileDownLoad.downLoad("/getExcetpionOrderList/downloadExcel", $scope.vo, "订单异常配送查询");
            };

            $scope.query = function () {
                $scope.vo.currentPage = $scope.vm.pager.currentPage;
                $scope.vo.pageSize = $scope.vm.pager.pageSize;
                // 处理查询时间
                if($scope.vm.startTime.length > 0){
                    $scope.vo.startTime = $scope.vm.startTime + " 00:00:00";
                }else {
                    $scope.vm.startTime = $scope.getPreMonth($scope.vm.endTime);
                }
                if($scope.vm.endTime.length > 0){
                    $scope.vo.endTime = $scope.vm.endTime + " 23:59:59";
                }else {
                    $scope.vm.endTime = $scope.currentDate();
                }

                $scope.vm.items={};
                console.log($scope.vo);

                pagedataLoading.loading();
                OrderListService.getExcetpionOrderList($scope.vo).then(function (response) {
                    console.log(response);
                    pagedataLoading.unloading();
                    if (response.success === true) {
                        $scope.vm.items = response.data ? response.data.dataList : null;
                        $scope.vm.pager = response.data ? response.data.pager : $scope.vm.pager;
                    }else{
                        bootbox.alert(response.error);
                    }
                });
            };

        }]);
});


