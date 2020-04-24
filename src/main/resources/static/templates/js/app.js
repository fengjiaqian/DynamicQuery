/**
 * Created by bjw on 2016/11/9.
 */
define(['settings','directives/ng-grid.min'], function () {

    var app = angular.module("main", [/*"ngCookies",*/ "ui.router",
        "ui.bootstrap", "ui.select", /*"oc.lazyLoad",*/ "ngSanitize",
        "pasvaz.bindonce", "ngMessages", "blockUI", "toastr",'permission',
        "ncy-angular-breadcrumb", "select-search", "yjp.directive", "yjp.service", 
        "multiJiupiCityTreeModule","jiupiCityFullNameModule", "bizUserLevelModule" ,
        "productStatisticsCategoryModule","productDisplayCategoryModule",
        "ejpJiupiCitySelectModule","findDictionaryByCodeModule",
        "jiupiCityTreeModule","zTreeServiceModule","ejpTableCheckedServiceModule",
        "productCategoryServiceModule","commonServiceModule",
        "bizUserLevelModule",'productDisplayCategoryServiceModule','ngGrid']);

    /**定义常量*/
    app.constant("EVENT", {
        broadcast: {
            switchUserRole: "switchUserRole"
        }
    });
    /***/
    app.run([
        '$rootScope',
        '$state',
        '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams
        }
    ]);

    app.config(["$controllerProvider",
        "$compileProvider",
        "$filterProvider",
        "$provide",
        "$httpProvider",
        "blockUIConfig",
        'toastrProvider',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, blockUIConfig, toastr) {
            app.lazy = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            blockUIConfig.requestFilter = function (config) {
                if (config.message) {
                    blockUIConfig.message = config.message;
                    return true;
                } else {
                    blockUIConfig.message = "加载中 ...";
                    return false;
                }
            };

            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
                $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
                $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
            }
        }]);

    // 用$q将require封装成promise
    angular.requireQ = function (dependencies) {
        return {
            deps: ["$q", function ($q) {
                return $q(function (resolve, reject) {
                    require(dependencies, function () {
                        resolve();
                    }, function (e) {
                        reject(e);
                    });
                });
            }]
        };
    };

    var appWraper = {
        app: app,
        run: app.run,
        config: app.config
    };

    // 视图路由初始化
    appWraper.configRouter = function (routeConfig) {
        app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
            if (routeConfig.states !== undefined) {
                angular.forEach(routeConfig.states, function (route, state) {
                    route.resolve = route.resolve || {};
                    if (route.dependencies !== undefined && route.dependencies.length > 0) {
                        route.resolve.dependencies = angular.requireQ(route.dependencies).deps;
                    }
                    $stateProvider.state(state, route);
                });
            }
            if (routeConfig.defaultUrl !== undefined) {
                $urlRouterProvider.otherwise(routeConfig.defaultUrl);
            }
        }]);
    };

    angular.forEach(["controller", "directive", "filter", "factory", "service"], function (fnName) {
        appWraper[fnName] = function () {
            if (app.lazy) {
                app.lazy[fnName].apply(app, arguments);
            } else {
                app[fnName].apply(app, arguments);
            }
        };
    });

    appWraper.start = function () {
        angular.element(document).ready(function () {
            angular.bootstrap(document, [app.name]);
        });
    };
    return appWraper;
});


/**
 * 扩展数组删除方法
 **/
Array.prototype.remove = function (item, predicate) {
    if (this === null) {
        throw new TypeError('Array.prototype.remove called on null or undefined');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }
    if (typeof item !== "undefined") {
        for (var i = 0; i < this.length; i++) {
            if (predicate(item, this[i])) {
                this.splice(i, 1);
                return this;
            }
        }
        return false;
    }
    return false;
};

/**
 * 计算字符串hash值
 **/
String.prototype.hashcode = function () {
    var str = this;
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
/**
 * 检测数据是否为空白（null、undefined、 ' '）
 */
var util = {
    isBlank: function (str) {
        if (!!str) {
            if (typeof(str) === "string") {
                return str.trim() === '';
            }
            return false;
        } else {//fixed 0
            return true;
        }
    },
    isGtZero: function (str) {
        if (isFinite(str)) {
            return parseFloat(str) > 0;
        } else {
            throw new Error("不是数字");
        }
    },
    isSameCity: function (city1, city2) {
        var result =
            (angular.isUndefined(city1) && angular.isUndefined(city2))
            ||
            (
                (!!city1 && !!city2)
                &&
                (
                    (city1.cityId == city2.cityId && city1.cityId != null)
                    ||
                    (city1.id == city2.id && city1.id != null)
                    ||
                    (city1.province == city2.province && city1.city == city2.city && city1.county == city2.county)
                )
            );
        return result;
    }
}