define(['app', 'services/RolesManagerService', 'services/service',], function (app) {

    app.controller('AuthorizationController',
        ['$modalInstance', '$scope', '$state', '$rootScope', 'args', 'UserService', 'RolesManagerService', 'pagedataLoading',
            function ($modalInstance, $scope, $state, $rootScope, args, UserService, RolesManagerService, pagedataLoading) {
                $scope.vo = {
                    isShowRegion: false, // 显示城市控件
                    isShowStore: false,  // 显示仓库控件
                    isOrderPickType: false,// 显示拣货员类型
                    orgType: null,
                    role: '',
                    pickingAttr: ''
                };
                $scope.cityVo = {};
                $scope.storeList = [];  // 仓库列表

                //获取登陆用户
                $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));
                if (args) {
                    if (args.refList && args.refList.length > 0) {
                        $scope.queryRefList = args.refList;
                    }
                    $scope.vo.user_Id = args.userId ? args.userId : args.user.id;
                    $scope.vo.optUserId = $scope.userInfo.userId;
                }
                $scope.password = {
                    userId: $scope.userInfo.userId,
                    identity: { userId: $scope.userInfo.userId }
                };

                // 选择角色信息
                $scope.authorizedRole = function () {
                    $scope.queryRefList.forEach(item => {
                        if (item.value == $scope.vo.role) {
                            $scope.vo.isShowRegion = !!item.isShowRegion;  // 显示城市控件
                            $scope.vo.isShowStore = !!item.isShowStore;   // 显示仓库控件
                            $scope.vo.isOrderPickType = !!item.isOrderPickType;   // 显示仓库控件
                            $scope.vo.orgType = item.orgType;
                        }
                    });
                    let warehouseRoles = ["StoreAdmin", "LogisticsLeader", "Stevedore", "OrderPicker", "WarehouseManager", "Cashier", "Messenger", "ProcessingUser", "SowingUser", "ReplenishUser", "SetGoodsUser"];
                    if (warehouseRoles.indexOf($scope.vo.role) > -1) {   // 获取仓库数据
                        RolesManagerService.findWarehouseListByCityId(args.user.cityId).then(function (res) {
                            if (res.result == 'success') {
                                $scope.storeList = (res.data && res.data.length > 0) ? res.data : []
                            } else {
                                bootbox.alert(res.error);
                            }
                        })
                    }

                };

                // 新增角色
                $scope.confirm = function () {
                    if ($scope.vo.isShowRegion) { // 如果是城市 org_Id则为城市id
                        $scope.vo.org_Id = $scope.cityVo.cityId ? $scope.cityVo.cityId : null;
                    }
                    let devArr = ['WarehouseOperative', 'Developer', 'HR', 'OPAdmin', 'DealerAuditManager', 'ShopAuditManager', 'OPUser', 'OPStaff'];  // 四个角色默认为传0
                    if (devArr.indexOf($scope.vo.role) > -1) {
                        if ($scope.vo.role == 'Developer') {
                            $scope.vo.org_Id = 0
                        } else {
                            $scope.vo.org_Id = 1
                        }
                    }

                    if ($scope.vo.isShowRegion && ($scope.vo.org_Id == undefined || $scope.vo.org_Id == null)) {
                        bootbox.alert('请选择城市');
                        return false
                    }
                    if ($scope.vo.isShowStore && ($scope.vo.org_Id == undefined || $scope.vo.org_Id == null)) {
                        bootbox.alert('请选择仓库');
                        return false
                    }
                    if ($scope.vo.isOrderPickType && ($scope.vo.pickingAttr == undefined || $scope.vo.pickingAttr == null)) {
                        bootbox.alert('请选择拣货员类型');
                        return false
                    }

                    RolesManagerService.addRole($scope.vo).then(function (response) {
                        $modalInstance.dismiss();
                        if (response.result == 'success') {
                            $state.reload('/authorization/' + args.id);
                        } else {
                            bootbox.alert(response.error);
                        }
                    })
                };

                // 重置密码确认按钮
                $scope.ok = function (pwd) {
                    if (args && args.userId) {
                        pwd.userId = args.userId;
                        pwd.identity.userId = args.userId;
                    }
                    RolesManagerService.updatePwd(pwd).then(function (response) {
                        if (response.success == true) {
                            $modalInstance.dismiss();
                            bootbox.alert('密码已重置');
                        } else {
                            $modalInstance.dismiss();
                            bootbox.alert(response.error);
                        }
                    })
                };

                // 取消按钮
                $scope.cancel = function () {
                    $modalInstance.dismiss();
                };
            }]);

});