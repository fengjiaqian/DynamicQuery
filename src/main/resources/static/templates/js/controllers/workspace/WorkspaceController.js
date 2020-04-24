/*******************************************************************************
 * Layout Partials. By default the partials are loaded through AngularJS
 * ng-include directive. In case they loaded in server side(e.g: PHP include
 * function) then below partial initialization can be disabled and Layout.init()
 * should be called on page load complete as explained above.
 ******************************************************************************/
/* Setup App Main Controller */
define(['app', 'services/UserPrivilegeService',
        'services/UserService',
        'services/popup/SwitchUserRoleService', 
        'services/popup/ModifyUserPasswordService',
        'services/DeliveryFactorService'
        ], function (app) {

    app.controller('AppController',
        ['$scope', '$rootScope', 'toastr', '$location', '$state', 'UserService', 'QHttp', 'EVENT', 'SwitchUserRoleService', 'ModifyUserPasswordService','DeliveryFactorService',
            function ($scope, $rootScope, toastr, $location, $state, UserService, QHttp, EVENT, SwitchUserRoleService, ModifyUserPasswordService, DeliveryFactorService) {
                $scope.$on('$viewContentLoaded', function () {
                    Metronic.initComponents();
                    $scope.obtainUserInfo();
                });
                $scope.vo={}

                /**
                 * 获取已登录用户的信息
                 */
                $scope.obtainUserInfo = function () {
                    UserService.obtainUserInfo().then(function (response) {
                        if (response.success === true) {
                            $scope.userInfo = response.data;
                            localStorage.setItem("userInfo", angular.toJson($scope.userInfo));
                            $scope.vo.cityId= $scope.userInfo.city.cityId;
                            if ($scope.userInfo.userRole=='OPAdmin' || $scope.userInfo.userRole=='Developer'){
                                DeliveryFactorService.getLogo($scope.vo).then(function (response) {
                                    if (response.success == true) {
                                        $scope.allCount=response.data
                                    }else{
                                    	bootbox.alert(response.error);
                                    }
                                });
                            }
                        } else {
                            //TODO bjw 重新登录
                        	window.location.href='login.html';
                        }
                    }, function (response) {
                        //TODO bjw 重新登录
                    	window.location.href='login.html';
                    });
                };

               /**切换角色操作*/
                $scope.switchUserRole = function () {
                    SwitchUserRoleService.popup($scope.userInfo).then(
                        function (response) {
                            $scope.userInfo = response.data;
                            //广播切换角色事件
                            localStorage.setItem("userInfo", angular.toJson($scope.userInfo))
                            $rootScope.$broadcast(EVENT.broadcast.switchUserRole, response);
                            $state.go('userMessage');
                        }
                    );
                };

                /**修改密码操作*/
                $scope.updatePassword = function () {
                    //创建修改密码弹框
                    ModifyUserPasswordService.popup().then(
                        function (response) {
                            bootbox.alert("修改密码成功！", function () {
                                window.location = "index.html";
                            });
                        }, function (response) {
                            if (response) {
                                bootbox.alert(response.message);
                            }
                        }
                    );
                };

                /**注销操作*/
                $scope.logout = function () {
                    //TODO 请求清空会话数据
                	window.location='login.html';
                };
                
                //跳转配送系数页面
                $scope.goToDeliveryFactor = function () {
                   /* var storage = window.sessionStorage;
                    storage.setItem("initBizUserState", 1);
                    if ($location.url() === $location.path()) {
                        window.location.reload();//如果是当前页面就刷新,否则不跳转
                    }
                    $location.path('/deliveryFactor');*/
                }
              
            }]);

    /* Setup Layout Part - Sidebar */
    /**
     * 菜单
     */
    app.controller('SidebarController', ['$scope', '$state', 'UserPrivilegeService', 'EVENT',
        function ($scope, $state, UserPrivilegeService, EVENT) {
           
            $scope.$on("switchRole_broadcast", function () {
                $scope.sidebarList = UserPrivilegeService.getMenuTree();
            });

            $scope.$on('$includeContentLoaded', function () {
                Layout.initSidebar(); // init sidebar
            });
 
            $scope.sidebarList = {};
            $scope.getSidebarList = function () {
                UserPrivilegeService.getUserPrivilege().then(function (data) {
                    if (data.success === true && data.data) {
                        //存储权限数据
                        UserPrivilegeService.storePrivilegeData(data.data);
                        $scope.sidebarList = UserPrivilegeService.getMenuTree();
                    }
                })
            };

            $scope.getSidebarList();
        }]);

});