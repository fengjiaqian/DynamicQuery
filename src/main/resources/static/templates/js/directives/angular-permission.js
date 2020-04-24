/**
 * angular-permission
 * Route permission and access control as simple as it can get
 * @version v2.0.9 - 2016-02-15
 * @link http://www.rafaelvidaurre.com
 * @author Rafael Vidaurre <narzerus@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function () {
    'use strict';

    var permission = angular.module('permission', ['ui.router']);

    /**
     * This decorator is required to access full state object instead of it's configuration
     * when trying to obtain full toState state object not it's configuration
     * Can be removed when implemented https://github.com/angular-ui/ui-router/issues/13.
     */
    permission.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.decorator('parent', function (state, parentFn) {
            state.self.getState = function () {
                return state;
            };
            return parentFn(state);
        });
    }]);

    permission.run(['$rootScope', '$state', '$q', '$location',
        function ($rootScope, $state, $q, $location) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

                if (toState.$$isAuthorizationFinished) {
                    return;
                }

                var deferred = $q.defer();


            });
        }]);
}());


(function () {
    'use strict';

    /**
     * Show/hide elements based on provided permissions
     *
     * @example
     * <div permission only="'USER'"></div>
     * <div permission only="['USER','ADMIN']" except="'MANAGER'"></div>
     * <div permission except="'MANAGER'"></div>
     */
    angular
        .module('permission')
        .directive('permission', ['$log', 'UserPrivilegeService', 'UserService', function ($log, UserPrivilegeService, UserService) {
            return {
                restrict: 'AE',
                scope: {
                    permission: "@"
                },
                controllerAs: 'permission',
                controller: ['$scope', '$element', function ($scope, $element) {
                    $element.addClass('ng-hide');
                    UserService.obtainUserInfo().then(function (response) {
                        if (response.success == true) {
                            var userInfo = response.data;
                            if (userInfo.userRole === $scope.permission) {
                                $element.removeClass('ng-hide');
                            }
                        }
                    })
                   
                    /*var userInfo=angular.fromJson(localStorage.getItem("userInfo"));
                    if (userInfo.userRole === $scope.permission) {
                        $element.removeClass('ng-hide');
                    }*/
                    
                    //有权限的按钮
                    var privilegeList = UserPrivilegeService.getAllPrivilegeButton();
                    //菜单的所有权限数据
                    var datas = UserPrivilegeService.getUserPrivilege();
                   /* var sidebarList=angular.fromJson(localStorage.getItem("sidebarList"));*/
                    if (privilegeList) {
                        angular.forEach(privilegeList, function (item) {
                            if (item.privilegeCode === $scope.permission) {
                                $element.removeClass('ng-hide');
                            }
                        });
                    }

                }]
            };
        }]);
}());
