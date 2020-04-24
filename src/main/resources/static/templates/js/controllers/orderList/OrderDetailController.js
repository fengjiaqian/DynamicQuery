/**
 * 订单列表详情
 */
define(['app', 'directives/biz-Select',
    'services/CommonService',
    'services/service',
    'services/OrderListService'
], function (app) {
    app.controller('OrderDetailController', ['$http','$scope','$filter','$stateParams', '$rootScope', '$state','OrderListService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http, $scope, $filter, $stateParams,$rootScope, $state,OrderListService, QueryDataService, BizSelectService, CommonService,pagedataLoading) {

            $scope.vo = {};
            $scope.vm = {};
            $scope.vo.state = 0;
            $scope.vo.orderId = $stateParams.id;

            // 合计
            $scope.saleSum = 0;            // 销售数量合计
            $scope.reduceProductSum = 0;   // 总价立减合计
            $scope.reduceOrderSum = 0;     // 优惠合计
            $scope.payableSum = 0;         // 应付合计

            // 获取登陆用户信息
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            // 初始化数据
            QueryDataService.initSearchData($scope);
            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });

            // tab 切换
            $scope.select = function (index) {
                $scope.activeTab = index;
                $scope.lists = {};
                if(index === 2){
                    pagedataLoading.loading();
                    $scope.vo.orderId = $stateParams.id;
                    OrderListService.getOrderTrace($scope.vo).then(function (response) {
                        pagedataLoading.unloading();
                        if (response.success === true) {
                            $scope.lists = response.data ? response.data : null;

                        } else {
                            bootbox.alert(response.error);
                        }
                    });
                }else if(index === 1){
                    $scope.vo.userId =  $scope.userInfo.userId;
                    if(!$stateParams.salesManId)return;
                    $scope.vo.salesManId = parseInt($stateParams.salesManId);
                    pagedataLoading.loading();
                    OrderListService.getUserInfo($scope.vo).then(function (response) {
                        pagedataLoading.unloading();
                        if (response.success === true) {
                            $scope.lists = response.data ? response.data : null;
                        } else {
                            bootbox.alert(response.error);
                        }
                    });

                }
            };

            $scope.query = function () {
                $scope.vm = {};
                $scope.vo.orderId = $stateParams.id;
                pagedataLoading.loading();
                OrderListService.orderDetail($scope.vo).then(function (response) {
            		pagedataLoading.unloading();
                    if (response.success === true) {
                        $scope.vm = response.data ? response.data : null;
                        console.log($scope.vm.items)

                        // 合计
                        angular.forEach($scope.vm.items, function(value, key){
                            if(value.saleCount != null){
                                $scope.saleSum += value.saleCount;
                            }
                            if(value.reduceProductAmount != null){
                                $scope.reduceProductSum += value.reduceProductAmount;
                            }
                            if(value.reduceOrderAmount != null){
                                let curReduceSum = value.selfPickUpReduceAmount + value.reduceBonusAmount + value.reduceCouponAmount + value.reduceOrderAmount + value.reduceProductAmount;
                                $scope.reduceOrderSum += curReduceSum;
                            }
                            if(value.payableAmount != null){
                                $scope.payableSum += value.payableAmount - 0;
                            }
                        })
                    } else {
                    	 bootbox.alert(response.error);
                    }
                });
            };

        }]);
});

