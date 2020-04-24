/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select',
    'services/CommonService',
    'services/service',
    'services/ProductSyncService',
], function (app) {
    app.controller('ProductSyncController', ['$http', '$scope', '$filter', '$rootScope', '$state', 'ProductSyncService', 'popupWinService', 'QueryDataService', 'BizSelectService', 'CommonService', 'pagedataLoading',
        function ($http, $scope, $filter, $rootScope, $state, ProductSyncService, popupWinService, QueryDataService, BizSelectService, CommonService, pagedataLoading) {

            $scope.vo = {};
            $scope.cityVo = {};


            //处理
            $scope.sendSku = function () {
                // if(!$scope.cityVo.cityId){
                //     bootbox.alert('请先选择城市!');
                //     return;
                // }
                $scope.city_Id = $scope.cityVo.cityId ? $scope.cityVo.cityId : -1;
                pagedataLoading.loading();
                ProductSyncService.sendSku($scope.city_Id);
                pagedataLoading.unloading();
                popupWinService.show({msg: '校正成功，请耐心等待10-30分钟！', isCancleBtnHide: true}).result.then(function (param) {
                    $scope.cityVo = {};
                });
            };
            //处理
            $scope.sendInfo = function () {
                // if(!$scope.cityVo.cityId){
                //     bootbox.alert('请先选择城市!');
                //     return;
                // }
                $scope.city_Id = $scope.cityVo.cityId ? $scope.cityVo.cityId : -1;
                pagedataLoading.loading();
                ProductSyncService.sendInfo($scope.city_Id);
                pagedataLoading.unloading();
                popupWinService.show({msg: '校正成功，请耐心等待10-30分钟！', isCancleBtnHide: true}).result.then(function (param) {
                    $scope.cityVo = {};
                });
            };

            // 产品信息初始化同步（知花知果）
            $scope.initInfoByZhzg = function () {
                pagedataLoading.loading();
                ProductSyncService.initInfoByZhzg($scope.vo.count);
                pagedataLoading.unloading();
                popupWinService.show({msg: '初始化成功，请耐心等待10-30分钟！', isCancleBtnHide: true}).result.then(function (param) {
                    $scope.cityVo = {};
                });
            };

            // 产品sku初始化同步（知花知果）
            $scope.initSkuByZhzg = function () {
                pagedataLoading.loading();
                ProductSyncService.initSkuByZhzg($scope.vo.count);
                pagedataLoading.unloading();
                popupWinService.show({msg: '初始化成功，请耐心等待10-30分钟！', isCancleBtnHide: true}).result.then(function (param) {
                    $scope.cityVo = {};
                });
            };

        }]);
});