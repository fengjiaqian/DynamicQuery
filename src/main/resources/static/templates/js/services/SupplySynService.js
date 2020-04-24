/**
 * 经销商一键同步
 */
define(['app'], function (app) {


    app.service('SupplySynService', ['QHttp', function (QHttp) {
        /**
         *经销商一键同步
         */
        this.send = function (cityId) {
            return QHttp.request({
            	method: 'get',
                url: "/syncAgencyInfo",
            });
        };

    }]);
});