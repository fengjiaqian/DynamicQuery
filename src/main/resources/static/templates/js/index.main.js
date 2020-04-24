/**
 * Created by bjw on 2016/11/9.
 */
require.config({
    paths: {
        "app": "app",
        "AddressData": "directives/AddressData.min"
    },
    urlArgs: "t=" + new Date().getTime(),
    waitSeconds: 0
});
require(["app", "route", 'controllers/workspace/WorkspaceController'], function (app, routeConfig) {
    angular.formatJSON = function (json) {
        if (angular.isArray(json)) {
            var arr = [];
            angular.forEach(json, function (item) {
                arr.push(angular.formatJSON(item));
            });
            return arr;
        } else if (angular.isObject(json)) {
            var result = {};
            for (var p in json) {
                if (json.hasOwnProperty(p)) {
                    var np = p.substring(0, 1).toLowerCase() + p.substring(1);
                    result[np] = angular.formatJSON(json[p])
                }
            }
            return result;
        } else {
            return json;
        }
    };

    app.configRouter(routeConfig);
    app.start();
});