/**
 * 内容配置-列表
 */
define(['app', 'directives/biz-Select',
    'services/DynamicSqlQueryConfigService',
    'services/popup/dynamicSqlQueryConfig/AddSqlQueryConfigService',
    'services/popup/dynamicSqlQueryConfig/UpdateSqlQueryConfigService',
], function (app) {
    app.controller('DynamicSqlQueryConfigController', ['$http', '$scope', '$filter', '$rootScope', '$state', 'DynamicSqlQueryConfigService', 'AddSqlQueryConfigService', 'UpdateSqlQueryConfigService', 'popupWinService', 'QueryDataService', 'BizSelectService', 'pagedataLoading',
        function ($http, $scope, $filter, $rootScope, $state, DynamicSqlQueryConfigService, AddSqlQueryConfigService, UpdateSqlQueryConfigService, popupWinService, QueryDataService, BizSelectService, pagedataLoading) {

            $scope.vo = {};
            $scope.vm = {};

            $scope.vm = {
                pager: {
                    "pageIndex": 1,
                    "pageSize": 20,
                    "totalCount": 0,
                    "totalPage": 1,
                    "offset": 0,
                    "previousPage": 0,
                    'index': 1
                }
            };

            //获取登陆用户
            $scope.userInfo = angular.fromJson(localStorage.getItem("userInfo"));
            //查询
            $scope.searchClick = function () {
                $scope.vm.pager.index = 1;
                $scope.query();
            };

            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.vm.contentType = '';
                $scope.changeContentType = false;
                $scope.vm.pager.index = 1;
                $scope.query();
            };

            QueryDataService.initSearchData($scope);//初始化查询数据


            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });

            $scope.query = function () {
                QueryDataService.storeSearchData($scope);
                $scope.vo.pageIndex = $scope.vm.pager.index;
                $scope.vo.pageSize = $scope.vm.pager.pageSize;
                $scope.vm.items = [];
                pagedataLoading.loading();
                DynamicSqlQueryConfigService.getList($scope.vo).then(function (response) {
                    pagedataLoading.unloading();
                    if (response.success == true) {
                        $scope.vm.items = response.data ? response.data.dataList : null;
                        $scope.vm.pager.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pager.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pager.totalPage = response.data? response.data.pager.totalPage:0;
                    } else {
                        bootbox.alert(response.error);
                        alert("加载失败")
                    }
                });

            };

            //新增
            $scope.addSqlReport = function () {
            	AddSqlQueryConfigService.popup().then(function (data) {
                    if (data.success == true) {
                        $scope.query();
                    } else {
                        bootbox.alert(data.error);
                    }
                })
            };

            //修改
            $scope.edit = function ($index, item) {
                UpdateSqlQueryConfigService.popupdate(item).then(function (data) {
                    if (data.success == true) {
                        $scope.query();
                    } else {
                        bootbox.alert(data.error);
                    }
                })
            };
           
            //同步
            $scope.syn = function ($index, item) {
                SynSqlQueryConfigService.popupdate(item).then(function (data) {
                    if (data.success == true) {
                        $scope.query();
                    } else {
                        bootbox.alert(data.error);
                    }
                })
            };

            //删除
            $scope.del = function ($index, id) {
                if ($index != null) {
                    if (confirm("是否删除")) {
                    	var param = {
                    					id:id,
                    					lastUpdateUser:$scope.userInfo.userId
                    				}
                    	DynamicSqlQueryConfigService.del(param).then(function (data) {
                            if (data.success == true) {
                                $scope.query();
                            } else {
                                bootbox.alert(data.error);
                            }
                        })

                }
                }
            };

        }]);
});