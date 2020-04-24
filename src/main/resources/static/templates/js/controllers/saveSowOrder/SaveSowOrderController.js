/**
 * 同步盘点单
 */
define(['app',
    'services/service',
    'services/SaveSowOrderService'
], function (app) {
    app.controller('SaveSowOrderController', ['$http', '$scope', '$filter', '$rootScope', '$state','SaveSowOrderService', 'popupWinService','QueryDataService','pagedataLoading',
        function ($http, $scope, $filter, $rootScope, $state,SaveSowOrderService,popupWinService,  QueryDataService,pagedataLoading) {

            //获取登陆用户
            $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));

            // 播种任务保存
            $scope.saveSowOrderClick = function () {
                if(!$scope.vo.sowTaskNo){
                    bootbox.alert('请填写播种任务编号！');
                    return false;
                }
                if(!$scope.vo.orgId){
                    bootbox.alert('请填写城市id！');
                    return false;
                }
                $scope.save();
            };

            $scope.save = function () {
                pagedataLoading.loading();
                console.log($scope.vo);
                SaveSowOrderService.saveSow($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success) {
                        bootbox.alert('播种任务完成！');
                    } else {
                        bootbox.alert(response.error);
                    }
                });
            };

        }]);
});