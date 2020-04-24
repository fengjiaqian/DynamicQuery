define(['app', 'services/UserService'], function (app) {
    app.controller('ModifyUserPasswordController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService',
            function ($modalInstance, $scope, $rootScope, args, UserService) {
                $scope.vo = {};
                $scope.userInfo = {};
                UserService.obtainUserInfo().then(function (response) {
                    if (response.success === true) {
                        $scope.userInfo = response.data;
                    }
                }
                )
                $scope.ok = function () {
                    var dto = {
                        'userId': $scope.userInfo.userId || "",
                        'oldPass': $scope.vo.nowPassword,
                        'newPass': $scope.vo.newPassword
                    };
                    UserService.modifyUserPassword(dto).then(
                        function (response) {
                            if (response.success === true) {
                                $modalInstance.close(response);
                            } else {
                                $modalInstance.dismiss(response);
                            }
                        }, function (response) {
                            $modalInstance.dismiss(response);
                        });
                };
                // 取消按钮
                $scope.cancel = function () {
                    $modalInstance.dismiss();
                };
            }]);
});