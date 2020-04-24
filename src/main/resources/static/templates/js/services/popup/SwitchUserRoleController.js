define(['app', 'services/UserService'], function (app) {

    app.controller('SwitchUserRoleController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService',
            function ($modalInstance, $scope, $rootScope, args, UserService) {
            
                $scope.vo = {};
                $scope.userInfo = args;
                for (var i = 0; i < $scope.userInfo.authList.length; i++) {
                    var item = $scope.userInfo.authList[i];
                    if (isCurRoleInfo(item)) {
                        $scope.vo.curRole = item;
                        break;
                    }
                }

                /**
                 * 判断是否当前角色信息数据
                 */
                function isCurRoleInfo(item) {
                    return (item.roleType == $scope.userInfo.userRole) && item.cityOrg.id == $scope.userInfo.orgId;
                }

                $scope.isCurRoleInfo = isCurRoleInfo;

                //获取用户的角色列表

                /**
                 * 通过传入的调拨单ID,获取
                 */
                //确认入库
                $scope.ok = function () {
                    var arg = {
                        role: $scope.vo.curRole.roleType,
                        orgId: $scope.vo.curRole.cityOrg.id
                    };
                    UserService.switchUserRole(arg).then(function (response) {
                        $modalInstance.close(response);
                        window.location='index.html#/userMessage.html'
                        location.reload();
                    }, function (data) {
                        $modalInstance.dismiss(data);
                    });
                };

                // 取消按钮
                $scope.cancel = function () {
                    $modalInstance.dismiss();
                };
            }]);

});