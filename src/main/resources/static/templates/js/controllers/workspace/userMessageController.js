/**
 *已登录用户的信息
 */
define(['app'], function (app) {


    app.controller('userMessageController', [
        '$rootScope', '$scope', 'UserService',
        function ($rootScope, $scope, UserService) {
            //返回提示信息
            $scope.userMessage = {};

            $scope.getUserMessage = function () {
                UserService.getBizUserDetailInfo().then(function (response) {
                    if (response.success == true) {
                        $scope.userMessage = response.data;
                    }
                });
            };
            $scope.$on('$viewContentLoaded', function () {
                Metronic.initAjax();
                console.log("UserMessageController.$viewContentLoaded");
                // 获取APP配置
                $scope.getUserMessage();
            })
        }]);

});