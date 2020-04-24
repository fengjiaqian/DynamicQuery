/**
 * 内容配置-列表
 */
define(['app', 'directives/biz-Select',
    'services/CommonService',
    'services/service',
    'services/RolesManagerService',
    'services/popup/authorization/AuthorizationService',
], function (app) {
    app.controller('RolesManagerController', ['$http', '$scope', '$filter', '$modal', '$rootScope', '$state', '$stateParams', 'RolesManagerService', 'AuthorizationService', 'popupWinService', 'QueryDataService', 'BizSelectService', 'pagedataLoading',
        function ($http, $scope, $filter, $modal, $rootScope, $state, $stateParams, RolesManagerService, AuthorizationService, popupWinService, QueryDataService, BizSelectService, pagedataLoading) {

            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.user = {};
            $scope.refList = []; // 授权角色list
            $scope.searchInfo = !$stateParams.searchInfo ? null : $stateParams.searchInfo;
            $scope.roleId = !$stateParams.roleId ? null : $stateParams.roleId;

            $scope.vm = {
                pager: {
                    "currentPage": 1,
                    "pageSize": 20,
                    "totalCount": 0,
                    "totalPage": 1,
                    "offset": 0,
                    "previousPage": 0,
                }
            };

            $scope.userRoleList = [];

            //获取登陆用户
            $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));
            console.log($scope.userInfo)
            $scope.authList = $scope.userInfo.authList || [];
            $scope.userRole = $scope.userInfo.userRole || "";
            $scope.roleOrgId = null;
            angular.forEach($scope.authList, function (item) {
                if (item.roleType == $scope.userRole) {
                    $scope.roleOrgId = item.ruleOrgId;
                }
            })

            //若为物流队长\仓管    城市固定
            $scope.initCity=function(){
                if($scope.userInfo.userRole=='LogisticsLeader'|| $scope.userInfo.userRole=='StoreAdmin'){
                    $scope.isDisabled=true;
                    $scope.cityVo.cityObj={};
                    $scope.vo.city_Id=$scope.userInfo.city.cityId? $scope.userInfo.city.cityId:null;
                    $scope.cityVo.provinceObj = $scope.userInfo.city.province;
                    $scope.cityVo.cityId = $scope.userInfo.city.cityId;
                }
            }
            $scope.initCity();

            //查询
            $scope.searchClick = function () {
                $scope.vm.pager.currentPage = 1;
                $scope.query();
            };

            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.cityVo = {};
                $scope.roleOrgId = null;
                $scope.vm.contentType = '';
                $scope.changeContentType = false;
                $scope.vm.pager.currentPage = 1;
                $scope.query();
            };

            QueryDataService.initSearchData($scope);//初始化查询数据

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });

            $scope.query = function () {
                $scope.vo.currentPage = $scope.vm.pager.currentPage;
                $scope.vo.pageSize = $scope.vm.pager.pageSize;
                $scope.vo.roleOrgId = $scope.roleOrgId;
                $scope.vo.cityId = !$scope.vo.cityId ? $scope.cityVo.cityId ? $scope.cityVo.cityId : null : $scope.vo.cityId;
                $scope.vm.items = [];
                if ($scope.searchInfo !== null) {
                    $scope.vo = $scope.searchInfo;
                }
                pagedataLoading.loading();
                RolesManagerService.getList($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.result == 'success') {
                        $scope.vm.items = response.data ? response.data : [];
                        if ($scope.vm.items.length > 0 && $scope.roleId !== null) {
                            for (let i = 0; i < $scope.vm.items.length; i++) {
                                if ($scope.vm.items[i].id == $scope.roleId) {
                                    $scope.user = $scope.vm.items[i];
                                    $scope.vm.authList = $scope.vm.items[i].authList ? $scope.vm.items[i].authList : null;
                                    break
                                }
                            }
                        }
                        $scope.vm.pager.currentPage = response.currentPage ? response.currentPage : 1;
                        $scope.vm.pager.totalCount = response.totalCount ? response.totalCount : 0;
                        $scope.vm.pager.totalPage = response.totalCount ? Math.ceil(response.totalCount / 20) : 1;
                    } else {
                        bootbox.alert(response.error);
                        alert("加载失败")
                    }
                });


                // 获取搜索角色列表
                RolesManagerService.getRoleList({
                    dictionaryCode: 'userRole',
                }).then(function (response) {
                    console.log(response)
                    if (response.result == 'success') {
                        $scope.userRoleList = !response.data ? [] : response.data;
                    }
                });

                // 获取授权角色
                let cityRoles = ["CityAdmin", "CityManager", "DeliveryUser", "SaleUser"];
                let orderPickerRole = ["OrderPicker"];
                let warehouseRoles = ["StoreAdmin", "LogisticsLeader", "Stevedore", "OrderPicker", "WarehouseManager", "Cashier", "Messenger", "ProcessingUser", "SowingUser", "ReplenishUser", "SetGoodsUser"];
                let orgType1 = ["Developer", "OPAdmin", "HR", "WarehouseOperative", "DealerAuditManager", "ShopAuditManager", "OPUser", "OPStaff"];
                let orgType2 = ["CityAdmin", "CityManager", "Stevedore", "SaleUser", "DeliveryUser"];
                let orgType3 = ["LogisticsLeader", "Stevedore", "StoreAdmin", "OrderPicker", "WarehouseManager", "Cashier", "Messenger", "ProcessingUser", "SowingUser", "ReplenishUser", "SetGoodsUser"];
                $scope.getQueryRefListVo = {
                    dictionaryCode: 'userRole',
                    dictionaryRefCode: 'userRoleAuth',
                    dictionaryValue: $scope.userInfo.userRole
                };
                pagedataLoading.loading();
                RolesManagerService.getQueryRefList($scope.getQueryRefListVo).then(function (res) {
                    pagedataLoading.unloading();
                    if (res.result == 'success' && res.data && res.data.length > 0) {
                        res.data.forEach(value => {
                            if (cityRoles.indexOf(value.value) > -1) {
                                value.isShowRegion = true
                            }
                            if (orderPickerRole.indexOf(value.value) > -1) {
                                value.isOrderPickType = true
                            }
                            // cityId为0 则表示全国
                            if ($scope.user.cityId != 0 && warehouseRoles.indexOf(value.value) > -1) {
                                value.isShowStore = true
                            }
                            if (orgType1.indexOf(value.value) > -1) {
                                value.orgType = 1
                            }
                            if (orgType2.indexOf(value.value) > -1) {
                                value.orgType = 2
                            }
                            if (orgType3.indexOf(value.value) > -1) {
                                value.orgType = 3
                            }
                        });
                        $scope.refList = res.data;
                    }
                });
            };

            // 删除配送员需要判断调api判断 id:角色id  userRole:角色
            $scope.removeAdminAuth = function ($index, id, userRole, userId) {
                if ($index != null) {
                    if (userRole == 'DeliveryUser') { // 判断是否是配送员角色 DeliveryUser authId 权限id / userId 用户id
                        RolesManagerService.removeAdminAuthForDriver(id, userId).then((res) => {
                            console.log(res)
                            if (res && res.result == 'success') {
                                if (confirm("是否删除")) {
                                    $scope.deleteRole(id);
                                }
                            } else {
                                bootbox.alert(response.error)
                            }
                        });
                    } else {
                        if (confirm("是否删除")) {
                            $scope.deleteRole(id);
                        }
                    }
                }
            };

            // 删除 角色
            $scope.deleteRole = function (id) {
                RolesManagerService.delRole(id).then(function (response) {
                    if (response.result == 'success') {
                        $scope.query();
                    } else {
                        bootbox.alert(response.error);
                    }
                })
            };


            //创建修改密码弹框
            $scope.changePwd = function (userId) {

                if ($scope.userInfo.userRole == `LogisticsLeader` || $scope.userInfo.userRole == `StoreAdmin`) {
                    bootbox.alert('当前角色无法修改密码');
                } else {
                    var modalInstance = $modal.open({
                        templateUrl: 'js/services/popup/authorization/updatePwdTemplate.html',
                        controller: 'AuthorizationController',
                        size: 'md',
                        resolve: {
                            args: function () {
                                return { userId };
                            }
                        }
                    });
                    modalInstance.result.then(function (result) {
                        if (result === 'success') {
                            $scope.query();
                        }
                    }
                    );
                }

            };

            // 页面跳转
            $scope.routeToInfo = function (id, type) {
                $state.go(type, { searchInfo: $scope.vo, roleId: id });
            };

            // 移除按钮是否显示
            $scope.checkRole = function (role) {
                let isCheckOk = false;
                if ($scope.refList && $scope.refList.length > 0) {
                    $scope.refList.forEach(item => {
                        if (role.indexOf(item.value) > -1) {
                            isCheckOk = true
                        }
                    })
                }
                return isCheckOk
            };

            // 授权角色弹窗 获取授权角色信息
            $scope.open = function () {
                let popRef = {
                    user: $scope.user,
                    refList: $scope.refList
                };
                if ($scope.user.cityId == 0) {
                    bootbox.alert('若要授权该角色，则需要完善运营人员的城市信息');
                } else {
                    if ($scope.refList && $scope.refList.length > 0) {
                        AuthorizationService.popup(popRef).then(function (data) {
                            if (data.success == true) {
                                bootbox.alert("编辑成功!", function () {
                                    $scope.query();
                                });
                            }
                        })
                    } else {
                        bootbox.alert('未获取到授权角色');
                    }
                }
            };

        }]);
});