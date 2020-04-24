/**
 * 会员信息 Tip
 */
MetronicApp.directive('bizUserTip', [function () {
    return {
        restrict: 'A',
        scope: {
            bizUserTip: '@'
        },
        link: function (scope, ele, attr) {
            ele.bind('click', function () {
                scope.openWindow();
            });
        },
        controller: ['$scope', '$http', '$modal',
            function ($scope, $http, $modal) {

                //显示用户信息
                var showUserInfo = function () {
                    $http.get('bizUser/getBizUserDetail/' + $scope.bizUserTip + ".action").success(function (result) {
                        if (result.result === 'success') {
                            $scope.user = result.data;
                        }
                    })
                }

                //打开会员信息弹框
                var modalInstance = null;
                $scope.openWindow = function () {
                    modalInstance = $modal.open({
                        scope: $scope,
                        templateUrl: 'js/directives/tpl/bizUserTip.html',
                        controller: showUserInfo,
                        size: 'lg'
                    });
                }

                $scope.closeWindow = function () {
                    modalInstance.close();
                }

            }]
    };
}]);

MetronicApp.directive('bizUserClass', [function () {
    return {
        restrict: 'E',
        scope: {
            userClass: '='
        },
        templateUrl: 'js/directives/tpl/bizUserClass.html',
        replace: true,
        controller: ['$scope', '$http', 'BizUserService', function ($scope, $http, BizUserService) {

            BizUserService.getBizUserClass().then(function (data) {
                $scope.bizUserCalssList = data.data;
            }, function (data) {
                console.info(data.detailMessage);
            });

        }]
    };
}]);

MetronicApp.directive('bizUserClassReadOnly', [function () {
    return {
        restrict: 'E',
        scope: {
            userClass: '='
        },
        templateUrl: 'js/directives/tpl/bizUserClassReadOnly.html',
        replace: true,
        controller: ['$scope', '$http', 'BizUserService', function ($scope, $http, BizUserService) {

            BizUserService.getBizUserClass().then(function (data) {
                $scope.bizUserCalssList = data.data;
            }, function (data) {
                console.info(data.detailMessage);
            });

        }]
    };
}]);

MetronicApp.directive('bizUserClassInCity', [function () {
    return {
        restrict: 'E',
        scope: {
            userClass: '=',
            cityId: '='
        },
        templateUrl: 'js/directives/tpl/bizUserClass.html',
        replace: true,
        controller: ['$scope', '$http', 'BizUserService', function ($scope, $http, BizUserService) {

            BizUserService.getBizUserClassInCity($scope.cityId).then(function (data) {
                $scope.bizUserCalssList = data.data;
            }, function (data) {
                console.info(data.detailMessage);
            });

        }]
    };
}]);