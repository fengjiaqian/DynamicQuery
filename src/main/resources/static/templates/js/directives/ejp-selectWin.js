(function (angular) {
    'use strict';
    angular.module('ejp-selectWin', [])
        .constant("ejpSelectWinConfig", {
            productInfo: {
                templateUrl: {
                    multi: 'views/modals/common/popupProduct.html',
                    single: 'views/modals/common/popupProduct.html'
                },
                actionUrl: 'product/findProductQueryListEnable/{curPage}.action'
            },
            productSpec: {
                templateUrl: {
                    multi: 'views/modals/common/popupProduct.html',
                    single: ''
                },
                actionUrl: 'product/findProductQueryListEnable/{curPage}.action'
            },
            productSku: {
                templateUrl: {
                    multi: 'views/modals/common/popupProductSKUByCity.html',
                    single: ''
                },
                actionUrl: 'product/findProductSkuQueryList/{curPage}.action',
                initCategory: true
            },
            //授权产品类目
            productCategory: {
                templateUrl: {
                    multi: 'views/modals/common/popupProductCategory.html',
                    single: ''
                },
                actionUrl: 'category/findProductCategoryObjList/{curPage}.action',
                initCategory: true
            },
            //授权产品
            productList: {
                templateUrl: {
                    multi: 'views/modals/common/popupProduct.html',
                    single: ''
                },
                actionUrl: 'productInfo/findTemplateNotImportPisList/{curPage}/{tep_id}.action',
                initCategory: true
            },
            //添加黑名单
            productBlackList: {
                templateUrl: {
                    multi: 'views/modals/common/popupBlackList.html',
                    single: ''
                },
                actionUrl: 'productInfo/findTemplateNotImportPisList/{curPage}/{tep_id}.action',
                initCategory: true
            },
            user: {
                templateUrl: {
                    multi: 'views/modals/common/popupUser.html',
                    single: ''
                },
                actionUrl: 'bizUser/findBizUserList/{curPage}.action',
                initArea: true
            }
        })
        .directive("ejpSelectWin", ['$parse', '$modal', 'ejpSelectWinConfig',
            function ($parse, $modal, swConfig) {
                return {
                    restrict: 'A',
                    compile: function ($element, $attr) {
                        return {
                            // pre:function(scope, element, attr, ctrl){},
                            post: function ngEventHandler(scope, element, attr, ctrl) {
                                var config = angular.copy(swConfig);

                                element.on("click", function () {
                                    // 选择窗口类型
                                    var winType = attr.ejpSelectWin;

                                    // 加载数据名柄
                                    var loadingFnName = attr.ejpLoadingHandler;
                                    // 触发点击事件后，再获取加载的列表数据
                                    var loadingFn = scope.$eval(loadingFnName);
                                    var paramWrapper = loadingFn();
                                    var itemsList = paramWrapper.list;
                                    var tplID = paramWrapper.tplID;

                                    // 点击OK按钮后的回调函数
                                    var callbackFn = scope.$eval(attr.ejpCallback);

                                    // 创建弹框对象
                                    $modal.open({
                                        templateUrl: config[winType].templateUrl['multi'],
                                        size: 'lg',
                                        resolve: {
                                            params: function () {
                                                return {
                                                    loadingItems: itemsList,
                                                    loadingTplId: tplID,
                                                    action: config[winType].actionUrl,
                                                    initArea: config[winType].initArea,
                                                    initCategory: config[winType].initCategory
                                                };
                                            }
                                        },
                                        controller: ['$scope', '$http', '$modalInstance', 'params', 'ejpAlert', 'pagedataLoading',
                                            function ($scope, $http, $modalInstance, params, ejpAlert, pagedataLoading) {

                                                var pagingInfo = {
                                                    itemsPerPage: 20,
                                                    index: 1,
                                                    totalResult: 0,
                                                    totalPage: 0
                                                };
                                                $scope.loadingItems = params.loadingItems;
                                                $scope.tep_id = params.loadingTplId;
                                                $scope.vo = {};
                                                $scope.vm = {
                                                    pages: pagingInfo,
                                                    items: []
                                                };

                                                // 确认按钮
                                                $scope.ok = function (items) {
                                                    // 获取对象，返回对象数组
                                                    $modalInstance.close(items);
                                                };
                                                // 取消按钮
                                                $scope.cancel = function () {
                                                    $modalInstance.dismiss('cancel');
                                                };
                                                //切换类目查询时，清除子类目的数据
                                                $scope.clear = function () {
                                                    $scope.vo.son = "";
                                                    $scope.vo.secondCategoryId = "";
                                                }

                                                //用于授权类目查询
                                                $scope.searchClick = function () {
                                                    $scope.vm.pages = pagingInfo;
                                                    console.log($scope.vm.pages);
                                                    if ($scope.vo.son) {
                                                        console.log($scope.vo.son);
                                                        $scope.vo.parentId = $scope.vo.son.id;
                                                        $scope.vo.name = $scope.vo.son.name;
                                                    } else if ($scope.vo.parent) {
                                                        console.log($scope.vo.parent);
                                                        $scope.vo.parentId = $scope.vo.parent.id;
                                                        $scope.vo.name = $scope.vo.parent.name;
                                                    }

                                                    $scope.getList();
                                                };

                                                //用于授权产品及添加黑名单查询
                                                $scope.searchProductClick = function () {
                                                    $scope.vm.pages = pagingInfo;

                                                    if ($scope.vo.son) {
                                                        $scope.vo.secondCategoryId = $scope.vo.son.id;
                                                    } else if ($scope.vo.parent) {
                                                        $scope.vo.firstCategoryId = $scope.vo.parent.id;
                                                    }
                                                    $scope.getList();
                                                };
                                                //清空
                                                $scope.resetClick = function () {
                                                    $scope.vo = {};
                                                };

                                                // 获取类目列表
                                                function findCategoryList() {
                                                    $http.post('common/findAllProductCategoryPs.action').success(function (result) {
                                                        console.log(result);
                                                        if (result.result == 'success') {
                                                            $scope.vm.categoryList = result.datas.dataList;
                                                        }
                                                    })
                                                        .error(function (error) {
                                                            console.log('获取类目信息:' + error);
                                                        });
                                                }

                                                // 获取列表
                                                $scope.getList = function () {
                                                    $scope.loadingShow = true;
                                                    $http.post(params.action.replace("{curPage}", $scope.vm.pages.index).replace("{tep_id}", $scope.tep_id), $scope.vo).success(
                                                        function (data) {
                                                            console.log(data);
                                                            $scope.loadingShow = false;
                                                            if (data.result == 'success') {
                                                                $scope.vm.items = data.datas.dataList;
                                                                $scope.vm.pages.totalResult = data.datas.pager.recordCount;
                                                                $scope.vm.pages.totalPage = data.datas.pager.totalPage;
                                                            }
                                                        })
                                                };
                                                // 初始化省市区三级联动
                                                params.initArea
                                                && initCitySelector('city-select', 'common/getProvinceCityArea.action');

                                                params.initCategory
                                                && findCategoryList();

                                                if (params.params) {
                                                    $scope.vo = angular.extends($scope.vo, params.params);
                                                }

                                                $scope.getList();
                                            }]
                                    }).result.then(callbackFn, angular.noop, angular.noop);
                                });
                            }
                        };
                    }
                }
            }]);
})(window.angular);
