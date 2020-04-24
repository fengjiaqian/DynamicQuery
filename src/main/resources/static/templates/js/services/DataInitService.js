/**
 * 2.0订单初始化
 */
define(['app'], function (app) {


    app.service('DataInitService', ['QHttp', function (QHttp) {
        /**
         * 2.0订单初始化
         */
        this.send = function (data) {
            return QHttp.request({
                url: "/dataInit",
                data:data
            });
        };

    }]);
});