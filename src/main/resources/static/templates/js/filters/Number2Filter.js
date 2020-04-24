/**
 * 数值过滤器，不进行四舍五入
 */
define(['app'], function (app) {
    app.filter("number2", ['$filter', function ($filter) {
        return function (number, fractionSize) {
            var val = $filter('number')(number, fractionSize + 1);
            return val.substring(0, val.length - 1);
        };
    }]);
});
