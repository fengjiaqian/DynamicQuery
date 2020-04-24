/**
 * 大小单位过滤
 */
define(['app'], function (app) {
    app.filter("unit", function () {
        return function (val) {
            return "元/" + ((val.priceUnitLevel == '1') ? val.singleUnit : val.packageUnit);
        };
    });
});
